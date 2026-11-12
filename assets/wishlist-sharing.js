(function (root, factory) {
    var api = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }

    if (root) {
        root.WishlistSharing = api;
    }
})(typeof window !== 'undefined' ? window : globalThis, function () {
    'use strict';

    function absoluteUrl(url, origin) {
        if (!url) return '';

        try {
            return new URL(url, origin).href;
        } catch (error) {
            return '';
        }
    }

    function buildPayload(items, origin) {
        var products = (Array.isArray(items) ? items : []).map(function (item) {
            var title = String(item && item.title || '').trim();
            var price = String(item && item.price || '').trim();
            var url = absoluteUrl(item && item.url, origin);

            if (!title || !url) return '';

            return [
                title,
                price ? 'Precio: ' + price : '',
                url
            ].filter(Boolean).join('\n');
        }).filter(Boolean);

        return ['Mi lista de deseos'].concat(products).join('\n\n');
    }

    function buildEmailUrl(payload) {
        return 'mailto:?subject=' + encodeURIComponent('Mi lista de deseos') + '&body=' + encodeURIComponent(payload);
    }

    function buildWhatsAppUrl(payload) {
        return 'https://wa.me/?text=' + encodeURIComponent(payload);
    }

    function fallbackCopy(text, documentObject) {
        if (!documentObject || !documentObject.body || typeof documentObject.execCommand !== 'function') {
            return Promise.reject(new Error('Clipboard unavailable'));
        }

        var textarea = documentObject.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        documentObject.body.appendChild(textarea);
        textarea.select();

        var copied = documentObject.execCommand('copy');
        documentObject.body.removeChild(textarea);

        if (!copied) return Promise.reject(new Error('Copy command failed'));

        return Promise.resolve('fallback');
    }

    function copyText(text, environment) {
        var env = environment || root || {};

        if (env.navigator && env.navigator.clipboard && typeof env.navigator.clipboard.writeText === 'function') {
            return env.navigator.clipboard.writeText(text).then(function () {
                return 'clipboard';
            }).catch(function () {
                return fallbackCopy(text, env.document);
            });
        }

        return fallbackCopy(text, env.document);
    }

    return {
        buildPayload: buildPayload,
        buildEmailUrl: buildEmailUrl,
        buildWhatsAppUrl: buildWhatsAppUrl,
        copyText: copyText
    };
});
