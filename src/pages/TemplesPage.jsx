import Hero from "../components/Hero";
import Temples from "../components/Temples";
import TempleVerses from "../components/TempleVerses";
import ContactCTA from "../components/ContactCTA";

const TemplesPage = () => {
  return (
    <div className="bg-sacred-temples min-h-screen">
      <Hero />
      <TempleVerses />
      <div className="pt-10">
        <Temples showButton={false} />
      </div>
      <ContactCTA />
    </div>
  );
};

export default TemplesPage;
