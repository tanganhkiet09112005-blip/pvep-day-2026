# PVEP Day 2026 — Landing Page

Landing page chính thức cho sự kiện **PVEP Day 2026 — Ngày hội gia đình PVEP khu vực phía Nam**, tổ chức ngày **23.5.2026** tại **Khu du lịch Tân Cảng**, TP. Hồ Chí Minh.

---

## 1. Tổng quan dự án

### Mục đích

Website one-page dùng để:

- Chia sẻ thông tin sự kiện cho nhân viên và khách mời
- Hiển thị 6 slide thiết kế chính thức (KV, chương trình, hoạt động, team building, layout, menu)
- Tối ưu trải nghiệm trên **điện thoại** trong ngày diễn ra sự kiện (xem rõ slide, điều hướng nhanh, phóng to ảnh)

### Công nghệ sử dụng

| Công nghệ | Vai trò |
|-----------|---------|
| **Next.js App Router** | Framework, routing, SEO metadata |
| **TypeScript** | Kiểu dữ liệu an toàn |
| **Tailwind CSS** | Giao diện responsive |
| **Framer Motion** | Animation nhẹ (fade, loading) |
| **next/image** | Tối ưu hình ảnh, lazy load |

### Cấu trúc nội dung chính

| Section | Slide | Mô tả |
|---------|-------|--------|
| **Hero / KV** | `website-01.jpg` | Hình ảnh chính sự kiện |
| **Program** | `website-02.jpg` | Chương trình chi tiết |
| **Activities** | `website-03.jpg` | Hoạt động ngoài trời |
| **Team Building** | `website-04.jpg` | Trò chơi team building |
| **Layout** | `website-05.jpg` | Mặt bằng sự kiện |
| **Menu** | `website-06.jpg` | Menu tiệc tối |

---

## 2. Cấu trúc thư mục

```
web_su_kien_PVEF/
├── app/
│   ├── page.tsx          # Trang chủ — ghép landing + SEO content
│   ├── layout.tsx        # Metadata SEO, Open Graph, Twitter, JSON-LD
│   └── globals.css       # Theme màu, slide frame, sr-only
├── components/
│   ├── EventLandingPage.tsx   # Trang chính (client)
│   ├── SlideSection.tsx       # Mỗi slide + zoom
│   ├── FloatingNav.tsx        # Điều hướng desktop + mobile
│   ├── ScrollProgress.tsx     # Thanh tiến trình cuộn
│   ├── BackToTop.tsx          # Nút lên đầu trang
│   ├── ImageModal.tsx         # Modal phóng to ảnh
│   ├── LoadingScreen.tsx      # Màn hình loading
│   ├── PremiumBackground.tsx  # Nền gradient
│   ├── EventSeoContent.tsx    # Nội dung SEO sr-only
│   └── EventJsonLd.tsx        # Schema.org Event (JSON-LD)
├── data/
│   ├── sections.ts       # Danh sách section, nav, alt text
│   └── seo.ts            # Title, description, keywords, JSON-LD
└── public/
    └── images/
        ├── website-01.jpg   # Hero / KV
        ├── website-02.jpg   # Program
        ├── website-03.jpg   # Activities
        ├── website-04.jpg   # Team Building
        ├── website-05.jpg   # Layout
        └── website-06.jpg   # Menu
```

---

## 3. Chuẩn bị hình ảnh

### Tên file bắt buộc

Đặt **đúng 6 file** trong `public/images/` (chữ thường):

- `website-01.jpg`
- `website-02.jpg`
- `website-03.jpg`
- `website-04.jpg`
- `website-05.jpg`
- `website-06.jpg`

### Thay ảnh sau này

1. Xuất slide mới cùng tỷ lệ (không crop trong file thiết kế).
2. Ghi đè file tương ứng trong `public/images/` (giữ nguyên tên).
3. Nếu kích thước pixel thay đổi, cập nhật `width` / `height` trong `data/sections.ts`.
4. Chạy lại `npm run build` để kiểm tra.

**Lưu ý:** Không đổi tên file nếu chưa sửa `data/sections.ts` và metadata trong `data/seo.ts`.

---

## 4. Cài đặt project

```bash
npm install
```

---

## 5. Chạy project local

```bash
npm run dev
```

