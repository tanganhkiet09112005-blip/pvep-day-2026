import { EVENT_INFO } from "@/data/seo";

export function EventSeoContent() {
  return (
    <aside
      className="sr-only"
      aria-label="Thông tin chi tiết sự kiện PVEP Day 2026"
    >
      <article>
        <h2>Ngày hội gia đình PVEP Day 2026</h2>
        <p>
          <strong>Khu vực:</strong> {EVENT_INFO.area}
        </p>
        <p>
          <strong>Ngày:</strong> {EVENT_INFO.dateDisplay}
        </p>
        <p>
          <strong>Địa điểm:</strong> {EVENT_INFO.locationName}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {EVENT_INFO.streetAddress},{" "}
          {EVENT_INFO.addressLocality}
        </p>
      </article>

      <section aria-labelledby="seo-program-heading">
        <h2 id="seo-program-heading">Chương trình PVEP Day 2026</h2>
        <ul>
          <li>15h30 - 17h45: Đón khách &amp; các hoạt động ngoài trời</li>
          <li>17h45 - 18h00: Di chuyển về hội trường tổ chức Gala</li>
          <li>
            18h00 - 18h05: Key moment mở màn: Ngọn cờ tiên phong - Khơi nguồn
            năng lượng
          </li>
          <li>18h05 - 18h10: Tuyên bố lý do, giới thiệu đại biểu</li>
          <li>18h10 - 18h15: Phát biểu khai mạc của lãnh đạo PVEP-HCM</li>
          <li>
            18h15 - 18h20: Phát biểu chỉ đạo của lãnh đạo Tổng công ty PVEP
          </li>
          <li>
            18h20 - 18h30: Clip phóng sự Hoạt động sản xuất kinh doanh năm 2025
            và mục tiêu kế hoạch năm 2026
          </li>
          <li>18h30 - 18h40: Clip Những trái tim giữ lửa - PVEP HCM</li>
          <li>18h40 - 18h45: Trao quà Hạt mầm năng lượng</li>
          <li>
            18h45 - 19h00: Key moment 2: Nghi thức Khơi nguồn năng lượng và nâng
            ly khai tiệc
          </li>
          <li>19h00 - 19h15: Âm nhạc</li>
          <li>19h15 - 19h25: Bốc thăm may mắn lần 1</li>
          <li>19h25 - 19h40: Âm nhạc &amp; biểu diễn ảo thuật</li>
          <li>19h40 - 19h50: Bốc thăm may mắn lần 2</li>
          <li>19h40 - 19h50: Văn nghệ</li>
        </ul>
      </section>

      <section aria-labelledby="seo-activities-heading">
        <h2 id="seo-activities-heading">Hoạt động tại PVEP Day 2026</h2>
        <ul>
          <li>Photobooth</li>
          <li>Workshop ươm mầm xanh</li>
          <li>Chụp ảnh lấy ngay</li>
          <li>Quầy kem hạnh phúc</li>
          <li>Triển lãm ảnh</li>
          <li>Workshop vẽ ước mơ</li>
          <li>Máy gắp thú bông</li>
          <li>Triển lãm Ngọn cờ tiên phong</li>
        </ul>
      </section>

      <section aria-labelledby="seo-teambuilding-heading">
        <h2 id="seo-teambuilding-heading">Team Building PVEP Day 2026</h2>
        <ul>
          <li>Game 1: Đồng sức đồng lòng</li>
          <li>Game 2: Chung 1 đích đến</li>
          <li>Game 3: Vượt sóng vươn xa</li>
        </ul>
      </section>

      <section aria-labelledby="seo-layout-heading">
        <h2 id="seo-layout-heading">Layout mặt bằng sự kiện</h2>
        <ul>
          <li>Khu vực hoạt động ngoài trời</li>
          <li>Cổng chào</li>
          <li>Phòng Gala</li>
          <li>Bãi xe</li>
          <li>Lối vào</li>
        </ul>
      </section>

      <section aria-labelledby="seo-menu-heading">
        <h2 id="seo-menu-heading">Menu tiệc tối PVEP Day 2026</h2>
        <h3>Khai vị</h3>
        <ul>
          <li>Gỏi bò bóp thấu</li>
          <li>Chả giò Bình Quới</li>
          <li>Nem nướng</li>
        </ul>
        <h3>Món chính</h3>
        <ul>
          <li>Cá Chẽm sốt chanh dây</li>
          <li>Tôm chiên hạnh nhân</li>
          <li>Rau củ luộc thập cẩm - Kho quẹt</li>
          <li>Khoai tây chiên</li>
          <li>Gà ủ rơm - Xôi lá dứa</li>
          <li>Ba chỉ quay lu - Bánh hỏi</li>
          <li>Cơm chiên thịt cua cồi sò điệp</li>
        </ul>
        <h3>Tráng miệng</h3>
        <ul>
          <li>Bánh Panacotta</li>
        </ul>
      </section>
    </aside>
  );
}
