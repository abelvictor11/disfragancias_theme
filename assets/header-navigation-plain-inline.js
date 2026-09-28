var sticky = document.getElementsByTagName('sticky-header')[0].querySelector('.header-nav-plain');

if (sticky != undefined || sticky != null) {
    class StickyHeader extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.header = document.querySelector('.section-header-navigation');
      this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type');

      this.headerBounds = {};

      this.setHeaderHeight();

      window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

      if (this.headerIsAlwaysSticky) {
        this.header.classList.add('shopify-section-header-sticky');
      };

      this.currentScrollTop = 0;
      this.preventReveal = false;

      this.onScrollHandler = this.onScroll.bind(this);
      this.hideHeaderOnScrollUp = () => this.preventReveal = true;

      this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
      window.addEventListener('scroll', this.onScrollHandler, false);

      this.createObserver();
    }

    setHeaderHeight() {
      document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
    }

    disconnectedCallback() {
      this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
      window.removeEventListener('scroll', this.onScrollHandler);
    }

    createObserver() {
      let observer = new IntersectionObserver((entries, observer) => {
        this.headerBounds = entries[0].intersectionRect;
        observer.disconnect();
      });

      observer.observe(this.header);
    }

    onScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
        if (this.preventHide) return;
        this.header.classList.add('scrolled-past-header');
        requestAnimationFrame(this.hide.bind(this));
      } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
        this.header.classList.add('scrolled-past-header');

        if (!this.preventReveal) {
          requestAnimationFrame(this.reveal.bind(this));
        } else {
          window.clearTimeout(this.isScrolling);

          this.isScrolling = setTimeout(() => {
            this.preventReveal = false;
          }, 66);

          requestAnimationFrame(this.hide.bind(this));
        }
      } else if (scrollTop <= this.headerBounds.top) {
        this.header.classList.remove('scrolled-past-header');
        requestAnimationFrame(this.reset.bind(this));
      }

      this.currentScrollTop = scrollTop;
    }

    hide() {
        if (this.headerIsAlwaysSticky != null) {
            if (this.headerIsAlwaysSticky === 'always') {
                this.header.classList.add('shopify-section-header-sticky');
                return
            } else {
                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                this.header.classList.remove('shopify-section-header-show');
            }
        }
      this.closeMenuDisclosure();
    }

    reveal() {
        if (this.headerIsAlwaysSticky != null) {
          if (this.headerIsAlwaysSticky === 'always') {
                this.header.classList.add('shopify-section-header-sticky', 'animate');
                return
            } else {
              this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-show', 'animate');
              this.header.classList.remove('shopify-section-header-hidden');
          }
        }
    }

    reset() {
        if (this.headerIsAlwaysSticky != null) {
          if (this.headerIsAlwaysSticky === 'always') {
                this.header.classList.add('shopify-section-header-sticky', 'animate');
                return
            } else {
              this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-show', 'shopify-section-header-sticky', 'animate');
          }
        }
    }

    closeMenuDisclosure() {
      this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
      this.disclosures.forEach(disclosure => disclosure.close());
    }
  }

  customElements.define('sticky-header', StickyHeader);
}
