# HTML language view with Flutter controller

The HTML page renders the list and add/edit forms. The existing Flutter
`languageController` handles all data operations:

- `readAllLanguage()` loads the list.
- `createLanguage()` adds a language.
- `updateLanguage()` saves edits.

There are no API URLs, HTTP requests, or credential inputs in the HTML/JavaScript
view. API configuration remains in Flutter's `ModelController`.

## Build and open

From the project root:

```sh
flutter build web --no-web-resources-cdn
python3 -m http.server 8080 --directory build/web
```

Open `http://localhost:8080/dashboard/` and choose **Language**.
Deploy the complete `build/web` directory, including Flutter's generated runtime,
assets, and the dashboard files. Opening the source HTML directly with `file://`
does not run Flutter. The marketing page at `/` remains the static index page.

## Integration

`controller.js` loads an offscreen, same-origin `controller.html` iframe. The
iframe loads the normal Flutter web bootstrap. Its `dashboardBridge=language`
query selects the controller bridge in `lib/main.dart` before app UI or mobile
startup tasks run. Native app startup uses a no-op conditional import.

Messages are restricted to that iframe and the same origin. The Dart bridge
delegates list/save actions to `DashboardLanguageService`, which validates input
and calls the existing controller. Operations are serialized because the
controller holds mutable selected-record state. Record dates and serialization
are owned by Dart. Error responses return to the form without losing entered
values. No production data is changed by build or test commands.

The top-bar language selector changes only the HTML display language. The table
manages the languages in the backend through Flutter.
