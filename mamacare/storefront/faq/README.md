# HTML FAQ view with Flutter controller

Build with `flutter build web --no-web-resources-cdn`, serve `build/web`, and
open `/storefront/faq/index.html`. Use `?lang=ar` for Arabic or `?lang=en` for
English. The root FAQ link and legacy `?p=viewFAQWebPage` route open this page.

The HTML UI matches Terms, including its logo, category navigation, responsive
layout, and language-preserving Home links. Categories contain numbered
questions and answers, matching the original Flutter reference. Content is
rendered as text; missing translations, empty results, and request failures
have explicit states with retry support.

`controller.js` starts a same-origin Flutter iframe with `storefrontBridge=faq`.
The Dart bridge in `lib/web/storefront/faq` uses
`faqCategoryController.readFAQCategoryMobile()` and obtains language IDs from
the public language API. Requests are serialized and superseded UI responses
are ignored. JavaScript contains no API credentials or direct HTTP operations.

Deploy the complete Flutter web build. Local file previews support navigation,
but API loading requires an HTTP server. Relative links support path prefixes;
Home links leave the embedded Flutter view. The native FAQ UI is unchanged.
