const test = require('node:test');
const assert = require('node:assert/strict');

const WishlistSharing = require('../assets/wishlist-sharing.js');

test('builds one clean Spanish payload from wishlist products', () => {
  const payload = WishlistSharing.buildPayload([
    {
      title: 'Lattafa Yara',
      price: '$120.000',
      url: '/products/lattafa-yara'
    },
    {
      title: 'Ámbar Oud',
      price: '',
      url: 'https://disfragancias.com/products/ambar-oud'
    },
    {
      title: '',
      price: '$1',
      url: '/products/incompleto'
    }
  ], 'https://disfragancias.com');

  assert.equal(
    payload,
    'Mi lista de deseos\n\n' +
      'Lattafa Yara\nPrecio: $120.000\nhttps://disfragancias.com/products/lattafa-yara\n\n' +
      'Ámbar Oud\nhttps://disfragancias.com/products/ambar-oud'
  );
  assert.doesNotMatch(payload, /undefined|null/);
});

test('encodes the same payload for email and WhatsApp', () => {
  const payload = 'Mi lista de deseos\n\nÁmbar & Oud\nPrecio: $120.000';

  assert.equal(
    WishlistSharing.buildEmailUrl(payload),
    'mailto:?subject=Mi%20lista%20de%20deseos&body=Mi%20lista%20de%20deseos%0A%0A%C3%81mbar%20%26%20Oud%0APrecio%3A%20%24120.000'
  );
  assert.equal(
    WishlistSharing.buildWhatsAppUrl(payload),
    'https://wa.me/?text=Mi%20lista%20de%20deseos%0A%0A%C3%81mbar%20%26%20Oud%0APrecio%3A%20%24120.000'
  );
});

test('copies with the Clipboard API when available', async () => {
  let copied = '';
  const environment = {
    navigator: {
      clipboard: {
        writeText: async (text) => { copied = text; }
      }
    }
  };

  const method = await WishlistSharing.copyText('Lista para compartir', environment);

  assert.equal(copied, 'Lista para compartir');
  assert.equal(method, 'clipboard');
});

test('falls back to a temporary textarea when Clipboard API is unavailable', async () => {
  let selected = false;
  let copied = false;
  let removed = false;
  const textarea = {
    value: '',
    style: {},
    setAttribute() {},
    select() { selected = true; }
  };
  const environment = {
    navigator: {},
    document: {
      body: {
        appendChild(node) { assert.equal(node, textarea); },
        removeChild(node) { assert.equal(node, textarea); removed = true; }
      },
      createElement(tag) { assert.equal(tag, 'textarea'); return textarea; },
      execCommand(command) { assert.equal(command, 'copy'); copied = true; return true; }
    }
  };

  const method = await WishlistSharing.copyText('Lista alternativa', environment);

  assert.equal(textarea.value, 'Lista alternativa');
  assert.equal(selected, true);
  assert.equal(copied, true);
  assert.equal(removed, true);
  assert.equal(method, 'fallback');
});

test('falls back when the Clipboard API exists but rejects the write', async () => {
  let copied = false;
  const textarea = {
    value: '',
    style: {},
    setAttribute() {},
    select() {}
  };
  const environment = {
    navigator: {
      clipboard: {
        writeText: async () => { throw new Error('Permission denied'); }
      }
    },
    document: {
      body: {
        appendChild() {},
        removeChild() {}
      },
      createElement() { return textarea; },
      execCommand() { copied = true; return true; }
    }
  };

  const method = await WishlistSharing.copyText('Lista protegida', environment);

  assert.equal(copied, true);
  assert.equal(textarea.value, 'Lista protegida');
  assert.equal(method, 'fallback');
});
