# Wishlist Sharing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add WhatsApp and clipboard sharing to the existing wishlist using the same product list currently shared by email.

**Architecture:** Extract share-payload construction and clipboard behavior into a small browser module that can be exercised independently. The wishlist section renders accessible actions and supplies its current rendered products to that module whenever the list changes.

**Tech Stack:** Shopify Liquid, browser JavaScript, Node built-in test runner, CSS.

**Spec:** `docs/superpowers/specs/2026-11-12-wishlist-sharing-design.md`

## Global Constraints

- Preserve email sharing and `localStorage` wishlist storage.
- Share product title, displayed price, and absolute product URL.
- Add no external dependency and use no native alert.
- Include an accessible inline result for copy success or failure.

## Review Focus

- Empty or partially rendered products must not create `undefined` text.
- Product titles and URLs containing accents or reserved characters must be encoded correctly for WhatsApp and email.
- Clipboard-unavailable browsers must use the fallback path.
- Removing an item must immediately refresh all three share actions.
- Mobile controls must wrap without horizontal overflow.

---

### Task 1: Wishlist share payload and actions

**Files:**
- Create: `assets/wishlist-sharing.js`
- Create: `tests/wishlist-sharing.test.js`
- Modify: `sections/main-wishlist-page.liquid`
- Modify: `assets/component-wishlist.css`

**Interfaces:**
- Produces: `window.WishlistSharing.buildPayload(items, origin)`, `buildEmailUrl(payload)`, `buildWhatsAppUrl(payload)`, and `copyText(text, environment)`.
- Consumes: rendered product cards exposing title, price, and product URL through the existing card data attributes.

- [ ] **Step 1: Write failing behavior tests**

Test that the module builds the literal Spanish payload without `undefined`, produces correctly encoded email and WhatsApp URLs, copies through the Clipboard API, and falls back when it is unavailable.

- [ ] **Step 2: Verify RED**

Run: `node --test tests/wishlist-sharing.test.js`

Expected: FAIL because `assets/wishlist-sharing.js` does not exist.

- [ ] **Step 3: Implement the minimal sharing module**

Create the four interfaces above with no DOM dependency in payload and URL construction; make `copyText` return a promise resolving to the method used.

- [ ] **Step 4: Verify GREEN**

Run: `node --test tests/wishlist-sharing.test.js`

Expected: all wishlist-sharing tests PASS.

- [ ] **Step 5: Integrate accessible controls**

Render Email, WhatsApp, and Copy list actions in the wishlist footer; load the module only on this section; update all actions from `updateShareWishlistViaMail`; show copy status in a polite live region; style the group responsively.

- [ ] **Step 6: Verify the integration and full suite**

Run: `node --test tests/wishlist-sharing.test.js tests/home-performance-guards.test.js`

Then run: `node --test tests/*.test.js`

Expected: new tests PASS; report any unchanged pre-existing failure by name.

- [ ] **Step 7: Commit**

Commit only the wishlist implementation, tests, specification, and plan.
