// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import Hero from "@/app/components/home/Hero";
import Welcome from "@/app/components/home/Welcome";
import FeaturedEvents from "@/app/components/home/FeaturedEvents";
import Gallery from "@/app/components/home/Gallery";
import TrackPlayer from "@/app/components/home/TrackPlayer";
import LatestVideo from "@/app/components/home/LatestVideo";
import Testimonials from "@/app/components/home/Testimonials";
import Newsletter from "@/app/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <FeaturedEvents />
      <Gallery />
      <TrackPlayer />
      <LatestVideo />
      <Testimonials />
      <Newsletter />
    </>
  );
}
