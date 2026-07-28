# Oil Engine System

**محتاج سيستم — سيستم لتغيير زيوت**

A polished, bilingual, HTML-only frontend demo for an Egyptian engine-oil shop serving cars, tuk-tuks, and motorcycles.

> نسخة تجريبية للعرض فقط — البيانات غير محفوظة  
> Preview demo only — data is not saved

## Business problem

Engine-oil shops need a simple way to register products, monitor stock, record invoices, calculate profit, sell bulk oil by decimal litre quantities, and review low-stock products. This project demonstrates how that future system could look and behave without requiring a server.

## Demo scope

This repository contains a visual and interactive frontend demo built only with HTML5, CSS3, vanilla JavaScript, local demo data, and SVG assets. It works by opening `index.html` or publishing the repository directly with GitHub Pages.

The demo includes:

- Public presentation and visual login pages
- Arabic (Egyptian) and English interfaces
- RTL/LTR layout switching without reloading
- Owner and employee role previews
- Dashboard metrics and visual charts
- Product search and filters with 15 realistic products
- Product form validation and margin preview
- Inventory, stock adjustment, and stock-movement screens
- Supplier purchases and dynamic purchase rows
- Sales invoices and detailed printable invoice view
- Precise decimal-litre invoice calculation
- Local invoice-image preview and mock OCR workflow
- Demo reports, browser-generated CSV export, and printing
- Low-stock reorder preview
- Settings and profile previews
- Responsive navigation from 320px upward

## Supported languages

- Arabic Egypt (`ar`) is the default and uses RTL layout, Arabic labels, `ج.م`, and `لتر`.
- English (`en`) uses LTR layout, English labels, `EGP`, and `L`.

The switcher updates visible interface text, document language, layout direction, sidebar position, currency labels, and links in the current browser session.

## Owner and employee preview

The visual login and main header let you switch between:

- **Owner:** may preview purchase cost, margin, profit, reports, purchases, and settings.
- **Employee:** cost, margin, profit, purchase screens, reports, and sensitive settings are hidden or replaced by an “Owner only” notice.

This is only a frontend role simulation. There is no authentication. Real permissions must be enforced by the production backend.

## Decimal-litre calculation

The new-invoice screen demonstrates the required scenario:

- Available: `100.000 L`
- Sold: `1.750 L`
- Selling price: `200.00 EGP/L`
- Cost: `140.00 EGP/L`
- Remaining: `98.250 L`
- Revenue: `350.00 EGP`
- Cost: `245.00 EGP`
- Profit: `105.00 EGP`

Money is converted to integer piastres and litre quantities are converted to integer millilitres before calculations. The UI converts the integer result back for display. Production inventory and financial calculations must use authoritative server-side `Decimal` logic and database transactions.

## Mock invoice-image workflow

The invoice-upload page accepts JPEG, PNG, or WebP files up to 8 MB. The selected image is read locally with `FileReader`, displayed in the browser, followed by a one-second mock processing state and editable sample results.

No image leaves the browser. There is no OCR service or server upload. A production version would connect to a secured invoice-reading service and require human review.

## Local usage

No installation, package manager, build command, or local server is needed.

1. Open the `can-oil-engine-demo` folder.
2. Double-click `index.html`.
3. Choose “View Live Demo” and select an owner or employee preview.

Refreshing a page resets temporary interactions by design.

## GitHub Pages deployment

1. Create a GitHub repository.
2. Upload or push every file in this folder to the repository root.
3. Open the repository **Settings**.
4. Open **Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the `main` branch.
7. Select the `/ (root)` folder.
8. Save.
9. Open the generated GitHub Pages URL.

All links and assets use relative URLs, so the site works under a repository path such as `https://username.github.io/can-oil-engine-demo/`.

## Folder structure

```text
can-oil-engine-demo/
├── index.html
├── login.html
├── dashboard.html
├── products.html
├── product-form.html
├── inventory.html
├── stock-movements.html
├── purchases.html
├── purchase-form.html
├── invoices.html
├── invoice-form.html
├── invoice-detail.html
├── invoice-upload.html
├── reports.html
├── low-stock.html
├── settings.html
├── profile.html
├── 404.html
└── assets/
    ├── css/
    ├── icons/
    ├── images/
    └── js/
```

## Screenshots

Add final hosted screenshots here when the client presentation URL is available:

- Landing page
- Owner dashboard
- Decimal-litre invoice
- Mobile Arabic navigation
- English reports

## Known limitations

- This is an HTML-only frontend demo.
- No backend or database exists.
- No information is permanently saved.
- There is no real authentication.
- There is no real OCR.
- Role restrictions are visual only.
- Filters and adjustments affect only the current page session.
- Demo values are static and are not business records.
- Opening local files can apply browser-specific restrictions to downloads; GitHub Pages avoids these.

## Production next steps

- Add secure backend authentication and session management.
- Enforce permissions and business rules on the backend.
- Store products, invoices, movements, purchases, users, and audit events in a database.
- Use server-side `Decimal` logic for inventory and money.
- Make invoice confirmation and cancellation atomic.
- Connect a secured OCR provider with file validation, malware scanning, and review queues.
- Add backups, observability, audit logs, invoice numbering rules, and automated tests.
- Complete accessibility, security, performance, and Egyptian tax/legal review before launch.

Business validation and permissions must never rely on this frontend alone.
