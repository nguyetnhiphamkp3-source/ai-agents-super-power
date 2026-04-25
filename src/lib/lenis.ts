export function smoothScrollTo(target: string | HTMLElement | number, opts?: { offset?: number }) {
  const offset = opts?.offset ?? 0;
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: 'smooth' });
    return;
  }
  const el =
    typeof target === 'string' ? (document.querySelector(target) as HTMLElement | null) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
