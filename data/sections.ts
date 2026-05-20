export type SectionId =
  | "home"
  | "program"
  | "activities"
  | "team-building"
  | "layout"
  | "menu";

export type SlideSectionData = {
  id: SectionId;
  navLabel: string;
  sectionLabel: string;
  heading: string;
  headingLevel: 1 | 2;
  imageSrc: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "program", label: "Program" },
  { id: "activities", label: "Activities" },
  { id: "team-building", label: "Team Building" },
  { id: "layout", label: "Layout" },
  { id: "menu", label: "Menu" },
];

export const SLIDE_SECTIONS: SlideSectionData[] = [
  {
    id: "home",
    navLabel: "Home",
    sectionLabel: "01 / PVEP DAY",
    heading: "PVEP Day 2026",
    headingLevel: 1,
    imageSrc: "/images/website-01.jpg",
    alt: "PVEP Day 2026 - Ngày hội gia đình PVEP khu vực phía Nam tại Khu du lịch Tân Cảng ngày 23.5.2026",
    width: 4500,
    height: 8000,
    priority: true,
  },
  {
    id: "program",
    navLabel: "Program",
    sectionLabel: "02 / CHƯƠNG TRÌNH",
    heading: "Chương trình PVEP Day 2026",
    headingLevel: 2,
    imageSrc: "/images/website-02.jpg",
    alt: "Chương trình chi tiết sự kiện PVEP Day 2026 gồm đón khách, hoạt động ngoài trời, gala, phát biểu, biểu diễn và bốc thăm may mắn",
    width: 6000,
    height: 10667,
  },
  {
    id: "activities",
    navLabel: "Activities",
    sectionLabel: "03 / HOẠT ĐỘNG",
    heading: "Hoạt động tại PVEP Day 2026",
    headingLevel: 2,
    imageSrc: "/images/website-03.jpg",
    alt: "Các hoạt động tại PVEP Day 2026 gồm photobooth, workshop ươm mầm xanh, chụp ảnh lấy ngay, quầy kem hạnh phúc, triển lãm ảnh và máy gắp thú bông",
    width: 4500,
    height: 8000,
  },
  {
    id: "team-building",
    navLabel: "Team Building",
    sectionLabel: "04 / TEAM BUILDING",
    heading: "Team Building PVEP Day 2026",
    headingLevel: 2,
    imageSrc: "/images/website-04.jpg",
    alt: "Team building PVEP Day 2026 với các game Đồng sức đồng lòng, Chung một đích đến và Vượt sóng vươn xa",
    width: 4500,
    height: 8000,
  },
  {
    id: "layout",
    navLabel: "Layout",
    sectionLabel: "05 / LAYOUT",
    heading: "Layout mặt bằng sự kiện",
    headingLevel: 2,
    imageSrc: "/images/website-05.jpg",
    alt: "Layout mặt bằng sự kiện PVEP Day 2026 tại Khu du lịch Tân Cảng gồm khu hoạt động ngoài trời, cổng chào, phòng gala, bãi xe và lối vào",
    width: 4500,
    height: 8000,
  },
  {
    id: "menu",
    navLabel: "Menu",
    sectionLabel: "06 / MENU TIỆC",
    heading: "Menu tiệc tối PVEP Day 2026",
    headingLevel: 2,
    imageSrc: "/images/website-06.jpg",
    alt: "Menu tiệc tối PVEP Day 2026 gồm khai vị, món chính và tráng miệng",
    width: 4500,
    height: 8000,
  },
];
