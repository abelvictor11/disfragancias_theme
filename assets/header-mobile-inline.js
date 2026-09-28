    class StickyHeaderMobile extends HTMLElement {
        constructor() {
            super();
        }
  
        connectedCallback() {
            this.header = document.querySelector('.section-header-mobile');
            this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type') === 'always' || this.getAttribute('data-sticky-type') === 'reduce-logo-size';
            this.headerBounds = {};
    
            if (this.headerIsAlwaysSticky) {
            this.header.classList.add('shopify-section-header-sticky');
            };
    
            this.currentScrollTop = 0;
            this.preventReveal = false;
            this.predictiveSearch = this.querySelector('predictive-search');
    
            this.onScrollHandler = this.onScroll.bind(this);
            this.hideHeaderOnScrollUp = () => this.preventReveal = true;
    
            this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
            window.addEventListener('scroll', this.onScrollHandler, false);
    
            this.createObserver();
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
    
            if (this.predictiveSearch && this.predictiveSearch.isOpen) return;
    
            if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                this.header.classList.add('scrolled-past-header');
                if (this.preventHide) return;
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
            if (this.headerIsAlwaysSticky) return;
            this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
            this.header.style.top = '';
        }
  
        reveal() {
            const headerMultiSite = document.querySelector('.section-header-nav-multi-site');
            if (this.headerIsAlwaysSticky) return;
            this.header.classList.add('shopify-section-header-sticky', 'animate');
            this.header.classList.remove('shopify-section-header-hidden');
            if (headerMultiSite) {
                const height = headerMultiSite.offsetHeight;
                this.header.style.top = `${height}px`;
            }
        }
  
        reset() {
            if (this.headerIsAlwaysSticky) return;
            this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky', 'animate');
            this.header.style.top = '';
        }
    }
  
    customElements.define('sticky-header-mobile', StickyHeaderMobile);

    document.querySelector('[data-mobile-menu]').addEventListener('click', () => {
        document.body.classList.toggle('menu_open');
    })

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    function renderLogoMobile() {
        if ($("[data-menu-tab]").length > 0) {

            $(document).on("click", "[data-menu-tab] li", (event) => {
                var active = $(event.currentTarget).data("load-page"),
                    href = $(event.currentTarget).attr("href");

                setCookie("page-url", active, {
                    expires: 1,
                    path: "/",
                });
            });

            var canonical = $("[canonical-shop-url]").attr("canonical-shop-url"),
            pageUrl = setCookie("page-url"),
            menuTabItem,
            logoTabItem,
            menuItem;

            if (
                window.location.pathname.indexOf("/pages/") !== -1 &&
                window.page_active &&
                window.page_active != pageUrl
            ) {
                setCookie("page-url", window.page_active, 1);
                pageUrl = window.page_active;
            }
            if (pageUrl != null) {
                menuTabItem = $(`[data-load-page="${pageUrl}"]`);
                logoTabItem = $(`[data-load-logo-page="${pageUrl}"]`);
                menuItem = $(`[data-load-menu-page="${pageUrl}"]`);
            } else {
                menuTabItem = $("[data-load-page].is-active");
                logoTabItem = $("[data-load-logo-page].first");
                menuItem = $("[data-load-menu-page].is-active");
            }

            var menuTab = menuTabItem.closest("[data-menu-tab]");

            menuTab
                .find("[data-load-page]")
                .not(menuTabItem)
                .removeClass("is-active");
                logoTabItem.siblings().removeClass("is-active");
                menuItem.siblings().removeClass("is-active");
            if (pageUrl != "") {
                logoTabItem.addClass("is-active");
                menuTabItem.addClass("is-active");
                menuItem.addClass("is-active");
            } else {
                $("[data-load-page]:nth-child(1)").addClass("is-active");
                $("[data-load-logo-page]:nth-child(1)").addClass("is-active");
                $("[data-load-menu-page]:nth-child(1)").addClass("is-active");
            }

            const header = menuTabItem.closest(".header");

            
            if (header && window.innerWidth < 1025) {
                if (
                    window.location.pathname.indexOf("/pages/") !== -1 &&
                    window.page_active &&
                    window.page_active != pageUrl
                ) {
                    setCookie("page-url", window.page_active, 1);
                    pageUrl = window.page_active;
                }

                const logoMobile = $(".header-mobile .header__heading-link");
                const logDesktop = header.find(".header__heading-link.is-active");

                if (logDesktop.data("logo-mobile") == undefined) {
                    logoMobile.find("img").addClass("logo-show");
                    return;
                } else {
                    logoMobile.html(
                    `<img src="${logDesktop.data(
                        "logo-mobile"
                    )}" alt="${logDesktop.data(
                        "logo-mobile-alt"
                    )}" style="max-width: ${logoMobile.data(
                        "logo-width"
                    )}px; height: auto"/>`
                    );

                    logoMobile.find("img").addClass("logo-show");
                    if (pageUrl != "" && pageUrl != null)
                    logoMobile.attr("href", pageUrl);
                }
            }
        }
    }

    renderLogoMobile();
