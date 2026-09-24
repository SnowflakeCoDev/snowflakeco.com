# HTML Terms view with Flutter controller

Build from the project root with `flutter build web --no-web-resources-cdn`,
serve the complete `build/web` directory, and open `/storefront/terms/`.
Use `?lang=ar` for Arabic or `?lang=en` for English. Relative URLs also support
deployment beneath a path prefix.

The visible UI is HTML/CSS. `controller.js` starts a same-origin, offscreen
Flutter iframe, using `storefrontBridge=terms` to select controller-only startup
in `lib/main.dart`. Dart code lives in `lib/web/storefront/terms` and calls
`informationTypeController.readInformationTypeMobile('terms')`. Language IDs
come from the public language controller API. No API credentials or HTTP data
operations are implemented in JavaScript.

The view renders the first information record, its sections, and their content,
as the original Flutter reference did. Read-only translations are explicitly
serialized because the generated model serializers omit them. Responses are
rendered as text. Empty content, unavailable languages, connection failures,
and startup timeouts have retry states. Requests are serialized in Dart and
outdated responses are ignored in the view when switching languages.

The root site's Terms link and legacy `?p=viewTermsWebPage` URL lead here.
The existing Flutter storefront route embeds this HTML view. Native mobile
information pages continue to use their existing UI.

Home and Terms links use explicit `index.html` paths, preserve the selected
language, and work beneath a deployment prefix. Home links leave the embedded
Flutter view by targeting the top-level window. Direct file previews support
navigation; loading API content still requires serving the Flutter web build.
