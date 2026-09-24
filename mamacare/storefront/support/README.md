# HTML Support page

Open `/storefront/support/index.html` in the deployed Flutter web build.
The root Support link and legacy `?p=viewSupportWebPage` route open this page.
Use `?lang=ar` for Arabic or `?lang=en` for English.

The implementation follows the original `lib/web/store_front/pages/support`
reference: two help messages, contact email, response time, and availability.
English and Arabic text comes from the existing Flutter ARB translations.
The email opens the visitor's email app; the page itself sends no messages.

The logo, HTML layout, responsive styles, and language-preserving Home links
match Terms. Dart code in `lib/web/storefront/support` embeds the HTML page for
the existing Flutter storefront route. Support content is static, as in the
reference, so no API service or offscreen controller iframe is needed. Default
English content and the email link work even without JavaScript.

Build with `flutter build web --no-web-resources-cdn` and deploy `build/web`.
Relative links also support deployment beneath a path prefix and file previews.
