# SETUP — Agent Delivery qua Email sau Thanh toán (FluentCart stack)

Luồng: React landing page → `sepay-fluent-cart` headless checkout → FluentCart order → SePay webhook paid → bridge plugin sync FluentCRM → automation email với `{{agents.list}}`.

## Tổng quan kiến trúc

```
[PackageForm.tsx]
   │ POST /wp-json/sepay/v1/checkout
   │ { first_name, last_name, email, phone,
   │   items: [{product_id, quantity:1}],
   │   selected_agents: ["01. ...", ...],
   │   selected_package, coupon_code, refer_url, fbp, fbc }
   ▼
[sepay-fluent-cart] → tạo FluentCart Order (pending) + sync FluentCRM contact (email/name)
   │                   → lưu raw payload vào wp_fct_order_meta.sepay_raw_checkout_data
   │                   → trả về { order:{id,uuid,total_amount}, sepay:{qr_url,amount,...}, sepay_bank_info:{...} }
   ▼
[Frontend poll /wp-json/sepay/v1/check-status/{order.id}]
   ▼
[SePay webhook /?sepay_webhook=1] → order status = paid → do_action('fluent_cart/order_paid_done', ['order' => Order])
   ▼
[plugin-sepay-agents-delivery/includes/fluentcart-bridge.php] (priority 5)
   │   → đọc customer email + raw payload
   │   → map product_id → tag_slug (theo option sepay_agents_package_map)
   │   → FluentCrmApi('contacts')->createOrUpdate([
   │        email, status: 'subscribed',
   │        custom_values: ['selected_agents' => [...]],
   │        tags: [tag_id]
   │     ])
   ▼
[FluentCRM Automation: Tag Applied → Send Email with {{agents.list}}]
   ▼
[smartcode.php] đọc subscriber.custom_fields.selected_agents → query CPT sepay_agent → HTML <ul> Drive links
   ▼
[User nhận email đúng 3/7/12 link]
```

## 1. Deploy Frontend

Build frontend:
```bash
rm -rf ai-agents-super && npm run build
```

Upload toàn bộ folder `ai-agents-super/` lên host, đặt tại `theallinplan.com/ai-agents-super/`.

**Quan trọng**: Sau khi FluentCart products được tạo (bước 3), sửa file `ai-agents-super/config.js` **ở server** (hoặc [public/config.js](public/config.js) rồi rebuild) để điền đúng Product IDs:

```js
window.SEPAY_CONFIG = {
  apiBaseUrl: "https://hub.theallinplan.com",
  packageProductIds: {
    basic: 123,  // đổi thành Product ID thực
    pro:   124,
    vvip:  125,
  },
};
```

## 2. Cài plugins (theo thứ tự)

WP Admin → Plugins:

1. **Deactivate** `plugin-sepay-integration` (không xóa, giữ để rollback).
2. **Activate** theo thứ tự:
   - `fluent-crm`
   - `fluent-cart`
   - `SePay Gateway for FluentCart` (tên hiển thị của `sepay-fluent-cart`)
   - `SePay Agents Delivery` (plugin `plugin-sepay-agents-delivery`)

Verify sau khi activate:
- Sidebar có menu **Agents** + submenu **Package Mapping**.
- FluentCRM → Settings → Custom Contact Fields có field `Agents đã chọn` (slug `selected_agents`, type checkbox).

## 3. FluentCart → Products

Tạo 3 products:

| Tên | Giá | Ghi chú |
|-----|-----|---------|
| Gói Basic — 3/12 Agents | VND | |
| Gói Pro — 7/12 Agents | VND | |
| Gói VVIP — 12/12 Agents | VND | |

Với mỗi product:
- Publish → vào edit page → copy Product ID (URL: `post.php?post=<ID>`).
- FluentCart tự tạo 1 default variation — không cần config thêm.

## 4. SePay FluentCart → Settings

### Gateway
Điền SePay API key + thông tin bank (bank_id, account_number, account_name).

### Headless Checkout → CORS
Thêm vào whitelist:
```
https://theallinplan.com
```
(Và `http://localhost:5173` nếu muốn test `npm run dev`.)

## 5. FluentCRM → Tags

