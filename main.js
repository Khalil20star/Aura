/* Aura storefront customizations for Salla. Keep the existing theme stylesheet. */
(() => {
  'use strict';

  // Custom scripts may run after DOMContentLoaded or be evaluated more than once.
  if (window.__auraStorefrontInitialized) return;
  window.__auraStorefrontInitialized = true;

  const ASSETS = {
    chefz: 'https://i.postimg.cc/3Jkzh2WV/unnamed.png',
    payment: 'https://i.postimg.cc/ZKMp012x/yx-XD3YMXTMr7cq-Du-Jnb-J5X4zh-Gy-Lqbv9Ux-PYu93g.jpg',
    payments: 'https://cdn.salla.sa/RAxyqv/products/8qQDxwM8sIGmCBa8DFWCV8BlTKZVKygiR9fBsmJr.png',
    guarantee: 'https://cdn.files.salla.network/other/437073385/1217c5d4-a814-4cec-8392-1d2c9d7ed4d2-original.webp',
    delivery: 'https://cdn.salla.sa/RAxyqv/products/pA4XQ8A2xd0HsWopPA4M5OnWOGQkNtywL5jVE9nV.png',
    tabby: 'https://cdn.salla.sa/RAxyqv/products/QVQZfDuex29GWWpXA9bzXfPySkOQ55F63pMAdZKz.png',
    tamara: 'https://cdn.salla.sa/RAxyqv/products/Eqym8xlTFahRs4PJKBCYgVPs8oiXsNCFB39WcYGx.png',
    moisture: 'https://cdn.files.salla.network/other/437073385/7b85b349-fb2d-4c68-89fa-677c34bf6376-original.webp',
    scent: 'https://cdn.files.salla.network/other/437073385/45da680b-591b-4bd8-b031-bd8e9484f428-original.webp'
  };
  const SPECIAL_PRODUCTS = new Set(['264879371', '1944450294', '220026667', '1733548863']);
  const CHEFZ_URL = 'https://thechefzco.app.link/QkTfjvB7BXb';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else callback();
  }

  // Bounded discovery replaces fixed delays and endless polling.
  function whenAvailable(initialize, root = document.body) {
    if (initialize() || !root) return;
    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      queueMicrotask(() => {
        queued = false;
        if (initialize()) {
          observer.disconnect();
          clearTimeout(timeout);
        }
      });
    });
    observer.observe(root, { childList: true, subtree: true });
    const timeout = setTimeout(() => observer.disconnect(), 15000);
  }

  function watchMedia(query, callback) {
    const media = window.matchMedia(query);
    const update = () => callback(media.matches);
    if (media.addEventListener) media.addEventListener('change', update);
    else media.addListener(update);
    update();
  }

  function image(src, alt = '', className = '') {
    const img = document.createElement('img');
    Object.assign(img, { src, alt, className, loading: 'lazy', decoding: 'async' });
    return img;
  }

  function setText(element, value) {
    if (element.textContent !== value) element.textContent = value;
  }

  // Anchors preserve the exact position and original live nodes/listeners.
  function rememberPosition(element) {
    if (!element?.parentNode) return () => {};
    const anchor = document.createComment('aura-original-position');
    element.before(anchor);
    return () => {
      if (anchor.parentNode && anchor.nextSibling !== element) anchor.after(element);
    };
  }

  function initFooter() {
    const inner = document.querySelector('.store-footer__inner');
    if (!inner) return false;
    const footer = inner.closest('.store-footer, footer') || inner.parentElement;
    const container = inner.querySelector('.container');
    const logo = container?.querySelector('.lg\\:col-\\[2\\]');
    const row = footer.querySelector('.store-footer__contacts-row');
    const links = container?.querySelector('.text-center.order-1');
    const contacts = row?.querySelector('div');
    const social = row?.querySelector('ul');
    const bottom = footer.querySelector('.footer-bottom');
    const tax = footer.querySelector('.flex.rtl\\:space-x-reverse.space-x-2.items-end.justify-center.mt-8');
    const rights = bottom?.querySelector('.footer-rights');
    const payments = bottom?.querySelector('ul');
    const restoreMobile = [logo, row, links, social, bottom].map(rememberPosition);
    const restoreTax = rememberPosition(tax);
    const restoreRights = rememberPosition(rights);
    const contactLabels = contacts ? [...contacts.querySelectorAll('span')]
      .filter(span => !social?.contains(span))
      .map(span => ({ span, display: span.style.getPropertyValue('display'), priority: span.style.getPropertyPriority('display') })) : [];
    const socialHadMargin = social?.classList.contains('mt-4');

    watchMedia('(max-width: 1023px)', mobile => {
      if (mobile) {
        if (container) [logo, row, links].forEach(node => {
          if (node && node !== container && !node.contains(container)) container.appendChild(node);
        });
        contactLabels.forEach(({ span }) => span.style.setProperty('display', 'none'));
        if (contacts && social && !social.contains(contacts)) {
          social.classList.remove('mt-4');
          contacts.appendChild(social);
        }
        if (bottom && !bottom.contains(inner)) inner.appendChild(bottom);
      } else {
        [...restoreMobile].reverse().forEach(restore => restore());
        contactLabels.forEach(({ span, display, priority }) => {
          if (display) span.style.setProperty('display', display, priority);
          else span.style.removeProperty('display');
        });
        if (socialHadMargin) social.classList.add('mt-4');
      }
    });
    watchMedia('(max-width: 768px)', mobile => {
      if (mobile) {
        if (tax && bottom && !tax.contains(bottom)) bottom.appendChild(tax);
        if (rights && payments && !rights.contains(payments)) payments.after(rights);
      } else {
        restoreTax();
        restoreRights();
      }
    });

    const socialList = footer.querySelector('.rounded_contacts ul, ul.rounded_contacts') || social;
    if (socialList && !socialList.querySelector(`a[href="${CHEFZ_URL}"]`)) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      Object.assign(link, { href: CHEFZ_URL, target: '_blank', rel: 'noopener noreferrer', title: 'The Chefz', className: 'social-link' });
      link.setAttribute('aria-label', 'The Chefz');
      const icon = image(ASSETS.chefz, 'The Chefz');
      icon.width = 28;
      icon.height = 28;
      icon.style.borderRadius = '6px';
      link.appendChild(icon);
      item.appendChild(link);
      socialList.prepend(item);
    }
    whenAvailable(() => {
      const host = footer.querySelector('salla-payments');
      if (!host) return false;
      const addPayment = () => {
        const list = host.querySelector('ul.s-payments-list');
        if (!list || list.querySelector('[data-aura-payment]') ||
            [...list.querySelectorAll('img')].some(img => img.src === ASSETS.payment)) return;
        const item = document.createElement('li');
        item.className = 's-payments-list-item';
        item.dataset.auraPayment = '';
        const icon = image(ASSETS.payment, 'Custom Payment');
        icon.style.width = '100%';
        icon.style.height = '100%';
        item.appendChild(icon);
        list.appendChild(item);
      };
      addPayment();
      // Observe only this component so list replacement after hydration is supported.
      new MutationObserver(addPayment).observe(host, { childList: true, subtree: true });
      return true;
    }, footer);
    return true;
  }

  function parsePrice(text) {
    const normalized = String(text ?? '')
      .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x0660))
      .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x06f0))
      .replace(/٫/g, '.').replace(/[٬,\s\u200e\u200f\u061c]/g, '');
    const match = normalized.match(/-?\d+(?:\.\d+)?/);
    if (!match) return null;
    const value = Number(match[0]);
    return Number.isFinite(value) && value >= 0 ? value : null;
  }

  function isVisible(element) {
    return element.getClientRects().length > 0 && !element.closest('[hidden], .hidden') &&
      getComputedStyle(element).visibility !== 'hidden';
  }

  function feature(src, title, description, extraClass = '') {
    const box = document.createElement('div');
    box.className = 'cjs-prod-feature-box';
    box.appendChild(image(src, '', `cjs-prod-feature-img${extraClass ? ` ${extraClass}` : ''}`));
    const inner = document.createElement('div');
    inner.className = 'cjs-prod-feature-inner';
    if (title) {
      // Retain the existing stylesheet's title selector (an anchor without href).
      const heading = document.createElement('a');
      heading.textContent = title;
      inner.appendChild(heading);
    }
    const text = document.createElement('span');
    text.textContent = description;
    inner.appendChild(text);
    box.appendChild(inner);
    return box;
  }

  function initProduct() {
    const form = document.querySelector('#product-form, form.product-form');
    const productId = form?.querySelector('input[name="id"]')?.value;
    if (!form || !productId) return false;
    const root = form.closest('.product-single, .product-single__info, .product-single__details, main') || form.parentElement;
    if (root.querySelector('.cjs-product-features-inserted')) return true;
    const features = document.createElement('div');
    features.className = 'cjs-product-features cjs-product-features-inserted';
    features.dir = 'rtl';
    if (SPECIAL_PRODUCTS.has(productId)) {
      features.appendChild(feature(ASSETS.payments, 'طرق الدفع', 'خيارات دفع آمنة ومتنوعة'));
    } else {
      features.appendChild(feature(ASSETS.guarantee, 'الضمان الذهبي', 'لتقديم أعلى معايير الجودة', 'aura-logo'));
    }
    features.appendChild(feature(ASSETS.delivery, 'توصيل سريع', 'توصيل إكسبرس داخل الرياض خلال 24 ساعة'));

    const emi = document.createElement('div');
    emi.className = 'cjs-prod-feature-box cjs-prod-feature-box--emi';
    const emiInner = document.createElement('div');
    emiInner.className = 'cjs-prod-feature-inner';
    const emiTitle = document.createElement('a');
    emiTitle.textContent = 'تابــي وتمــــارا';
    const installment = document.createElement('span');
    installment.setAttribute('aria-live', 'polite');
    emiInner.append(emiTitle, installment);
    const logos = document.createElement('div');
    logos.className = 'cjs-emi-logos';
    const separator = document.createElement('span');
    separator.className = 'cjs-emi-separator';
    separator.textContent = 'أو';
    logos.append(image(ASSETS.tabby, 'تابي', 'cjs-emi-logo'), separator, image(ASSETS.tamara, 'تمارا', 'cjs-emi-logo'));
    emi.append(emiInner, logos);
    features.appendChild(emi);
    const custom = document.createElement('div');
    custom.className = 'cjs-product-features cjs-product-features-custom';
    custom.dir = 'rtl';
    custom.append(
      feature(ASSETS.moisture, '', 'تركيبته الغنية بفيتامين E والمرطبات تمنح الجسم والشعر ترطيباً ولمعاناً كما أنه يصلح للإستخدام على الملابس'),
      feature(ASSETS.scent, '', 'رائحة هادئة، أنيقة وغير مزعجة، تــدوم من ٦ إلى ٨ ساعــات')
    );
    const initialPrice = [...root.querySelectorAll('.total-price')].find(isVisible);
    const priceBox = initialPrice?.closest('.flex.whitespace-nowrap.gap-4.items-center');
    const anchor = priceBox && !priceBox.closest('salla-add-product-button') ? priceBox : form;
    anchor.after(features, custom);

    const discount = document.createElement('div');
    discount.className = 'product-single__discounted-amount aura-discount';
    discount.setAttribute('aria-live', 'polite');
    discount.hidden = true;
    const arabic = document.documentElement.lang.toLowerCase().startsWith('ar') || document.documentElement.dir === 'rtl';
    const savings = document.createElement('strong');
    const currency = document.createElement('i');
    currency.className = 'sicon-sar';
    currency.setAttribute('aria-hidden', 'true');
    discount.append(document.createTextNode(arabic ? 'وفّر ' : 'Save '), savings, document.createTextNode(' '), currency);

    function updatePriceDetails() {
      // Read Salla's visible price; never clone or replace its price controls.
      const price = [...root.querySelectorAll('.total-price')].find(isVisible);
      const current = price ? parsePrice(price.textContent) : null;
      const available = current !== null;
      setText(installment, available ? `قسّمها على 4 دفعات بقيمة ${(current / 4).toFixed(2)}` : 'قسّمها على 4 دفعات');
      const box = price?.closest('.flex.whitespace-nowrap.gap-4.items-center, .price-wrapper');
      const before = box ? [...box.querySelectorAll('.before-price')].find(isVisible) : null;
      const original = before ? parsePrice(before.textContent) : null;
      const nativeDiscount = root.querySelector('.product-single__discounted-amount:not(.aura-discount)');
      const showDiscount = available && original !== null && original > current && !nativeDiscount;
      if (showDiscount) {
        setText(savings, (original - current).toFixed(2));
        discount.setAttribute('aria-label', `${arabic ? 'وفّر' : 'Save'} ${(original - current).toFixed(2)} ${arabic ? 'ريال سعودي' : 'SAR'}`);
        if (box && box.nextElementSibling !== discount) box.after(discount);
      }
      if (discount.hidden === showDiscount) discount.hidden = !showDiscount;
    }
    updatePriceDetails();
    let frame = 0;
    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (form.isConnected) updatePriceDetails();
        else observer.disconnect();
      });
    };
    const observer = new MutationObserver(records => {
      if (records.some(record => !features.contains(record.target) &&
          !custom.contains(record.target) && !discount.contains(record.target))) scheduleUpdate();
    });
    observer.observe(root, {
      childList: true, characterData: true, subtree: true,
      attributes: true, attributeFilter: ['class', 'style', 'hidden']
    });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    return true;
  }

  function initDescription() {
    // This product uses an HTML description stored as escaped text.
    if (!/\/p1314179518\/?$/.test(window.location.pathname)) return;
    const container = document.querySelector('.product-single-top-description');
    if (!container) return;
    const article = container.querySelector('article');
    const raw = article?.textContent.trim().replace(/^"+|"+$/g, '');
    if (article && !article.children.length && raw && /^\s*</.test(raw)) {
      const parsed = new DOMParser().parseFromString(raw, 'text/html');
      const tags = new Set(['DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'STRONG', 'B', 'EM', 'I', 'SMALL', 'BR', 'HR', 'UL', 'OL', 'LI', 'A', 'IMG', 'BUTTON', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD']);
      const attributes = new Set(['class', 'id', 'dir', 'lang', 'role', 'title', 'alt', 'width', 'height', 'data-target', 'tabindex', 'colspan', 'rowspan']);
      const fragment = document.createDocumentFragment();
      function copySafe(source, target) {
        source.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) target.appendChild(document.createTextNode(node.textContent));
          else if (node.nodeType === Node.ELEMENT_NODE && tags.has(node.tagName)) {
            const element = document.createElement(node.tagName.toLowerCase());
            [...node.attributes].forEach(({ name, value }) => {
              if (attributes.has(name) || name.startsWith('aria-')) element.setAttribute(name, value);
              else if ((name === 'href' && node.tagName === 'A') || (name === 'src' && node.tagName === 'IMG')) {
                try {
                  const url = new URL(value, window.location.href);
                  if (['https:', 'http:'].includes(url.protocol) ||
                      (name === 'href' && ['mailto:', 'tel:'].includes(url.protocol))) element.setAttribute(name, url.href);
                } catch { /* Ignore malformed description URLs. */ }
              }
            });
            if (node.tagName === 'BUTTON') element.type = 'button';
            if (node.tagName === 'IMG') {
              if (!element.hasAttribute('alt')) element.alt = '';
              element.loading = 'lazy';
            }
            copySafe(node, element);
            target.appendChild(element);
          }
        });
      }
      copySafe(parsed.body, fragment);
      article.replaceChildren(fragment);
    }
    container.classList.add('loaded');
  }

  function initFlavors() {
    const elements = document.querySelectorAll('.flavors');
    if (!elements.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(element => element.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    elements.forEach(element => observer.observe(element));
  }

  function initAccordions() {
    const selector = '.header[data-target]';
    const observedPanels = new WeakSet();
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(() => {
      document.querySelectorAll(selector).forEach(header => {
        const panel = document.getElementById(header.dataset.target);
        if (panel?.classList.contains('active')) {
          const height = `${panel.scrollHeight}px`;
          if (panel.style.maxHeight !== height) panel.style.maxHeight = height;
        }
      });
    }) : null;
    function prepare(header) {
      const panel = document.getElementById(header.dataset.target);
      if (!panel) return null;
      if (!['BUTTON', 'SUMMARY'].includes(header.tagName)) {
        header.setAttribute('role', 'button');
        if (!header.hasAttribute('tabindex')) header.tabIndex = 0;
      } else if (header.tagName === 'BUTTON') header.type = 'button';
      header.setAttribute('aria-controls', panel.id);
      const open = panel.classList.contains('active');
      header.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
      if ('inert' in panel) panel.inert = !open;
      if (resizeObserver && !observedPanels.has(panel)) {
        [...panel.children].forEach(child => resizeObserver.observe(child));
        observedPanels.add(panel);
      }
      return panel;
    }
    document.querySelectorAll(selector).forEach(prepare);
    document.addEventListener('click', event => {
      const header = event.target.closest?.(selector);
      if (!header) return;
      const interactive = event.target.closest('a[href], button, input, select, textarea');
      if (interactive && interactive !== header) return;
      const panel = prepare(header);
      if (!panel) return;
      event.preventDefault();
      const open = !panel.classList.contains('active');
      panel.classList.toggle('active', open);
      header.classList.toggle('active', open);
      header.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
      if ('inert' in panel) panel.inert = !open;
      panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '0px';
    });
    document.addEventListener('keydown', event => {
      const header = event.target.closest?.(selector);
      if (!header || event.target !== header || ['BUTTON', 'SUMMARY'].includes(header.tagName)) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        header.click();
      }
    });
  }

  function injectStyles() {
    if (document.getElementById('aura-custom-styles')) return;
    const style = document.createElement('style');
    style.id = 'aura-custom-styles';
    style.textContent = `
      .aura-discount {
        display: inline-flex; align-items: center; justify-content: center;
        gap: .25rem; min-height: 1.75rem; padding: 0 .5rem;
        margin-block: .75rem; border: 1px solid #f87171; border-radius: .25rem;
      }
      .aura-discount[hidden] { display: none; }
      .aura-discount .sicon-sar { margin-inline-start: .25rem; }
    `;
    document.head.appendChild(style);
  }

  onReady(() => {
    injectStyles();
    initDescription();
    initFlavors();
    initAccordions();
    whenAvailable(initFooter);
    whenAvailable(initProduct, document.querySelector('main') || document.body);
  });
})();
