(function () {
    'use strict';

    var LABEL_SELECTOR = '.card .swatch-label[data-variant-id], .usf-plugin-swatchs label[for^="size-"]';

    function closest(element, selector) {
        return element && element.closest ? element.closest(selector) : null;
    }

    function variantIdFromLabel(label) {
        var nativeId = label.getAttribute('data-variant-id');
        var labelFor = label.getAttribute('for') || '';

        if (nativeId) return String(nativeId);
        if (labelFor.indexOf('size-') === 0) return labelFor.slice(5);
        return '';
    }

    function productData(card) {
        var raw = card.getAttribute('data-json-product');

        if (!raw) return null;

        try {
            return JSON.parse(raw);
        } catch (error) {
            return null;
        }
    }

    function imageUrl(variant, label) {
        var featured = variant && variant.featured_image;
        var media = variant && variant.featured_media;
        var labelImage = label.getAttribute('data-variant-img');

        if (featured && featured.src) return featured.src;
        if (media && media.preview_image && media.preview_image.src) return media.preview_image.src;
        if (labelImage) return labelImage;
        return '';
    }

    function absoluteImageUrl(url) {
        if (!url) return '';
        if (url.indexOf('//') === 0) return window.location.protocol + url;
        return url;
    }

    function updateMainImage(card, url) {
        var media = card.querySelector('.card-media');
        var image;
        var picture;
        var sources;
        var i;

        if (!media || !url) return;

        image = media.querySelector('img');
        if (!image) return;

        url = absoluteImageUrl(url);
        picture = image.parentElement && image.parentElement.tagName === 'PICTURE' ? image.parentElement : null;
        sources = picture ? picture.querySelectorAll('source') : [];

        for (i = 0; i < sources.length; i++) {
            sources[i].setAttribute('srcset', url);
            sources[i].setAttribute('data-srcset', url);
        }

        image.setAttribute('src', url);
        image.setAttribute('srcset', url);
        image.setAttribute('data-src', url);
        image.setAttribute('data-srcset', url);
    }

    function updateProductLinks(card, variantId) {
        var links = card.querySelectorAll('a[href*="/products/"]');
        var i;

        for (i = 0; i < links.length; i++) {
            try {
                var url = new URL(links[i].href, window.location.origin);
                url.searchParams.set('variant', variantId);
                links[i].href = url.pathname + url.search + url.hash;
            } catch (error) {
                // La imagen debe seguir cambiando aunque un enlace no sea una URL válida.
            }
        }
    }

    function applyVariant(label) {
        var card = closest(label, '.product-item');
        var variantId = variantIdFromLabel(label);
        var product = card && productData(card);
        var variants = product && product.variants;
        var variant = null;
        var i;

        if (!card || !variantId || !variants) return;

        for (i = 0; i < variants.length; i++) {
            if (String(variants[i].id) === variantId) {
                variant = variants[i];
                break;
            }
        }

        if (!variant) return;

        updateMainImage(card, imageUrl(variant, label));
        updateProductLinks(card, variantId);
    }

    function scheduleApply(label) {
        applyVariant(label);
        window.requestAnimationFrame(function () {
            applyVariant(label);
        });
        window.setTimeout(function () {
            applyVariant(label);
        }, 120);
    }

    document.addEventListener('click', function (event) {
        var label = closest(event.target, LABEL_SELECTOR);

        if (label) scheduleApply(label);
    }, true);
}());
