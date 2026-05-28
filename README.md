# Ecommerce Event Proposal

Dự án tạo bộ slide HTML proposal cho sự kiện offline về Ecommerce.

---

## Cấu trúc project

```
ecommerce-event-proposal/
├── BRIEF.md          ← Điền vào đây TRƯỚC — thông tin sự kiện, đối tượng, chương trình
├── DESIGN.md         ← Design system: màu sắc, typography, layout rules
├── slide-outline.md  ← Cấu trúc 9 slides đề xuất, có thể chỉnh sửa
├── DECISIONS.md      ← Ghi lại các quyết định đã chốt
└── exports/
    └── proposal.html ← File output cuối cùng (tạo sau khi có content)
```

---

## Workflow

1. **Điền BRIEF.md** — thông tin sự kiện, đối tượng, chương trình, speakers
2. **Review slide-outline.md** — chỉnh cấu trúc slide nếu cần
3. **Build proposal.html** — dựa trên BRIEF.md + DESIGN.md + slide-outline.md
4. **Review + polish** — xem qua từng slide, ghi feedback
5. **Export** — file sẵn sàng để thuyết trình

---

## Design system

Dùng chung tokens với project Workshop Claude Content System:
- Font: **Playfair Display** (heading) + **Be Vietnam Pro** (body)
- Accent: **Coral `#E8693A`**
- Background: **Cream `#FAF9F5`** (light) / **`#1C1917`** (dark)
- Navigation: ← → keyboard, button click, F = fullscreen
