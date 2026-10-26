document.addEventListener("DOMContentLoaded", function () {
  const footerInner = document.querySelector(".store-footer__inner .container");

  // Elements (originals)
  const logoBlock = document.querySelector(".lg\\:col-\\[2\\]");
  const contactsRow = document.querySelector(".store-footer__contacts-row");
  const linksBlock = document.querySelector(".text-center.order-1");

  // Save original states
  const originalHTML = footerInner.innerHTML;
  const contactsOriginalParent = contactsRow.parentNode;
  const contactsNextSibling = contactsRow.nextSibling;

  function rearrangeFooter() {
    if (window.innerWidth < 1024) {
      // Mobile: clear and re-append in new order
      footerInner.innerHTML = "";
      if (logoBlock) footerInner.appendChild(logoBlock);
      if (contactsRow) footerInner.appendChild(contactsRow);
      if (linksBlock) footerInner.appendChild(linksBlock);
    } else {
      // Desktop: restore footerInner HTML
      footerInner.innerHTML = originalHTML;

      // Restore contacts row to its original parent
      if (contactsRow && contactsOriginalParent) {
        contactsOriginalParent.insertBefore(contactsRow, contactsNextSibling);
      }
    }
  }

  // Run on load + resize
  rearrangeFooter();
  window.addEventListener("resize", rearrangeFooter);
});

document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector(".store-footer__contacts-row");
  const contacts = row.querySelector("div");
  const social = row.querySelector("ul");

  // save original spot + classes
  const originalParent = social.parentNode;
  const originalNext = social.nextSibling;
  const originalClass = social.className;

  let isMobile = null;

  function updateLayout() {
    const mobile = window.innerWidth <= 1023;
    if (mobile && !isMobile) {
      // hide spans
      contacts.querySelectorAll("span").forEach(s => s.style.display = "none");
      // remove margin class
      social.classList.remove("mt-4");
      // move socials inside contacts div
      contacts.appendChild(social);
      isMobile = true;
    } else if (!mobile && isMobile) {
      // show spans
      contacts.querySelectorAll("span").forEach(s => s.style.display = "");
      // restore classes
      social.className = originalClass;
      // restore socials
      originalParent.insertBefore(social, originalNext);
      isMobile = false;
    }
  }

  updateLayout();
  window.addEventListener("resize", updateLayout);
});


document.addEventListener("DOMContentLoaded", () => {
  const footerInner = document.querySelector(".store-footer__inner");
  const footerBottom = document.querySelector(".footer-bottom");

  // save original place
  const originalParent = footerBottom.parentNode;
  const originalNext = footerBottom.nextSibling;

  let isMobile = null;

  function updateLayout() {
    const mobile = window.innerWidth <= 1023;
    if (mobile && !isMobile) {
      // move footer-bottom to the very end of footer
      footerInner.appendChild(footerBottom);
      isMobile = true;
    } else if (!mobile && isMobile) {
      // restore original position
      originalParent.insertBefore(footerBottom, originalNext);
      isMobile = false;
    }
  }

  updateLayout();
  window.addEventListener("resize", updateLayout);
});

document.addEventListener("DOMContentLoaded", () => {
  const taxBlock = document.querySelector(".flex.rtl\\:space-x-reverse.space-x-2.items-end.justify-center.mt-8");
  const footerBottom = document.querySelector(".footer-bottom");
  const originalParent = taxBlock?.parentNode;

  function moveTaxBlock() {
    if (!taxBlock || !footerBottom || !originalParent) return;

    if (window.innerWidth <= 768) {
      // Only move if not already inside footer-bottom
      if (!footerBottom.contains(taxBlock)) {
        footerBottom.appendChild(taxBlock);
      }
    } else {
      // Only move back if not already in original place
      if (!originalParent.contains(taxBlock)) {
        originalParent.appendChild(taxBlock);
      }
    }
  }

  moveTaxBlock();
  window.addEventListener("resize", moveTaxBlock);
});

document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.querySelector(".footer-bottom .container");
  const rightsSpan = document.querySelector(".footer-bottom .footer-rights");
  const paymentsUl = document.querySelector(".footer-bottom ul");

  // Remember original parent so we can restore on desktop
  const originalParent = rightsSpan?.parentNode;

  function moveRights() {
    if (!rightsSpan || !paymentsUl || !footerContainer) return;

    if (window.innerWidth <= 768) {
      // Mobile: move rightsSpan after paymentsUl
      if (paymentsUl.nextElementSibling !== rightsSpan) {
        paymentsUl.insertAdjacentElement("afterend", rightsSpan);
      }
    } else {
      // Desktop: restore if not already in original place
      if (originalParent && !originalParent.contains(rightsSpan)) {
        originalParent.insertBefore(rightsSpan, originalParent.firstChild);
      }
    }
  }

  moveRights();
  window.addEventListener("resize", moveRights);
});

