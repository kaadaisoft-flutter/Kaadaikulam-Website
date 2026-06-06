import Hero from "../components/Hero";
import Heritage from "../components/Heritage";
import KulaGuru from "../components/KulaGuru";
import ClanGrandeur from "../components/ClanGrandeur";
import Temples from "../components/Temples";
import HomeVideos from "../components/HomeVideos";
import ContactCTA from "../components/ContactCTA";
import { FadeUp } from "../components/animations/Reveal";

const Home = () => {
  return (
    <div className="bg-sacred-home min-h-screen">
      <Hero />
      <FadeUp>
        <ClanGrandeur />
      </FadeUp>
      <FadeUp>
        <KulaGuru />
      </FadeUp>
      <FadeUp>
        <Heritage />
      </FadeUp>
      <div id="temples-section">
        <FadeUp>
          <Temples />
        </FadeUp>
      </div>
      <FadeUp>
        <HomeVideos />
      </FadeUp>
      <FadeUp>
        <ContactCTA />
      </FadeUp>
    </div>
  );
};

export default Home;