Tạo 3 tag (hoặc 1 tag chung nếu không cần segment):
- `paid-basic`
- `paid-pro`
- `paid-vvip`

Chép đúng slug (thường lowercase-dashed auto-generated).

## 6. Agents CPT (12 agents)

WP Admin → **Agents → Add New**, tạo 12 agent:

| Code | Title | Drive URL |
|-----|-------|-----------|
| 01 | Agent Avatar Builder | https://drive.google.com/... |
| 02 | Agent Brand Voice | ... |
| 03 | Agent hvco Creator | ... |
| 04 | Agent Hero Mechanism | ... |
| 05 | Agent Offer Architect | ... |
| 06 | Agent Ad Copy Machine | ... |
| 07 | Agent vsl Scriptwriter | ... |
| 08 | Agent Funnel Strategist | ... |
| 09 | Agent Email Closer | ... |
| 10 | Agent Sales Call Script | ... |
| 11 | Agent Follow-Up Engine | ... |
| 12 | Agent Money Model | ... |

**Quan trọng**: Code phải đúng 2 ký tự `01`–`12` (không được `1`, `2`...).

## 7. Agents → Package Mapping

WP Admin → **Agents → Package Mapping**, điền:

| Gói | FluentCart Product ID | FluentCRM Tag slug |
|-----|----------------------|---------------------|
| Basic | (ID từ bước 3) | `paid-basic` |
| Pro | (ID từ bước 3) | `paid-pro` |
| VVIP | (ID từ bước 3) | `paid-vvip` |

Save. Kéo xuống cuối trang verify "Preview option" hiển thị đúng map.

## 8. FluentCRM → Automations

Tạo 1 automation chung cho cả 3 gói:

**Trigger**: `Tag Applied`
- Chọn 3 tag `paid-basic`, `paid-pro`, `paid-vvip` (OR)

**Action**: `Send Custom Email`

**Subject**:
```
{{contact.first_name}} ơi, đây là các Agent của bạn 🎉
```

**Body** (HTML):
```html
<p>Chào {{contact.first_name}},</p>

<p>Cảm ơn bạn đã tin tưởng. Dưới đây là <strong>{{agents.count}} Agent</strong> bạn đã chọn:</p>

{{agents.list}}

<p>Click vào từng link để truy cập Google Drive chứa đầy đủ prompt, workflow và hướng dẫn.</p>

<p>Có thắc mắc → reply email này.</p>

<p>— theallinplan</p>
```

*(Tùy chọn)* Thêm `Wait` 10–30 giây trước Send Email để phòng race condition giữa bridge sync và automation trigger.

## 9. Frontend Config + Build

Sửa `public/config.js` (hoặc trực tiếp `ai-agents-super/config.js` sau khi upload):

```js
window.SEPAY_CONFIG = {
  apiBaseUrl: "https://hub.theallinplan.com",  // domain WP
  packageProductIds: {
    basic: 123,   // replace
    pro:   124,
    vvip:  125,
  },
};
```

Rebuild nếu sửa trong `public/`:
```bash
rm -rf ai-agents-super && npm run build
```

Upload lại `ai-agents-super/` lên host.

## 10. End-to-End Test

### Smoke test admin
- Menu **Agents** + submenu **Package Mapping** xuất hiện.
- FluentCRM → Custom Contact Fields có `selected_agents`.
- FluentCart → Products có đủ 3 products, mỗi product có ≥1 variation.
- SePay FluentCart → CORS có domain frontend.

### Frontend test
1. `npm run dev` (local) hoặc mở URL production.
2. Fill form → chọn **Basic** → pick 3 agent (01, 03, 07) → Submit.
3. DevTools → Network: verify POST `/wp-json/sepay/v1/checkout` body có:
   ```json
   {
     "items": [{"product_id": 123, "quantity": 1}],
     "selected_agents": ["01. Agent Avatar Builder", "03. Agent hvco Creator", "07. Agent vsl Scriptwriter"],
     "selected_package": "basic"
   }
   ```
4. Response có `data.order.id`, `data.sepay.qr_url` → QR hiển thị.
5. Poll `/wp-json/sepay/v1/check-status/{id}` trả về `{payment_status: "pending"}`.

