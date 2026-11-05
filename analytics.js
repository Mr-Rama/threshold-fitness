(() => {
  window.thresholdAnalyticsConfig = window.thresholdAnalyticsConfig || {
    provider: null,
    measurementId: null
  };

  const track = (eventName, details = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...details });
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;

    if (link.href.startsWith('https://wa.me/')) {
      track('whatsapp_click', { link_url: link.href });
      if (!link.closest('#platform') && link.matches('.nav-cta, .head-cta, .btn-primary, .cta')) {
        track('booking_button_click', { link_url: link.href });
      }
    }
    if (link.href.startsWith('tel:')) {
      track('phone_click', { link_url: link.href });
    }
    if (link.hash === '#pricing' || link.href.endsWith('/index.html#pricing')) {
      track('package_interaction', { link_url: link.href });
    }
  });

  document.addEventListener('submit', (event) => {
    if (event.target instanceof HTMLFormElement) {
      track('form_submission', { form_id: event.target.id || null });
    }
  });
})();
