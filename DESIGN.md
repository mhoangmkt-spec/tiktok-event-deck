# Design System — TikTok Commerce Event Deck
> Diễn giả: Thành Vũ | Tổng: 22 slides
> Đây là nguồn sự thật về CSS tokens, màu sắc, typography, layout patterns khi build slide HTML.

---

## Màu sắc

### Tokens

| Token | Hex | Vai trò |
|---|---|---|
| `--cream` | `#FAF9F5` | Background mặc định — content slides |
| `--cream-dark` | `#F0EBE3` | Background thứ cấp, panel nhẹ |
| `--white` | `#FFFFFF` | Overview slides, transition slides |
| `--black` | `#1C1917` | Text chính, dark slide background |
| `--gray` | `#6B6560` | Body text phụ, sub text |
| `--gray-dim` | `#9E9590` | Text mờ, decorative numbers, placeholder |
| `--coral` | `#E8693A` | Accent chính — nhấn nội dung |
| `--coral-light` | `#FEF0E9` | Panel background tích cực |
| `--coral-mid` | `#F5A882` | Coral nhạt trên dark background |
| `--olive` | `#4E5E44` | Accent chapter transition |
| `--olive-light` | `#ECF0E9` | Olive nhạt (dự phòng) |
| `--border` | `#E5DDD5` | Đường viền, separator |

---

### Quy tắc dùng màu

**Coral `#E8693A` — dùng khi:**
- Eyebrow label
- Em text trong heading cần nhấn mạnh
- Card/block được highlight (`.hi` class)
- CTA, pivot statement quan trọng
- Progress bar, border accent trên card active

**Coral KHÔNG dùng cho:**
- Số thứ tự mờ trên card thông thường → dùng `--gray-dim`
- Tất cả bullets vô điều kiện

---

## Background Slides

| Background | Dùng cho |
|---|---|
| `var(--cream)` | Content slides thông thường |
| `var(--white)` | Transition / nhịp thở |
| `#1C1917` + radial coral | Dark content slides — S01, S04 |
| `#1C1917` + radial coral mạnh | Final CTA — S09 |

**Nguyên tắc:**
- Không để quá 4 cream slides liền tiếp → xen dark để tạo nhịp
- Dark slides làm chapter break tự nhiên

---

## Typography

| Role | Font | Weight | Ghi chú |
|---|---|---|---|
| Heading chính | Playfair Display (`--serif`) | 700 | `clamp(20px, 3.8vw, 46px)` |
| Em trong heading | Playfair Display | 700 italic | `color: var(--coral)` |
| Eyebrow | Be Vietnam Pro (`--sans`) | 700 | Uppercase, letter-spacing 2.5px, coral |
| Body / sub | Be Vietnam Pro | 300–400 | `color: var(--gray)` |
| Slide number badge | Be Vietnam Pro | 500 | Letter-spacing 1px, rất mờ |

**Font size — dùng clamp, không hardcode px:**
```css
clamp(20px, 3.8vw, 46px)   /* Heading lớn */
clamp(18px, 3.5vw, 42px)   /* Heading vừa */
clamp(10px, 1.3vw, 15px)   /* Sub text */
clamp(9px, 1.05vw, 12px)   /* Body nhỏ */
clamp(8px, 1vw, 12px)      /* Eyebrow */
```

---

## Hệ thống Fixed Canvas (BẮT BUỘC áp dụng)

### Vấn đề với vw/clamp
`vw` tính theo viewport của browser, không theo chiều rộng slide container. Khi browser window thay đổi kích thước, font size tính khác đi — gây ra wrapping bất ngờ và slide trông khác nhau trên các máy khác nhau.

### Giải pháp: Fixed 1920×1080 + CSS scale
Mọi slide đều render ở kích thước cố định 1920×1080px, sau đó được scale xuống bằng JS để fit container. Tất cả font size dùng **px tuyệt đối**, không dùng `vw`, `clamp`, hay `%` cho font.

```html
<!-- HTML structure -->
<div class="slide-wrapper">   <!-- responsive, height set by JS -->
  <div class="slide">         <!-- cố định 1920×1080, scale by JS -->
    ...
  </div>
</div>
```

```css
.slide-wrapper {
  width: 100%;
  max-width: 1080px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.slide {
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 0; left: 0;
  transform-origin: top left;
  /* transform: scale() set by JS */
}
```

