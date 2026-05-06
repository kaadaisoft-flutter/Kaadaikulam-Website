import Hero from "../components/Hero";
import Heritage from "../components/Heritage";
import KulaGuru from "../components/KulaGuru";
import ClanGrandeur from "../components/ClanGrandeur";
import Temples from "../components/Temples";
import ContactCTA from "../components/ContactCTA";
import { FadeUp } from "../components/animations/Reveal";

const Home = () => {
  return (
    <div className="bg-sacred-home min-h-screen">
      <Hero />
      <FadeUp>
        <Heritage />
      </FadeUp>
      <FadeUp>
        <ClanGrandeur />
      </FadeUp>
      <FadeUp>
        <KulaGuru />
      </FadeUp>
      <div id="temples-section">
        <FadeUp>
          <Temples />
        </FadeUp>
      </div>
      <FadeUp>
        <ContactCTA />
      </FadeUp>
    </div>
  );
};

export default Home;
