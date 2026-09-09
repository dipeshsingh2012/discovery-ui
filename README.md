# Discovery & Collection UI Fragment (`discovery-ui`)

> **Micro-Frontend (MFE) Product Discovery & Collection Fragment powered by `product-catalog-service`**

`discovery-ui` is an embeddable frontend fragment delivering category browsing and space-constrained product discovery.

---

## 🎯 Features

1. **Category Filtering:** Filter collections by appliance type (Espresso Machines, Blenders, Stand Mixers, Air Fryers).
2. **Space-Fitment Filter (Cabinet Clearance):** Live slider (30–65 cm) and presets (Standard 45 cm, Spacious 52 cm) to show only products guaranteed to fit under overhead cabinets.
3. **Dimensional Badging:** Displays ground-truth $W \times H \times D$ dimensions, required ventilation clearance, and real-time fitment status (`✓ Fits Your Space` vs `⚠️ Exceeds Clearance`).
4. **Keyword Search:** Instant live filter by product title or brand.

---

## 🚀 Development

```bash
npm install
npm run dev     # Runs dev server on port 5177
npm run build   # Compiles standalone MFE bundle
```
