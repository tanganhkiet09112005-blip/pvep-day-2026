export const SITE_NAME = "PVEP Day 2026";

export const SEO_TITLE =
  "PVEP Day 2026 - Ngày hội gia đình PVEP khu vực phía Nam";

export const SEO_DESCRIPTION =
  "Landing page chính thức của PVEP Day 2026 khu vực phía Nam, bao gồm chương trình, hoạt động, team building, layout sự kiện và menu tiệc tối.";

export const SEO_DESCRIPTION_SHORT =
  "Landing page chính thức của PVEP Day 2026 khu vực phía Nam.";

export const SEO_KEYWORDS = [
  "PVEP Day 2026",
  "ngày hội gia đình PVEP",
  "PVEP khu vực phía Nam",
  "chương trình sự kiện PVEP",
  "team building PVEP",
  "menu tiệc PVEP Day",
  "layout sự kiện",
  "Khu du lịch Tân Cảng",
  "sự kiện doanh nghiệp",
  "corporate event landing page",
];

export const OG_IMAGE_PATH = "/images/website-01.jpg";

export const OG_IMAGE_ALT =
  "PVEP Day 2026 - Ngày hội gia đình PVEP khu vực phía Nam";

export const EVENT_INFO = {
  name: "Ngày hội gia đình PVEP Day 2026",
  area: "Khu vực phía Nam",
  dateDisplay: "23.5.2026",
  locationName: "Khu du lịch Tân Cảng",
  streetAddress: "A100 Ung Văn Khiêm, Thạnh Mỹ Tây",
  addressLocality: "TP. Hồ Chí Minh",
  addressCountry: "VN",
};

export const EVENT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: SEO_TITLE,
  startDate: "2026-05-23T15:30:00+07:00",
  endDate: "2026-05-23T20:00:00+07:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: EVENT_INFO.locationName,
    address: {
      "@type": "PostalAddress",
      streetAddress: EVENT_INFO.streetAddress,
      addressLocality: EVENT_INFO.addressLocality,
      addressCountry: EVENT_INFO.addressCountry,
    },
  },
  image: OG_IMAGE_PATH,
  description: SEO_DESCRIPTION,
  organizer: {
    "@type": "Organization",
    name: "PVEP",
  },
};

export function getMetadataBase(): URL {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";
  return new URL(url.startsWith("http") ? url : `https://${url}`);
}