```js
function scaleSlides() {
  document.querySelectorAll('.slide-wrapper').forEach(function(wrapper) {
    var scale = wrapper.offsetWidth / 1920;
    wrapper.style.height = Math.round(1080 * scale) + 'px';
    wrapper.querySelector('.slide').style.transform = 'scale(' + scale + ')';
  });
}
window.addEventListener('load', scaleSlides);
window.addEventListener('resize', scaleSlides);
```

### Font size chuẩn ở 1920×1080
| Role | px |
|---|---|
| Cover headline lớn | 60px |
| Section headline | 52px |
| Slide headline | 44–50px |
| Card title | 24–28px |
| Body text | 18–22px |
| Eyebrow | 16px |
| Badge / caption | 12–14px |

### Quy tắc line break trong headline
- Kiểm soát dòng bằng `<br>` **chủ động** — không để CSS tự wrap
- Không dùng `max-width` trên headline để giới hạn wrap
- Break tại điểm ngắt ý nghĩa: dấu `—`, dấu phẩy, ranh giới cụm từ
- **Không bao giờ** tách giữa cụm danh từ hay động từ
- Headline tối đa 2 dòng, chấp nhận 3 nếu câu rất dài

---

## Layout Patterns

### Pattern A — Dark Full Centered
```
[Full centered — padding 10% 14%]
```
- Dùng cho: Cover, Closing, Chapter break, Final CTA
- Heading lớn, sub text nhỏ hơn
- Background: `#1C1917` + radial-gradient coral

### Pattern B — Light Left Aligned
```
[Full width — flex column, justify-content: center, padding 9% 12%]
```
- Dùng cho: Hook slides, transition slides, thông điệp đơn

### Pattern C — Light Cards Row
```
[Heading row] [N cards — fixed height, watermark number bottom-right]
```
- Dùng cho: Gap overview, checklist, roadmap nhiều bước
- Card container: `height: clamp(220px, 38%, 290px)` — KHÔNG dùng `flex: 1`
- Slide wrapper: `justify-content: center` + `padding: clamp(28px, 5.5%, 52px)`
- Card số: `data-wm="01"` → `::after` pseudo, serif italic, opacity 0.048

### Pattern D — Dark Cards Row
```
[Heading + sub] [Cards — fixed height]
```
- Dùng cho: Gap dẫn nhập trên dark background
- Card container: `height: clamp(240px, 44%, 310px)`

### Pattern E — Split Layout (Illustration)
```
[Trái 55% — content] [Phải 45% — solid color placeholder]
```
- Dùng cho: Các slide có xu hướng cần ảnh minh hoạ hoặc visual lớn
- **Trái:** flex column, justify-content center, padding 8% — dùng radial-gradient ánh sáng nhẹ từ góc trên trái (white/cream 12% opacity) tạo chiều sâu
- **Phải:** solid color, không có content — sẵn sàng nhận ảnh/illustration
  - Light slide → phải dùng `--cream-dark`
  - Dark slide → phải dùng `#252220` (đen nhẹ hơn black)
- Đường chia trái/phải: không dùng border cứng — để màu tự tạo ranh giới

---

## Icons

### Style
- **Thin line only** — stroke-based, không dùng filled hoặc chunky icon
- Stroke weight: **1.5px** đồng nhất toàn deck
- Không mix outline với filled trong cùng một slide

### Size — 3 cấp duy nhất
| Cấp | Size | Dùng cho |
|---|---|---|
| Small | 24px | Icon inline trong body text, label nhỏ |
| Medium | 32px | Icon trong card, bên cạnh bullet |
| Large | 48px | Icon hero của slide, standalone |

### Màu icon
- Default: `--gray` (`#6B6560`)
- Accent / highlighted: `--coral` (`#E8693A`)
- Trên dark background: `--coral-mid` (`#F5A882`) hoặc white
- **Không dùng:** multicolor, gradient, drop shadow trên icon

### Thư viện gợi ý
- **Lucide** hoặc **Phosphor** (thin weight) — cả 2 đều clean và premium
- Dùng 1 thư viện duy nhất cho toàn deck, không mix

---

## Cards

