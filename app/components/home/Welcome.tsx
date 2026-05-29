// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import Image from "next/image";

const photos = [
  {
    src: "/assets/content-img/thumb1.jpg",
    alt: "VIP table setup with wine glasses",
    label: "Night Club",
  },
  {
    src: "/assets/content-img/reastaurant_1.jpg",
    alt: "Fine dining experience",
    label: "Restaurant",
  },
  {
    src: "/assets/content-img/thumb2.jpg",
    alt: "Nightclub bar atmosphere in blue light",
    label: "Bar",
  },
];

export default function Welcome() {
  return (
    <section className="welcome">
      <h2 className="section-title">Welcome in Nightclub</h2>
      <div className="welcome-grid">
        {photos.map((photo) => (
          <div key={photo.src} className="welcome-img-wrap">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="welcome-img"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="welcome-hover" aria-hidden="true">
              <span className="welcome-hover-top" />
              <span className="welcome-hover-label">{photo.label}</span>
              <span className="welcome-hover-bottom" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
