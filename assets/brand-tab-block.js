    class BrandsTab extends HTMLElement {
        constructor() {
            super();
            this.tabTitle = this.querySelector('.tab-title');
            this.tabContent = this.querySelector('.tab-panel-content');
            const ele = this.querySelectorAll('[tab-title-action]');
            const actionLoadMore = this.querySelectorAll('[data-load-more-block]');
            this.widthWindow = 0;
            if (ele.length) {
                ele.forEach((button) => button.addEventListener('click', this.onActive.bind(this)));
            }
            if (actionLoadMore.length) {
                actionLoadMore.forEach((button) => button.addEventListener('click', this.onLoadMore.bind(this)));
            }
        }

        onActive(e) {
            this.tabTitle.querySelector('.active').classList.remove('active');
            this.tabContent.querySelector('.active').classList.remove('active');
            this.querySelector(e.target.dataset.target).classList.add('active');
            e.target.parentElement.classList.add('active');
        }
        onLoadMore(e) {
            this.resize();
            if (this.widthWindow > 1024) {
                var eleHide = (e.target.parentElement).querySelectorAll('.hidden-lg');
                var _number = e.target.dataset.rowlg;
                var _class = 'hidden-lg';
                
            } else if(this.widthWindow > 551) {
                var eleHide = (e.target.parentElement).querySelectorAll('.hidden-md');
                var _number = 9;
                var _class = 'hidden-md';
            } else {
                var eleHide = (e.target.parentElement).querySelectorAll('.hidden-sm');
                var _number = 6;
                var _class = 'hidden-sm';
            }
            if (eleHide.length) {
                // let number_show = (eleHide.length > number ? number : eleHide.length);
                if (e.target.classList.contains('more')) {
                    for (let i = 0; i < eleHide.length; i++) {
                        eleHide[i].classList.remove('show');
                    }
                    e.target.querySelector('span').textContent = e.target.dataset.buttonmore;
                    e.target.classList.remove('more');
                } else {
                    for (let i = 0; i < eleHide.length; i++) {
                        eleHide[i].classList.add('show');
                    }
                    e.target.querySelector('span').textContent = e.target.dataset.buttonless;
                    e.target.classList.add('more');
                }

                // (eleHide.length > _number ? '' : e.target.classList.add('hidden'));
            }
        }
        resize() {
            this.widthWindow = window.innerWidth;
        }
    }
    customElements.define('brand-tab', BrandsTab);