### Sizing
- **Width:** auto theo content — không kéo full width slide
- **Max-width:** `clamp(260px, 28vw, 340px)` cho card đơn / tự điều chỉnh theo số lượng card
- **Height:** `fit-content` ưu tiên — chỉ dùng fixed height khi cần visual balance giữa các card
- **Min-height:** `clamp(140px, 24%, 200px)` nếu cần đồng đều chiều cao

### Spacing
- Padding trong card: `clamp(20px, 3%, 32px)` đồng nhất 4 phía
- Gap giữa các card: `clamp(12px, 2%, 20px)`
- Wrapper: `justify-content: center` — card luôn căn giữa trang, không dạt sang 1 bên

### Quy tắc
- Không để card quá cao (tràn quá 50% chiều cao slide)
- Không để card quá rộng (chiếm quá 35% chiều rộng slide mỗi card)
- Số lượng card tối đa trên 1 slide: **5 card** — quá 5 thì tách slide

---

## Typography

| Role | Font | Weight | Ghi chú |
|---|---|---|---|
| Heading chính | Playfair Display (`--serif`) | 700 | `clamp(20px, 3.8vw, 46px)` |
| Em trong heading | Playfair Display | 700 italic | `color: var(--coral)` |
| Eyebrow | Be Vietnam Pro (`--sans`) | 700 | Uppercase, letter-spacing 2.5px, coral |
| Body / sub | Be Vietnam Pro | 300–400 | `color: var(--gray)` |
| Slide number badge | Be Vietnam Pro | 500 | Letter-spacing 1px, rất mờ |

**Font size — dùng clamp, không hardcode px:**
```css
clamp(20px, 3.8vw, 46px)   /* Heading lớn */
clamp(18px, 3.5vw, 42px)   /* Heading vừa */
clamp(10px, 1.3vw, 15px)   /* Sub text */
clamp(9px, 1.05vw, 12px)   /* Body nhỏ */
clamp(8px, 1vw, 12px)      /* Eyebrow */
```

**Line-height:**
```css
1.15   /* Heading — tight, impactful */
1.5    /* Body text — dễ đọc */
1.0    /* Eyebrow, badge — compact */
```

**Spacing base unit: 8px**
```css
4px   /* xs — gap nhỏ giữa icon và label */
8px   /* sm — gap giữa eyebrow và heading */
16px  /* md — gap giữa heading và body */
24px  /* lg — gap giữa các section trong slide */
40px  /* xl — padding ngoài, khoảng thở lớn */
```

---

## Slide Number Badge

```html
<span class="sn">S04 · 22</span>          <!-- dark slides -->
<span class="sn sn-dark">S01 · 22</span>  <!-- light slides -->
```

Format: `S[số 2 chữ số] · 22` (tổng 22 slides)

---

## Bug Patterns Cần Tránh

### 1. Flex child không fill height
```css
/* Fix: thêm height: 100% vào container + min-height: 0 vào flex child */
.slide-container { height: 100%; display: flex; flex-direction: column; }
.card-row { flex: 1; min-height: 0; }
```

### 2. % padding tính theo WIDTH
```css
/* Sai */ padding: 7% 8%;
/* Đúng */ padding: clamp(24px, 5%, 44px) 8%;
```

### 3. `flex: 1` trên card container
```css
/* Sai */  .cards { flex: 1; }
/* Đúng */ .cards { height: clamp(220px, 38%, 290px); }
```

---

## Checklist Khi Build Slide

- [ ] Background đúng tier (cream / white / dark coral)?
- [ ] Eyebrow đúng format: `PHẦN · TÊN`?
- [ ] Slide badge: `S[XX] · 22`?
- [ ] Dark slide: có class `dark-fx`? Không set `position` ngoài `.slide`?
- [ ] Card row: dùng `height: clamp(...)`, không `flex: 1`?
- [ ] Card row: `justify-content: center` trên wrapper?
- [ ] Vertical padding: dùng `clamp(px,...)` không dùng `%` đơn thuần?
- [ ] Icon: đúng style thin line? Đúng size cấp (24/32/48px)? Đúng màu?
- [ ] Card: không quá cao, không quá rộng, căn giữa trang?
- [ ] Split layout: trái có gradient nhẹ? Phải solid color đúng tier?
- [ ] Line-height đúng (1.15 heading / 1.5 body)?
