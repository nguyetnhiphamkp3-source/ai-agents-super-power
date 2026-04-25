import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Preserve scroll position across refreshes.
// Browser default restoration fails for SPAs because content loads async
// and the document isn't tall enough when the browser tries to restore.
if (typeof window !== 'undefined') {
  history.scrollRestoration = 'manual';

  const SCROLL_KEY = '_scrollY';
  let saveTimer: ReturnType<typeof setTimeout>;

  const saveScroll = () => {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
  };

  window.addEventListener(
    'scroll',
    () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveScroll, 100);
    },
    { passive: true }
  );
  window.addEventListener('beforeunload', saveScroll);
  window.addEventListener('pagehide', saveScroll);

  const restoreScroll = () => {
    if (window.location.hash) return; // honor anchor links
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (!saved) return;
    const targetY = parseInt(saved, 10);
    if (!Number.isFinite(targetY) || targetY <= 0) return;

    // Poll until document is tall enough, then scroll.
    // Gives up after ~3s if content never reaches target height.
    const start = performance.now();
    const tryRestore = () => {
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight >= targetY + window.innerHeight * 0.5) {
        window.scrollTo(0, targetY);
      } else if (performance.now() - start < 3000) {
        requestAnimationFrame(tryRestore);
      } else {
        window.scrollTo(0, Math.min(targetY, docHeight));
      }
    };
    tryRestore();
  };

  if (document.readyState === 'complete') {
    restoreScroll();
  } else {
    window.addEventListener('load', restoreScroll, { once: true });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
