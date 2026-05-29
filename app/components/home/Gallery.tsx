// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import GalleryClient from "./GalleryClient";

type GalleryItem = {
  id: number;
  asset: { url: string; width: number; height: number; alt: string };
};

const FALLBACK: GalleryItem[] = [
  { id: 1, asset: { url: "/assets/content-img/gallery1_big.jpg", width: 970, height: 560, alt: "Night club scene" } },
  { id: 2, asset: { url: "/assets/content-img/gallery2_big.jpg", width: 970, height: 560, alt: "Guests enjoying the night" } },
  { id: 3, asset: { url: "/assets/content-img/gallery3_big.jpg", width: 970, height: 560, alt: "Singer on stage" } },
  { id: 4, asset: { url: "/assets/content-img/gallery4_big.jpg", width: 970, height: 560, alt: "Club atmosphere" } },
  { id: 5, asset: { url: "/assets/content-img/gallery5_big.jpg", width: 970, height: 560, alt: "DJ performing" } },
  { id: 6, asset: { url: "/assets/content-img/gallery6_big.jpg", width: 970, height: 560, alt: "Dance floor" } },
  { id: 7, asset: { url: "/assets/content-img/gallery7_big.jpg", width: 970, height: 560, alt: "Concert crowd" } },
];

async function getGallery(): Promise<{ items: GalleryItem[]; apiUrl: string }> {
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/gallery`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gallery fetch failed");
    const items: GalleryItem[] = await res.json();
    return { items: items.length > 0 ? items : FALLBACK, apiUrl: items.length > 0 ? apiUrl : "" };
  } catch {
    return { items: FALLBACK, apiUrl: "" };
  }
}

export default async function Gallery() {
  const { items, apiUrl } = await getGallery();

  const images = items.map((item) => ({
    src: item.asset.url.startsWith("/assets/") ? item.asset.url : `${apiUrl}${item.asset.url}`,
    alt: item.asset.alt,
  }));

  return (
    <section className="gallery-section">
      <h2 className="section-title">Night Club Gallery</h2>
      <GalleryClient images={images} />
    </section>
  );
}
