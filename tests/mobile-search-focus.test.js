const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const theme = fs.readFileSync(path.join(__dirname, '..', 'assets/theme.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'assets/base.css'), 'utf8');
const usfStyles = fs.readFileSync(path.join(__dirname, '..', 'assets/usf.css'), 'utf8');

test('mobile search focuses during the same opening click', () => {
    const handlerStart = theme.indexOf("$('[data-search-mobile]').on('click'");
    const handlerEnd = theme.indexOf("$('[data-search-close-sidebar]", handlerStart);

    assert.notEqual(handlerStart, -1, 'mobile search click handler should exist');
    assert.notEqual(handlerEnd, -1, 'mobile search close handler should follow it');

    const handler = theme.slice(handlerStart, handlerEnd);
    const openPosition = handler.indexOf("addClass('open_search_mobile')");
    const focusPosition = handler.indexOf('.focus(');

    assert.notEqual(openPosition, -1, 'the click should open the mobile search');
    assert.match(handler, /#search-form-mobile input\[type="search"\]/);
    assert.ok(focusPosition > openPosition, 'the input should focus immediately after opening');
    assert.doesNotMatch(handler, /setTimeout|requestAnimationFrame|Promise|animationend/);
});

test('mobile search shows a visible active state when focused', () => {
    assert.match(styles, /#search-form-mobile \.search-modal__form:focus-within\s*\{/);
    assert.match(styles, /box-shadow:\s*inset 0 0 0 2px/);
});

test('collection search shows the same visible active state', () => {
    assert.match(usfStyles, /body\.usf-collections-page \.usf-sr-inputbox input:not\(\[type=submit\]\):focus\s*\{/);
    assert.match(usfStyles, /box-shadow:\s*inset 0 0 0 1px/);
});
