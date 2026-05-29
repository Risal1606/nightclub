// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import TestimonialsSlider, { type Testimonial } from "./TestimonialsSlider";

const FALLBACK: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    content: "We booked a table for six people, and the whole evening just worked. The staff were quick, the music was sharp, and the atmosphere felt exclusive without becoming stiff.",
    asset: { url: "/assets/content-img/testimonial_1.jpg", width: 170, height: 170, alt: "John Doe" },
    facebook: "#",
    twitter: "#",
  },
  {
    id: 2,
    name: "Jane Smith",
    content: "An incredible night out. The ambiance, the music, and the service were all top notch. Highly recommend for a premium night club experience.",
    asset: { url: "/assets/content-img/testimonial_2.jpg", width: 170, height: 170, alt: "Jane Smith" },
    facebook: "#",
    twitter: "#",
  },
  {
    id: 3,
    name: "Mark Wilson",
    content: "Best night club in the city. The DJ was absolutely phenomenal and kept the crowd energized all night long. Will definitely be back!",
    asset: { url: "/assets/content-img/testimonial_3.jpg", width: 170, height: 170, alt: "Mark Wilson" },
    facebook: "#",
    twitter: "#",
  },
];

async function getTestimonials(): Promise<{ testimonials: Testimonial[]; apiUrl: string }> {
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/testimonials`, { cache: "no-store" });
    if (!res.ok) throw new Error("Testimonials fetch failed");
    const testimonials: Testimonial[] = await res.json();
    return {
      testimonials: testimonials.length > 0 ? testimonials : FALLBACK,
      apiUrl: testimonials.length > 0 ? apiUrl : "",
    };
  } catch {
    return { testimonials: FALLBACK, apiUrl: "" };
  }
}

export default async function Testimonials() {
  const { testimonials, apiUrl } = await getTestimonials();

  return (
    <section className="test-section">
      <div className="test-overlay" />
      <TestimonialsSlider testimonials={testimonials} apiUrl={apiUrl} />
    </section>
  );
}
