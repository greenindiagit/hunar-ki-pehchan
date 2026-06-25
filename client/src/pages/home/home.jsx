import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Hero from "../hero/hero";
import Guests from "../guest/guest";
import OurImpact from "../our-impact/our-impact";
import FeaturedEpisodes from "../future/future-episodes";
import MissionVisionImpact from "../mission/mission";
import DonationSection from "../donation/donation";
// import ScrollingBanner from "../hero/ScrollingBanner";

function Home() {
  return (
    <>
      <Header />
      {/* <ScrollingBanner /> */}
      <Hero />
      <Guests />
      <OurImpact />
      <FeaturedEpisodes />
      <MissionVisionImpact />
      <DonationSection />
      <Footer />
    </>
  );
}

export default Home;