document.addEventListener("DOMContentLoaded", function () {
  const socialList = document.querySelector(".rounded_contacts ul, ul.rounded_contacts, .rounded_contacts ul");

  if (socialList) {
    // Create the new <li> for Chefz
    const newItem = document.createElement("li");
    newItem.innerHTML = `
      <a href="https://thechefzco.app.link/QkTfjvB7BXb"
         rel="noopener"
         target="_blank"
         title="The Chefz"
         aria-label="The Chefz"
         class="social-link">
         <img src="https://i.postimg.cc/3Jkzh2WV/unnamed.png"
              alt="The Chefz"
              style="width:28px;height:28px;border-radius:6px;">
      </a>
    `;

    // Find the first <li> (Instagram) to insert after it
    const firstItem = socialList.querySelector("li");
    if (firstItem) {
      firstItem.insertAdjacentElement("beforebegin", newItem);
    } else {
      socialList.appendChild(newItem); // fallback
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const interval = setInterval(() => {
    const paymentsList = document.querySelector(
      "salla-payments ul.s-payments-list"
    );

    if (paymentsList) {
      clearInterval(interval);

      // Create li
      const li = document.createElement("li");
      li.className = "s-payments-list-item";

      // Create img
      const img = document.createElement("img");
      img.src = "https://i.postimg.cc/ZKMp012x/yx-XD3YMXTMr7cq-Du-Jnb-J5X4zh-Gy-Lqbv9Ux-PYu93g.jpg";
      img.alt = "Custom Payment";
      img.loading = "lazy";
      img.style.width = "100%";
      img.style.height = "100%";

      li.appendChild(img);
      paymentsList.appendChild(li);
    }
  }, 300);
});
document.addEventListener("DOMContentLoaded", function () {
  const subTitle = document.querySelector('.product-entry__sub-title');
  const mainTitle = document.querySelector('h1.text-store-text-primary');
  const title = subTitle || mainTitle;
  const priceBox = document.querySelector('.flex.whitespace-nowrap.gap-4.items-center');
  const totalPriceEl = priceBox.querySelector('.total-price');

let reviewsCount = "10"; // fallback

if (totalPriceEl) {
  let priceText = totalPriceEl.textContent.trim();
  let digits = priceText.replace(/\D/g, '');

  if (digits.length > 0) {
    reviewsCount = digits.slice(0, 2);
  }
}


  if (reviewsCount.length === 0) reviewsCount = "10";
    if (title && priceBox && !document.querySelector('.custom-rating')) {

    // ⭐ التقييم
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'custom-rating flex items-center gap-1 my-3';
    ratingDiv.style.color = '#fbbf24';

    const starSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 32" fill="currentColor">
        <path d="M29.714 11.839c0 0.321-0.232 0.625-0.464 0.857l-6.482 6.321 1.536 8.929c0.018 0.125 0.018 0.232 0.018 0.357 0 0.464-0.214 0.893-0.732 0.893-0.25 0-0.5-0.089-0.714-0.214l-8.018-4.214-8.018 4.214c-0.232 0.125-0.464 0.214-0.714 0.214-0.518 0-0.75-0.429-0.75-0.893 0-0.125 0.018-0.232 0.036-0.357l1.536-8.929-6.5-6.321c-0.214-0.232-0.446-0.536-0.446-0.857 0-0.536 0.554-0.75 1-0.821l8.964-1.304 4.018-8.125c0.161-0.339 0.464-0.732 0.875-0.732s0.714 0.393 0.875 0.732l4.018 8.125 8.964 1.304c0.429 0.071 1 0.286 1 0.821z"></path>
      </svg>`;

    let starsHTML = '';
    for (let i = 0; i < 5; i++) starsHTML += `<span class="s-rating-stars-selected">${starSVG}</span>`;

    ratingDiv.innerHTML = `<div class="flex">${starsHTML}</div>
      <span class="text-gray-500 text-sm ms-1">(${reviewsCount} reviews)</span>`

    // ⭐ نسخ السعر
    const clonedPrice = priceBox.cloneNode(true);
    clonedPrice.style.margin = '1rem 0';

    // ⭐ حساب التخفيض من السعر الحالي والأصلي
    const totalPriceEl = priceBox.querySelector('.total-price');
    const beforePriceEl = priceBox.querySelector('.before-price');

    let discountAmount = 0;
    if (totalPriceEl && beforePriceEl) {
      const totalPrice = parseFloat(totalPriceEl.textContent.replace(/[^\d.]/g, ''));
      const beforePrice = parseFloat(beforePriceEl.textContent.replace(/[^\d.]/g, ''));
      discountAmount = beforePrice - totalPrice;
    }

    // ⭐ عنصر التخفيض
    const discountHTML = `
      <div class="product-single__discounted-amount">
        <span>
          <div class="product-count-sale">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 512.165 512.165">
              <path d="m437.476 320.656c-.004-.05-.007-.101-.011-.15-1.541-21.368-5.481-39.513-12.39-57.037-.093-.265-.193-.528-.302-.79-.395-.951-39.225-95.684-21.044-147.746 1.641-4.697.845-9.901-2.123-13.894s-7.716-6.249-12.691-6.037c-1.333.058-28.492 1.565-57.3 26.911-25.213-52.021-29.194-107.287-29.235-107.89-.341-5.227-3.383-9.896-8.026-12.32-4.644-2.425-10.213-2.249-14.697.457-39.788 24.034-70.525 53.365-91.356 87.18-16.82 27.302-27.192 57.459-30.829 89.634-2.184 19.327-1.665 37.002-.054 51.85.746 6.879-6.125 12.051-12.529 9.432l-38.613-15.797c-2.632-1.077-5.512-1.525-8.32-1.073-5.912.952-10.518 5.194-12.095 10.682-3.504 12.189-6.128 23.455-8.023 34.441-6.596 38.261-3.897 77.447 7.802 113.325 11.762 36.068 32.059 67.129 58.697 89.824 31.481 26.822 69.604 40.477 111.176 40.477 22.939 0 46.93-4.158 71.431-12.557 38.865-13.321 69.645-39.707 89.011-76.303 16.095-30.419 23.739-66.863 21.521-102.619z" fill="#ff001e" data-original="#ff001e"></path>
              <path d="m296.687 260.081c-3.792-5.657-10.918-8.056-17.356-5.829-6.438 2.223-10.57 8.503-10.063 15.295 1.789 23.976-.608 94.475-33.954 103.618-28.387 7.787-43.529-5.362-45-6.726-3.681-4.013-9.084-5.533-14.39-4.261-5.342 1.285-9.38 5.573-10.805 10.879-.283 1.053-2.793 10.461-3.851 16.59-6.784 39.356 6.081 78.356 33.576 101.781 16.127 13.74 35.578 20.736 56.725 20.736 11.536 0 23.58-2.084 35.855-6.292 19.779-6.78 36.691-21.121 48.908-41.475 10.219-17.024 16.161-36.889 16.305-54.5.366-45.31-16.889-91.515-55.95-149.816z" fill="#ffeb00" data-original="#ffeb00"></path>
            </svg>
          </div>
        </span>
        <span class="font-bold">
          Save <strong>${discountAmount.toFixed(2)} <i class="sicon-sar"></i></strong>
        </span>
      </div>
    `;

    // ⭐ wrapper للسعر + التخفيض
    const priceWrapper = document.createElement('div');
    priceWrapper.className = 'flex items-center gap-4 my-3';
    priceWrapper.appendChild(clonedPrice);

    const discountDiv = document.createElement('div');
    discountDiv.innerHTML = discountHTML;
    priceWrapper.appendChild(discountDiv);

    // ⭐ ترتيب العناصر
    title.after(ratingDiv);
    ratingDiv.after(priceWrapper);

    // ⭐ إضافة CSS للتخفيض والنجوم
    const style = document.createElement('style');
    style.innerHTML = `
      .product-single__discounted-amount {
          border-width: 1px;
          height: 1.75rem;
          --tw-border-opacity: 1;
          align-items: center;
          border-color: #f87171;
          border-color: rgba(248,113,113,var(--tw-border-opacity,1));
          display: flex;
          justify-content: center;
          transition-duration: .5s;
          transition-property: opacity;
          transition-timing-function: cubic-bezier(.4,0,.2,1);
          padding: 0 0.5rem;
          border-radius: 0.25rem;
      }
      .s-rating-stars-selected { fill: #fbbf24; }
    `;
    document.head.appendChild(style);
  }
});
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.href === "https://aurascentstore.com/ar/test/p1314179518") {
        const container = document.querySelector(".product-single-top-description");
        const article = container?.querySelector("article");

        if (article) {
            let raw = article.textContent.trim();

            // Remove wrapping quotes
            raw = raw.replace(/^"+|"+$/g, "");

            // Replace content
            container.innerHTML = raw;
        }

        // Show after processing
        container.classList.add("loaded");
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.flavors');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".header").forEach((btn) => {

    btn.addEventListener("click", function () {

      const id = this.dataset.target;
      const content = document.getElementById(id);
      const icon = this.querySelector(".icon");

      if (!content) return;

      const isOpen = content.classList.contains("active");

      if (isOpen) {
        content.style.maxHeight = "0px";
        content.classList.remove("active");
        this.classList.remove("active");   

      } else {
        content.classList.add("active");
        this.classList.add("active");     
        content.style.maxHeight = content.scrollHeight + "px";
      }

    });

  });

});
document.addEventListener("DOMContentLoaded", function () {

    setTimeout(() => {

        const form = document.querySelector("#product-form, form.product-form");
        if (!form) return;

        if (form.querySelector(".cjs-product-features-inserted")) return;

        const productId = document.querySelector('input[name="id"]')?.value;
        if (!productId) return;

        const specialProducts = [
            "264879371",
            "1944450294",
            "220026667",
            "1733548863"
        ];

        // =========================
        // GET ONLY VISIBLE PRICE (FIXED)
        // =========================
        let price = 0;

        const priceEl = Array.from(document.querySelectorAll(".total-price"))
            .find(el => el.offsetParent !== null);

        if (priceEl) {
            price = parseFloat(priceEl.textContent.replace(/[^\d.]/g, "")) || 0;
        }

        const installment = (price / 4).toFixed(2);

        let html = "";

        // =========================
        // GROUP 1
        // =========================
        if (specialProducts.includes(productId)) {

            html = `
            <div class="cjs-product-features cjs-product-features-inserted" dir="rtl">

                <div class="cjs-prod-feature-box">
                    <img src="https://cdn.salla.sa/RAxyqv/products/8qQDxwM8sIGmCBa8DFWCV8BlTKZVKygiR9fBsmJr.png" class="cjs-prod-feature-img">
                    <div class="cjs-prod-feature-inner">
                        <a>طرق الدفع</a>
                        <span>خيارات دفع آمنة ومتنوعة</span>
                    </div>
                </div>
<!--
                <div class="cjs-prod-feature-box">
                    <img src="https://cdn.salla.sa/RAxyqv/products/1bWyZAYbjdeckHbCG1ex09UNunHe3aBVyXzepPDg.png" class="cjs-prod-feature-img">
                    <div class="cjs-prod-feature-inner">
                        <a>ثبات</a>
                        <span>ثبات عالي يرافقك لساعات</span>
                    </div>
                </div> 
-->
                <div class="cjs-prod-feature-box">
                    <img src="https://cdn.salla.sa/RAxyqv/products/pA4XQ8A2xd0HsWopPA4M5OnWOGQkNtywL5jVE9nV.png" class="cjs-prod-feature-img">
                    <div class="cjs-prod-feature-inner">
                        <a>توصيل سريع</a>
                        <span>توصيل إكسبرس داخل الرياض خلال 24 ساعة</span>
                    </div>
                </div>

                <div class="cjs-prod-feature-box cjs-prod-feature-box--emi">
                    <div class="cjs-prod-feature-inner">
                        <a>تابــي وتمــــارا</a>
                        <span>قسّمها على 4 دفعات بقيمة ${installment}</span>
                    </div>

                    <div class="cjs-emi-logos">
                        <img src="https://cdn.salla.sa/RAxyqv/products/QVQZfDuex29GWWpXA9bzXfPySkOQ55F63pMAdZKz.png" class="cjs-emi-logo">
                       <span class="cjs-emi-separator">أو</span>
                        <img src="https://cdn.salla.sa/RAxyqv/products/Eqym8xlTFahRs4PJKBCYgVPs8oiXsNCFB39WcYGx.png" class="cjs-emi-logo">
                    </div>
                </div>

            </div>
            <div class="cjs-product-features cjs-product-features-custom" dir="rtl">
              <div class="cjs-prod-feature-box">
                  <img src="https://cdn.files.salla.network/other/437073385/7b85b349-fb2d-4c68-89fa-677c34bf6376-original.webp" class="cjs-prod-feature-img">
          
                  <div class="cjs-prod-feature-inner">
                      <span>تركيبته الغنية بفيتامين E والمرطبات تمنح الجسم والشعر ترطيباً ولمعاناً كما أنه يصلح للإستخدام على الملابس</span>
                  </div>
              </div>
          
          
              <div class="cjs-prod-feature-box">
                  <img src="https://cdn.files.salla.network/other/437073385/45da680b-591b-4bd8-b031-bd8e9484f428-original.webp" class="cjs-prod-feature-img">
          
                  <div class="cjs-prod-feature-inner">
                      <span>رائحة هادئة، أنيقة وغير مزعجة، تــدوم من ٦ إلى ٨ ساعــات</span>
                  </div>
              </div>
          
          </div>
            `;
        }

        // =========================
        // GROUP 2 (ALL OTHER PRODUCTS)
        // =========================
        else {

            html = `
            <div class="cjs-product-features cjs-product-features-inserted" dir="rtl">

                <div class="cjs-prod-feature-box">
                    <img src="https://cdn.files.salla.network/other/437073385/1217c5d4-a814-4cec-8392-1d2c9d7ed4d2-original.webp" class="cjs-prod-feature-img aura-logo">
                    <div class="cjs-prod-feature-inner">
                        <a>الضمان الذهبي</a>
                        <span>لتقديم أعلى معايير الجودة</span>
                    </div>
                </div>
<!--
                <div class="cjs-prod-feature-box">
                    <img src="https://cdn.salla.sa/RAxyqv/products/1bWyZAYbjdeckHbCG1ex09UNunHe3aBVyXzepPDg.png" class="cjs-prod-feature-img">
                    <div class="cjs-prod-feature-inner">
                        <a>ثبات</a>
                        <span>ثبات عالي يرافقك لساعات</span>
                    </div>
                </div>
-->
                <div class="cjs-prod-feature-box">
                    <img src="https://cdn.salla.sa/RAxyqv/products/pA4XQ8A2xd0HsWopPA4M5OnWOGQkNtywL5jVE9nV.png" class="cjs-prod-feature-img">
                    <div class="cjs-prod-feature-inner">
                        <a>توصيل سريع</a>
                        <span>توصيل إكسبرس داخل الرياض خلال 24 ساعة</span>
                    </div>
                </div>

                <div class="cjs-prod-feature-box cjs-prod-feature-box--emi">
                    <div class="cjs-prod-feature-inner">
                        <a>تابــي وتمــــارا</a>
                        <span>قسّمها على 4 دفعات بقيمة ${installment}</span>
                    </div>

                    <div class="cjs-emi-logos">
                        <img src="https://cdn.salla.sa/RAxyqv/products/QVQZfDuex29GWWpXA9bzXfPySkOQ55F63pMAdZKz.png" class="cjs-emi-logo">
                       <span class="cjs-emi-separator">أو</span>
                        <img src="https://cdn.salla.sa/RAxyqv/products/Eqym8xlTFahRs4PJKBCYgVPs8oiXsNCFB39WcYGx.png" class="cjs-emi-logo">
                    </div>
                </div>

            </div>
            <div class="cjs-product-features cjs-product-features-custom" dir="rtl">
                <div class="cjs-prod-feature-box">
                    <img src="https://cdn.files.salla.network/other/437073385/7b85b349-fb2d-4c68-89fa-677c34bf6376-original.webp" class="cjs-prod-feature-img">
            
                    <div class="cjs-prod-feature-inner">
                        <span>تركيبته الغنية بفيتامين E والمرطبات تمنح الجسم والشعر ترطيباً ولمعاناً كما أنه يصلح للإستخدام على الملابس</span>
                    </div>
                </div>
            
            
                <div class="cjs-prod-feature-box">
                    <img src="https://cdn.files.salla.network/other/437073385/45da680b-591b-4bd8-b031-bd8e9484f428-original.webp" class="cjs-prod-feature-img">
            
                    <div class="cjs-prod-feature-inner">
                        <span>رائحة هادئة، أنيقة وغير مزعجة، تــدوم من ٦ إلى ٨ ساعــات</span>
                    </div>
                </div>
            
            </div>
            `;
        }

        // =========================
        // SAFE INJECTION
        // =========================
             const priceBlock = document.querySelector(".flex.items-center.gap-4.my-3");

        if (priceBlock) {
            priceBlock.insertAdjacentHTML("afterend", html);
        } else {
            form.insertAdjacentHTML("afterend", html);
        }
    }, 1500);

});