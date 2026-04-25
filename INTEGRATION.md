# Frontend Integration Guide for SePay Plugin

This guide details how to integrate your Frontend Checkout Form with the SePay WordPress Plugin (SePay Hub).

## API Base URL Configuration

The frontend must support a dynamic API base URL to allow seamless communication with the SePay Hub backend (e.g., `https://hub.theallinplan.com`).

The base URL is configured globally via the `public/config.js` file:
```javascript
window.SEPAY_CONFIG = {
  apiBaseUrl: "https://hub.theallinplan.com"
};
```

When making requests to the SePay backend, prepend the endpoint paths with `window.SEPAY_CONFIG.apiBaseUrl` (or equivalent fallback).

## Important Integration Notes for External Frontends

When building a frontend on a separate domain that integrates with the SePay backend, please observe the following requirements:

1. **Automated Tracking Data:** The backend automatically captures the customer's IP address and the full checkout URL (including UTM tracking parameters) via `HTTP_REFERER` and `Origin` headers. You do not need to manually pass UTM parameters in the API payload.
2. **Centralized Data Handling:** To avoid deploying tracking logic to multiple frontends, data capture modifications (e.g., tracking analytics) are centralized in the backend. Focus the frontend solely on capturing user input and handling the checkout flow UI.
3. **Free Orders (100% Discount):** Be prepared to handle responses where `status` is immediately returned as `"paid"`. In this case, do not display the QR code screen; redirect the user directly to the success page.

---

## 1. Create Order (Checkout)

When the user clicks the "Register" or "Pay" button, call this API to create an order and get the QR Code.

- **Endpoint:** `POST {apiBaseUrl}/wp-json/sepay/v1/register`
- **Content-Type:** `application/json`

### Request Payload

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | **Yes** | Customer's full name. |
| `email` | string | **Yes** | Customer's email address. |
| `phone` | string | **Yes** | Customer's phone number. |
| `plan` | string | **Yes** | **IMPORTANT:** This Slug must strictly match a **Plan ID** configured in **WP Admin > SePay > Plans**. (e.g., `standard`, `premium`). If not matched, the API returns Error 400. |
| `custom_fields` | object | No | Optional arbitrary data. **CRITICAL FOR TRACKING:** To ensure Facebook Conversions API (CAPI) deduplicates and matches correctly, the frontend **MUST** extract the `_fbp` and `_fbc` cookies and send them here as `fbp` and `fbc`. |

### Example Request (JavaScript/Fetch)

```javascript
// Helper to get cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
};

const orderData = {
  name: "Nguyen Van A",
  email: "khachhang@example.com",
  phone: "0901234567",
  plan: "premium", // MUST match backend configuration
  custom_fields: {
    source: "landing_page_v2",
    coupon: "SALE50", // Optional coupon code
    fbp: getCookie('_fbp'), // CRITICAL FOR CAPI
    fbc: getCookie('_fbc')  // CRITICAL FOR CAPI
  }
};

try {
  const baseUrl = window.SEPAY_CONFIG?.apiBaseUrl || '';
  const response = await fetch(`${baseUrl}/wp-json/sepay/v1/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle Error (e.g., Invalid Plan)
    alert(data.message);
    return;
  }

  // Handle Success
  console.log("Order Created:", data.order_code);
  showQrCode(data.qr_url); // Function to display QR image
} catch (error) {
  console.error("Network Error:", error);
}
```

### Success Response (200 OK)

If a valid coupon was applied, the response will include `original_amount` and `discount_amount`.

```json
{
  "success": true,
  "order_code": "DH1706123456",
  "amount": 850000,
  "original_amount": 900000,
  "discount_amount": 50000,
  "qr_url": "https://qr.sepay.vn/img?acc=0123456788&bank=MBBank&amount=850000&des=DH1706123456",
  "bank_info": {
    "acc": "0123456788",
    "bank": "MBBank",
    "name": "NGUYEN VAN A"
  },
  "status": "unpaid" // Will be "paid" if amount is 0
}
```

**Free Order (100% Discount) Flow:**
If the applied coupon reduces the `amount` to `0`, the backend automatically approves the order and sets `status` to `"paid"`.
The frontend **should not** show the QR code screen in this case, but instead immediately navigate the user to the Success/Thank You page.

### Error Response (400 Bad Request)

```json
{
  "code": "invalid_plan",
  "message": "Gói sản phẩm 'vip' không tồn tại hoặc đã bị thay đổi.",
  "data": { "status": 400 }
}
```

```json
{
  "code": "invalid_coupon",
  "message": "Mã giảm giá không hợp lệ hoặc đã hết hạn.",
  "data": { "status": 400 }
}
```

---

## 2. Check Payment Status (Polling)

After showing the QR Code, your frontend should periodically check if the user has paid.

- **Endpoint:** `GET {apiBaseUrl}/wp-json/sepay/v1/check-status?order_code={order_code}`
- **Frequency:** Recommend checking every 3-5 seconds.

### Example Logic

```javascript
const checkStatus = async (orderCode) => {
  const baseUrl = window.SEPAY_CONFIG?.apiBaseUrl || '';
  const response = await fetch(`${baseUrl}/wp-json/sepay/v1/check-status?order_code=${orderCode}`);
  const data = await response.json();

  if (data.success && data.status === 'paid') {
    // Payment Successful!
    // Stop polling and redirect to Thank You Page
    window.location.href = '/thank-you';
  }
};

// Start Polling
const interval = setInterval(() => checkStatus(currentOrderCode), 5000);
```

### Response

```json
{
  "success": true,
  "status": "paid" // or "unpaid"
}
```
