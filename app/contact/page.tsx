// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import ContactForm from "./ContactForm";

export default function ContactPage() {
  const apiUrl = process.env.API_URL ?? "";
  const heroBg = apiUrl ? `${apiUrl}/file-bucket/footerbg.jpg` : "/assets/bg/footerbg.jpg";

  return (
    <>
      <section className="contact-hero" style={{ backgroundImage: `url('${heroBg}')` }}>
        <div className="contact-hero-inner">
          <h1 className="contact-hero-title">Contact Us</h1>
        </div>
      </section>

      <div
        className="contact-wrap"
        style={{ backgroundImage: "url('/assets/bg/pattern_small.jpg')", backgroundRepeat: "repeat", backgroundSize: "30px 30px" }}
      >
        <ContactForm />
      </div>
    </>
  );
}
