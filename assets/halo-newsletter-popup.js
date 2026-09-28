class NewsletterPopup extends HTMLElement {
    constructor() {
        super();

        this.popup = this;
        this.timeToShow = parseInt(this.popup.getAttribute('data-delay'));
        // Días que la cookie recuerda un CIERRE (configurable en el tema).
        this.expiresDate = parseInt(this.popup.getAttribute('data-expire')) || 7;
        // Una SUSCRIPCIÓN se recuerda "para siempre" (10 años) → no vuelve a mostrarse.
        this.subscribeExpire = 3650;
        this.form = this.querySelector('#ContactPopup');
        this.phoneLocal = this.querySelector('[data-newsletter-phone-local]');
        this.phone = this.querySelector('[data-newsletter-phone]');
        this.phoneNote = this.querySelector('[data-newsletter-phone-note]');
        if (this.getCookie('newsletter-popup') === ''){
            var popup = this.popup;

            setTimeout(function() {
                document.body.classList.add('newsletter-show');
            }, this.timeToShow);

            setTimeout(() => {
                document.body.classList.add('show-newsletter-image');
            }, this.timeToShow + 700)
        } else {
            // this.deleteCookie('newsletter-popup');
        }
        
        document.body.addEventListener('click', this.onBodyClickEvent.bind(this));

        this.querySelector('[data-close-newsletter-popup]').addEventListener(
            'click',
            this.setClosePopup.bind(this, false)
        );

        // Al enviar el formulario, marcar como suscrito (no volver a mostrar).
        if (this.form) {
            this.form.addEventListener('submit', this.onSubmit.bind(this));
        }
        if (this.phoneLocal) {
            this.phoneLocal.addEventListener('input', this.onPhoneInput.bind(this));
        }
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    getCookie(cname) {
        const name = cname + '=';
        const ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return '';
    }

    deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    normalizePhone() {
        if (!this.phoneLocal) return '';

        var digits = this.phoneLocal.value.replace(/\D/g, '');
        if (digits.indexOf('57') === 0 && digits.length === 12) {
            digits = digits.substring(2);
        }

        this.phoneLocal.value = digits.substring(0, 10);
        return digits.length === 10 ? '+57' + digits : '';
    }

    onPhoneInput() {
        this.phoneLocal.setCustomValidity('');
        this.phoneLocal.value = this.phoneLocal.value.replace(/\D/g, '').substring(0, 10);
    }

    onSubmit(event) {
        var normalizedPhone = this.normalizePhone();

        if (!normalizedPhone) {
            event.preventDefault();
            this.phoneLocal.setCustomValidity('Ingresa un número celular colombiano de 10 dígitos.');
            this.phoneLocal.reportValidity();
            return;
        }

        this.phoneLocal.setCustomValidity('');
        this.phone.value = normalizedPhone;
        this.phoneNote.value = normalizedPhone;
        this.hidePopup();
    }

    hidePopup() {
        document.body.classList.remove('newsletter-show');
        setTimeout(() => {
            document.body.classList.remove('show-newsletter-image');
        }, 700);
    }

    setClosePopup(subscribed) {
        // subscribed === true → recordar "para siempre"; si solo cerró → expiresDate días.
        if (subscribed === true) {
            this.setCookie('newsletter-popup', 'subscribed', this.subscribeExpire);
        } else {
            this.setCookie('newsletter-popup', 'closed', this.expiresDate);
        }
        this.hidePopup();
    }

    onBodyClickEvent(event){
        if ((!this.contains(event.target)) && ($(event.target).closest('[data-open-newsletter-popup]').length === 0) && document.querySelector('body').classList.contains('newsletter-show')){
            this.setClosePopup(false);
        }
    }
}

customElements.define('newsletter-popup', NewsletterPopup);

class NewsletterMessagePopup extends HTMLElement {
    constructor() {
        super();

        this.querySelector('[data-close-newsletter-message-popup]').addEventListener(
            'click',
            this.close.bind(this)
        );

        document.body.addEventListener('click', this.onBodyClickEvent.bind(this));
    }

    close(){
        document.body.classList.remove('newsletter-message-show');
    }

    onBodyClickEvent(event){
        if (!this.contains(event.target)){
            this.close();
        }
    }
}

customElements.define('newsletter-message-popup', NewsletterMessagePopup);