### Webhook simulate (không cần SePay thật)
1. WP Admin → FluentCart → Orders → chọn order vừa tạo → đổi status = `paid` (manual) → save.
2. Hook `fluent_cart/order_paid_done` fire → bridge chạy.
3. FluentCRM → Contacts → tìm email:
   - Tag `paid-basic` đã apply.
   - Custom field `Agents đã chọn` có 3 entries: `["01. Agent Avatar Builder", "03. ...", "07. ..."]`.
4. Inbox email → nhận email với `<ul>` chứa 3 link Drive đúng.

### End-to-end với SePay thật
1. Quét QR → chuyển khoản đúng `transfer_content` (VD: `DH100123`).
2. Đợi SePay gửi webhook → FluentCart order auto-update = paid.
3. Như bước webhook simulate.

## Troubleshooting

### Email trống danh sách agent
- Check FluentCRM → Contact → Custom Fields → `selected_agents` có giá trị không.
  - Rỗng → bridge chưa chạy. Check:
    - Plugin `SePay Agents Delivery` đã activate?
    - Option `sepay_agents_package_map` đã lưu? (WP Admin → Agents → Package Mapping → Preview)
    - Log WP debug: `error_log` trong `sepay_agents_sync_on_paid` nếu cần thêm debug.
- Có giá trị nhưng email vẫn trống → CPT `sepay_agent` chưa tạo đúng code. Verify:
  ```php
  // Trong WP admin, chạy qua plugin như Query Monitor:
  sepay_agents_get_by_codes(['01','03','07'])
  ```

### CORS error từ frontend
- SePay FluentCart → Settings → Headless Checkout → thêm đúng origin (kể cả port nếu dev local: `http://localhost:5173`).
- Verify response header `Access-Control-Allow-Origin` xuất hiện khi gọi từ DevTools Network.

### Product not found
- Product ID trong `config.js` sai → check lại URL của product edit page.
- Product chưa publish → publish nó.

### Tag không apply
- Tag slug trong Package Mapping phải match **đúng** slug FluentCRM (không phải tên hiển thị).
- WP Admin → FluentCRM → Tags → click tag → URL có slug.

### Raw payload bị xóa (quá 3 ngày)
- SePay FluentCart → Settings: tắt `sepay_fc_auto_delete_raw` nếu order thường thanh toán chậm.

## Rollback (nếu cần)

1. WP Admin → Plugins → Deactivate:
   - `SePay Agents Delivery`
   - `SePay Gateway for FluentCart`
2. Activate `plugin-sepay-integration`.
3. Revert `src/components/PackageForm.tsx` qua git về commit trước migration.
4. Rebuild + deploy `ai-agents-super/`.

Toàn bộ code cũ vẫn còn trong repo.

## Files liên quan

### Plugin bridge (mới)
- [plugin-sepay-agents-delivery/sepay-agents-delivery.php](plugin-sepay-agents-delivery/sepay-agents-delivery.php) — bootstrap
- [plugin-sepay-agents-delivery/includes/cpt-agent.php](plugin-sepay-agents-delivery/includes/cpt-agent.php) — CPT 12 agents + admin UI
- [plugin-sepay-agents-delivery/includes/fluentcrm-field.php](plugin-sepay-agents-delivery/includes/fluentcrm-field.php) — auto register custom field
- [plugin-sepay-agents-delivery/includes/smartcode.php](plugin-sepay-agents-delivery/includes/smartcode.php) — `{{agents.list}}` + `{{agents.count}}`
- [plugin-sepay-agents-delivery/includes/fluentcart-bridge.php](plugin-sepay-agents-delivery/includes/fluentcart-bridge.php) — hook `fluent_cart/order_paid_done`
- [plugin-sepay-agents-delivery/includes/admin-settings.php](plugin-sepay-agents-delivery/includes/admin-settings.php) — UI Package Mapping

### Frontend
- [src/components/PackageForm.tsx](src/components/PackageForm.tsx) — checkout form
- [public/config.js](public/config.js) — runtime config (apiBaseUrl + packageProductIds)

### External (không sửa)
- `fluent-cart/` — e-commerce engine
- `fluent-crm/` — email marketing
- `sepay-fluent-cart/` — SePay gateway + headless REST
- `plugin-sepay-integration/` — deprecated, giữ để rollback