Mở trình duyệt: **http://localhost:3000**

---

## 6. Preview trên điện thoại cùng Wi-Fi

1. Chạy dev server lắng nghe mọi interface:

```bash
npm run dev -- -H 0.0.0.0
```

2. Trên Windows, xem IPv4 máy tính:

```bash
ipconfig
```

(Tìm dòng **IPv4 Address** của Wi-Fi, ví dụ `192.168.1.25`)

3. Trên điện thoại (cùng Wi-Fi), mở:

```
http://YOUR_IPV4:3000
```

Ví dụ: `http://192.168.1.25:3000`

---

## 7. Build production

```bash
npm run build
```

---

## 8. Chạy production local

```bash
npm run start
```

Mở **http://localhost:3000** (sau khi đã `npm run build`).

---

## 9. Deploy Vercel

1. Đẩy code lên **GitHub** (repository riêng).
2. Đăng nhập [Vercel](https://vercel.com).
3. **Add New Project** → Import repo GitHub.
4. Giữ cấu hình mặc định **Next.js** (Build: `next build`, Output: `.next`).
5. (Khuyến nghị) Thêm biến môi trường:
   - `NEXT_PUBLIC_SITE_URL` = URL production (ví dụ `https://pvep-day-2026.vercel.app`) — dùng cho Open Graph và JSON-LD.
6. **Deploy** → kiểm tra URL production trên điện thoại và máy tính.

---

## 10. Cách chỉnh sửa SEO

| Nội dung | File |
|----------|------|
| Title, description, keywords | `data/seo.ts` |
| Open Graph / Twitter (metadata) | `app/layout.tsx` + `data/seo.ts` |
| Ảnh OG (`og:image`) | `data/seo.ts` → `OG_IMAGE_PATH` |
| JSON-LD Event schema | `data/seo.ts` → `EVENT_JSON_LD` |
| Alt text từng slide | `data/sections.ts` |
| Nội dung chương trình / menu (sr-only) | `components/EventSeoContent.tsx` |

Sau khi sửa, chạy `npm run build` và kiểm tra bằng công cụ [Rich Results Test](https://search.google.com/test/rich-results) hoặc xem source trang.

---

## 11. Cách chỉnh sửa section / navigation

1. Mở `data/sections.ts`.
2. **Thêm section:** thêm object vào `SLIDE_SECTIONS` và mục tương ứng trong `NAV_ITEMS`.
3. **Xóa section:** xóa khỏi cả hai mảng và xóa file ảnh (nếu không dùng).
4. **Đổi tên nav:** sửa `navLabel` và `label` trong `NAV_ITEMS`.
5. Đảm bảo `id` khớp giữa section và nav (dùng cho scroll và active state).
6. Cập nhật `components/EventSeoContent.tsx` nếu cần nội dung SEO cho section mới.

---

## 12. Checklist trước khi gửi khách

- [ ] Website hiển thị đủ **6 slide** đúng thứ tự
- [ ] Không crop, không méo hình
- [ ] Đã test **mobile** (iPhone / Android)
- [ ] **Chạm phóng to** hoạt động với cả 6 slide
- [ ] Thanh nav mobile **không che** nội dung slide
- [ ] Đã test **desktop**
- [ ] Smooth scroll khi bấm menu
- [ ] Active state navigation đúng section
- [ ] Nút **back-to-top** hoạt động
- [ ] Có **SEO metadata** (title, description)
- [ ] Có **Open Graph** image (`website-01.jpg`)
- [ ] Có **JSON-LD** Event schema
- [ ] Ảnh load ổn (hero nhanh, slide sau lazy)
- [ ] `npm run build` — pass
- [ ] `npm run lint` — pass
- [ ] URL deploy production mở được trên điện thoại

---

## Scripts

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Chạy development |
| `npm run build` | Build production |
| `npm run start` | Chạy bản build |
| `npm run lint` | Kiểm tra ESLint |

---

## Thông tin sự kiện

- **Sự kiện:** PVEP Day 2026 — Ngày hội gia đình PVEP khu vực phía Nam
- **Ngày:** 23.5.2026
- **Địa điểm:** Khu du lịch Tân Cảng
- **Địa chỉ:** A100 Ung Văn Khiêm, Thạnh Mỹ Tây, TP. Hồ Chí Minh
