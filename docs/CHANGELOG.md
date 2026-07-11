# RenCar CHANGELOG

## [1.0.0] - 2026-07-10
### Added
- Multi-tenancy architecture with `stancl/tenancy`.
- Base models: Tenant, Domain, Car, Driver, Booking, CarBlock, Expense, Testimonial, SiteSetting.
- Service layer: `BookingService` for robust business logic.
- Admin controllers: Dashboard, Car, Driver, Booking, Expense, Testimonial, Setting, CarBlock.
- Public controllers: Home, Catalog, Booking, Testimonial.
- Routes: Full set of tenant routes (public & admin).
- Initial React pages: Home, Catalog, Booking, Dashboard, CarsIndex.
- Asset pipeline: Vite configuration with Tailwind CSS.
- Documentation: Full set of docs (PRD, Architecture, Database, UI/UX).

### Fixed
- Fixed permission issue in `database/migrations/tenant`.
- Fixed Vite build by creating `resources/js/bootstrap.js`.
- Fixed controller namespaces using `App\Http\Controllers\Controller`.

### Todo
- Finish remaining React pages (Detail, Drivers, Bookings, Expenses, etc.).
- Audit & clean Git (remove `node_modules`, `vendor`, `public/build`).
- E2E Booking flow integration.
