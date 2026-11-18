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

    function variantText(variant) {
        return [variant.title, variant.option1, variant.option2, variant.option3]
            .filter(Boolean)
            .join(' ');
    }

    function variantVolume(variant) {
        var match = variantText(variant).match(/(?:^|\s)(\d+(?:[.,]\d+)?)\s*ml\b/i);

        return match ? parseFloat(match[1].replace(',', '.')) : null;
    }

    function isDecantVariant(variant) {
        var text = variantText(variant);
        var volume = variantVolume(variant);

        return /\b(decant|vial|muestra|sample)\b/i.test(text) || (volume !== null && volume <= 20);
    }

    function availableVariants(variants) {
        return variants.filter(function (variant) {
            return variant.available !== false;
        });
    }

    function primaryVariant(variants) {
        var available = availableVariants(variants);
        var fullVariants = available.filter(function (variant) {
            return !isDecantVariant(variant);
        });

        fullVariants.sort(function (a, b) {
            var volumeA = variantVolume(a);
            var volumeB = variantVolume(b);

            if (volumeA !== null || volumeB !== null) {
                return (volumeB || 0) - (volumeA || 0);
            }

            return Number(b.price || 0) - Number(a.price || 0);
        });

        return fullVariants[0] || null;
    }

    function lowestDecantPrice(variants) {
        var decants = availableVariants(variants).filter(isDecantVariant);

        if (!decants.length) return null;

        return decants.reduce(function (lowest, variant) {
            var price = Number(variant.price);
            return Number.isFinite(price) && price < lowest ? price : lowest;
        }, Infinity);
    }

    function formatMoney(cents) {
        return '$' + new Intl.NumberFormat('es-CO', {
            maximumFractionDigits: 0
        }).format(Math.round(cents / 100));
    }

    function labelForVariant(card, variantId) {
        return card.querySelector('.swatch-label[data-variant-id="' + variantId + '"]') ||
            card.querySelector('.usf-plugin-swatchs label[for="size-' + variantId + '"]');
    }

    function isLabelActive(label) {
        return label.classList.contains('is-active') || Boolean(closest(label, 'li.usf-selected'));
    }

    function selectedVariant(card, variants) {
        var active = card.querySelector('.swatch-label.is-active[data-variant-id], .usf-plugin-swatchs li.usf-selected label[for^="size-"]');
        var id = active && variantIdFromLabel(active);
        var i;

        for (i = 0; id && i < variants.length; i++) {
            if (String(variants[i].id) === id) return variants[i];
        }

        return null;
    }

    function renderPrimaryPrice(card, variant, variants) {
        var price = card.querySelector('.card-price');
        var size = price && price.querySelector('.card-primary-variant-size');
        var note = card.querySelector('.card-decant-note');
        var decantPrice = lowestDecantPrice(variants);
        var volume = variant && variantVolume(variant);

        if (!price || !variant) return;

        price.classList.add('card-price--primary-variant');

        if (!size) {
            size = document.createElement('span');
            size.className = 'card-primary-variant-size';
            price.insertBefore(size, price.firstChild);
        }
        size.textContent = volume !== null ? volume + ' ML' : variant.title;

        if (isDecantVariant(variant) || !Number.isFinite(decantPrice)) {
            if (note) note.remove();
            return;
        }

        if (!note) {
            note = document.createElement('p');
            note.className = 'card-decant-note';
            price.insertAdjacentElement('afterend', note);
        }
        note.textContent = 'o decant desde ' + formatMoney(decantPrice);
    }

    function prepareCard(card) {
        var product = productData(card);
        var variants = product && product.variants;
        var primary;
        var label;

        if (!variants || !variants.length) return;

        primary = primaryVariant(variants);
        if (!primary) return;

        label = labelForVariant(card, String(primary.id));
        if (!label) return;

        if (card.getAttribute('data-primary-variant-ready') !== String(primary.id)) {
            card.setAttribute('data-primary-variant-ready', String(primary.id));
            if (!isLabelActive(label)) label.click();
        }

        renderPrimaryPrice(card, selectedVariant(card, variants) || primary, variants);
        window.requestAnimationFrame(function () {
            renderPrimaryPrice(card, selectedVariant(card, variants) || primary, variants);
        });
    }

    function scanCards(root) {
        var cards = [];
        var parentCard;
        var i;

        if (root && root.matches && root.matches('.product-item[data-json-product]')) cards.push(root);
        parentCard = root && root.nodeType === 1 ? closest(root, '.product-item[data-json-product]') : null;
        if (parentCard && cards.indexOf(parentCard) === -1) cards.push(parentCard);
        if (root && root.querySelectorAll) {
            cards = cards.concat(Array.prototype.slice.call(root.querySelectorAll('.product-item[data-json-product]')));
        }

        for (i = 0; i < cards.length; i++) prepareCard(cards[i]);
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
        var card;
        var product;
        var variants;
        var variantId;
        var i;

        if (!label) return;

        scheduleApply(label);
        card = closest(label, '.product-item');
        product = card && productData(card);
        variants = product && product.variants;
        variantId = variantIdFromLabel(label);

        for (i = 0; variants && i < variants.length; i++) {
            if (String(variants[i].id) === variantId) {
                window.setTimeout(function (variant) {
                    return function () {
                        renderPrimaryPrice(card, variant, variants);
                    };
                }(variants[i]), 0);
                break;
            }
        }
    }, true);

    scanCards(document);

    if ('MutationObserver' in window) {
        new MutationObserver(function (mutations) {
            var i;
            var j;

            for (i = 0; i < mutations.length; i++) {
                if (mutations[i].type === 'attributes') scanCards(mutations[i].target);
                for (j = 0; j < mutations[i].addedNodes.length; j++) scanCards(mutations[i].addedNodes[j]);
            }
        }).observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-json-product']
        });
    }
}());
