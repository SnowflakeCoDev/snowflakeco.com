# Article dashboard

`index.html` lists articles with server pagination, a search within the current
page, and links to `detail.html?id=<article ID>&page=<list page>`. The detail page
shows article metadata and related content. Both pages support English/Arabic
and the existing dashboard navigation and responsive styles.

Both pages load `../import_article/controller.js` and reuse the existing
`lib/web/dashboard/import_article` bridge and same-origin controller iframe.
The bridge dispatches read actions to
`contentInformationController.readContentInformationDashboard` and
`contentInformationController.readContentInformationByIdDashboard`. Importing
continues to use the same bridge's import action. HTML has no HTTP code, API
configuration, or credential inputs.

The shared service selects the configured language and serializes controller
operations. The list includes the controller's count, page, and page total.
The detail forwards the controller's loaded response so translated fields and
nested content, omitted by model `toJson`, are retained. Dashboard detail GET
uses the backend's existing `ContentInformationSerializerDetail`; update
requests keep the basic serializer.

From the Flutter project root:

```sh
flutter build web --no-web-resources-cdn
python3 -m http.server 8080 --directory build/web
```

Open `http://localhost:8080/dashboard/article/`. Deploy the complete `build/web`
directory. Serving only source HTML does not run the Flutter controller.
