# Wishlist Sharing Design

## Intent

Make the browser-based wishlist easy to share through WhatsApp or the clipboard while preserving the existing email action. Sharing must include each product's name, displayed price, and product URL because the wishlist itself is stored only in `localStorage` and the wishlist page URL cannot reconstruct another visitor's list.

## Goals

- Present Email, WhatsApp, and Copy list actions together in the wishlist footer.
- Generate one canonical Spanish text payload from the currently rendered wishlist products.
- Open WhatsApp with that payload prefilled.
- Copy that payload to the clipboard and show an inline, accessible confirmation.
- Refresh every share action when wishlist products are added or removed.

## Non-goals

- Do not create server-side wishlists or shareable wishlist accounts.
- Do not encode products into the wishlist page URL.
- Do not change how products are stored in `localStorage`.
- Do not add an external library or native alert.

## Constraints

- Preserve the existing email behavior and visual language.
- Keep product URLs absolute and prices as displayed by the theme.
- Provide a clipboard fallback for browsers without `navigator.clipboard`.
- Keep the controls usable on desktop and mobile.

## Approaches

1. **Share a formatted product list (selected).** Reuse the product data already rendered for email, and send the same payload to email, WhatsApp, and clipboard. This is reliable, lightweight, and does not imply that the wishlist URL contains the products.
2. **Encode the wishlist into a URL.** This would let a recipient reconstruct the wishlist page, but adds URL-length, import, validation, and recipient-state concerns that are outside this request.

## Design

The wishlist section exposes three controls in a grouped footer. `WishlistView` builds a single plain-text payload with the heading “Mi lista de deseos” followed by each product's title, price, and absolute URL. The email `mailto:` body and WhatsApp `wa.me` text derive from this payload. The copy button writes the payload to the clipboard and reports “Lista copiada” through a polite live region; failures report that the list could not be copied without interrupting the visitor with an alert.

