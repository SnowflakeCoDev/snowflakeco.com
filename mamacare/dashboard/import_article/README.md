# Article JSON import with Flutter controller

Open `/dashboard/import_article/` from the dashboard navigation. This HTML view
uses the shared `../dashboard.css`, with `import_article.css` and
`import_article.js` following the language page's layout and file pattern.

Drag and drop one `.json` file, choose a file, or write/paste JSON in the text
field. Files populate the same editable field and are checked automatically.
**Check JSON** checks pasted content and shows an overview; **Format JSON**
indents valid JSON; **Clear** resets the page. The file and text limit is 5 MB.

The page checks JSON syntax and requires a non-empty `content_information`
object. **Import article** sends the checked JSON to Flutter, which posts it to
`ImportArticleDashboardView` at `/import_article_dashboard/`. The backend
validates the full structure and creates or updates the article. The page shows
**Article added successfully** or **Article updated successfully**, along with
the returned article ID, based on the API's `isCreated` value. Backend errors
are displayed without clearing the JSON. Import controls are disabled during
the request to prevent duplicate submissions.

## Integration

Like the language dashboard, `controller.js` loads an offscreen, same-origin
`controller.html` iframe. Its `dashboardBridge=import_article` query selects the
article bridge in `lib/main.dart` before normal app startup. Messages are
restricted to that iframe, its parent, and the same origin. Native startup uses
the conditional stub.

`DashboardImportArticleService` validates and serializes bridge operations.
The article list and detail pages at `/dashboard/article/` reuse this bridge's
`list` and `detail` actions through `contentInformationController` dashboard
methods. The controller iframe URL is resolved relative to `controller.js` so
the same transport works from both page folders.
`importArticleController.importArticleDashboard` sends the original JSON with
`ModelController.postGenericAPI`, which owns the API base URL, dashboard token,
and headers. The `ImportArticle` model decodes the response. HTML/JavaScript has
no API URL, credential inputs, or HTTP implementation. Unconfirmed requests are
not automatically retried. English/Arabic preferences and mobile navigation
follow the language page.

## Build and open

From the project root:

```sh
flutter build web --no-web-resources-cdn
python3 -m http.server 8080 --directory build/web
```

Open `http://localhost:8080/dashboard/import_article/` or choose **Import article**
from the dashboard. Deploy the complete `build/web` directory, including
Flutter's generated runtime and assets. Serving the source `web` directory or
opening the page with `file://` does not run the import controller.
