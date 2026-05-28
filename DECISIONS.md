# Decisions Log

> Ghi lại tất cả quyết định đã chốt trong quá trình làm dự án.  
> Mỗi decision ghi rõ: Quyết định gì — Lý do — Ngày chốt.

---

## Template

```
### [Tên quyết định]
- **Quyết định:** 
- **Lý do:** 
- **Ngày chốt:** 
```

---

## Decisions

### Quy trình export slide HTML → PNG
- **Quyết định:** Dùng Puppeteer (Node.js) để render HTML và chụp từng `.slide` element ra PNG riêng biệt
- **Lý do:** Giữ được font Google Fonts, CSS chính xác, output 2x Retina (3840×2160) — tốt hơn wkhtmltoimage (engine cũ) và Claude in Chrome (khó control resolution)
- **Script:** `export-slides.js` — chạy `node export-slides.js` trong thư mục project
- **Output:** `exports/slide-01.png`, `slide-02.png`... 
- **Lưu ý:** `page.waitForTimeout` đã bị bỏ trong Puppeteer mới — dùng `const wait = (ms) => new Promise(r => setTimeout(r, ms))` thay thế
- **Ngày chốt:** 2026-05-28

### Định dạng slide
- **Quyết định:** Build slide bằng HTML/CSS thuần, export ra PNG bằng Puppeteer
- **Lý do:** Kiểm soát design tuyệt đối theo DESIGN.md, không phụ thuộc PowerPoint hay Canva
- **Ngày chốt:** 2026-05-28
