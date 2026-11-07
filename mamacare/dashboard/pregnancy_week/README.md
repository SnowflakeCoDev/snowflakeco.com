# Pregnancy week dashboard

Read-only list and detail views using the same HTML/Flutter bridge pattern as
`web/dashboard/language`. All API requests use `pregnancyWeekController`:

- `readPregnancyWeekDashboard()` loads the list.
- `readPregnancyWeekByIdDashboard(id)` loads the selected week.

The detail view includes fetal development, baby size, symptoms, nutrition,
checklist items, monthly tips, and record dates. The English/Arabic selector
updates the interface and requests content using the corresponding enabled
backend language. Missing translations display an empty information state.

Build and serve the complete Flutter web output:

```sh
flutter build web --no-web-resources-cdn
python3 -m http.server 8080 --directory build/web
```

Open `/dashboard/pregnancy_week/` or choose **Pregnancy weeks** in the dashboard
navigation. Clicking a week opens `index.html?id=<record-id>`, which also supports
direct links and browser refresh. **Back to weeks** returns to the list.

The same-origin iframe selects the bridge with `dashboardBridge=pregnancy_week`.
The service serializes controller operations and explicitly includes nested
read-only fields omitted by the models' write serialization. No API credentials
or HTTP requests are handled by JavaScript. Native startup uses a no-op bridge.
