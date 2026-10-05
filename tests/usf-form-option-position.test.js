const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');

for (const view of ['grid', 'list']) {
    test(`USF ${view}: calcula opciones con el producto disponible en la vista Shopify`, () => {
        const source = fs.readFileSync(path.join(root, `templates/product.usf-${view}-form.liquid`), 'utf8');
        assert.match(source, /for option in product\.options_with_values/);
        assert.doesNotMatch(source, /product_card_product/);
        const loop = source.indexOf('for option in product.options_with_values');
        assert.match(source.slice(0, loop), /assign position = 0/,
            'Una posición ausente hace que el popup trate Size como la segunda opción');
    });
}

// Execute the actual theme's variant lookup, rather than reproducing its algorithm.
const theme = fs.readFileSync(path.join(root, 'assets/theme.js'), 'utf8');
const handler = theme.slice(theme.indexOf('changeSwatchQuickShop: function'));
const lookup = handler.slice(handler.indexOf('switch (optionIndex)'), handler.indexOf('if (selectedVariant == undefined)'));
function selectedId(optionIndex) {
    const context = {
        optionIndex, optionColor: undefined, selectedOption1: undefined,
        selectedOption2: undefined, selectedOption3: undefined, thisVal: '100 ML',
        variantList: [{ id: 11, option1: '5 ML (Decant)' }, { id: 22, option1: '100 ML' }]
    };
    vm.runInNewContext(lookup, context);
    return context.selectedVariant && context.selectedVariant.id;
}

test('el índice real de Size permite al tema elegir 100 ML en vez de conservar el decant', () => {
    assert.equal(selectedId(0), 22);
    assert.equal(selectedId(1), undefined, 'Reproduce el fallo de las cards publicadas');
});
