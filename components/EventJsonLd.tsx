import { EVENT_JSON_LD, getMetadataBase, OG_IMAGE_PATH } from "@/data/seo";

export function EventJsonLd() {
  const baseUrl = getMetadataBase().origin;
  const schema = {
    ...EVENT_JSON_LD,
    image: `${baseUrl}${OG_IMAGE_PATH}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
