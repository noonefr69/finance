import AboutHeroH1Desktop from "./AboutHeroH1Desktop";
import AboutHeroH1Mobile from "./AboutHeroH1Mobile";
import AboutHeroPDesktop from "./AboutHeroPDesktop";
import AboutHeroPMobile from "./AboutHeroPMobile";
import AboutHeroImgMobile from "./AboutHeroImgMobile";
import AboutHeroImgDesktop from "./AboutHeroImgDesktop";

export default function AboutHero() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 p-5 md:p-10 max-w-7xl mx-auto">
      <div>
        <div className="font-medium  font-serif lg:px-10 text-4xl lg:text-6xl mb-5">
          <AboutHeroH1Desktop />
          <AboutHeroH1Mobile />
        </div>

        <AboutHeroPDesktop />
        <AboutHeroPMobile />
      </div>
      <AboutHeroImgDesktop />
      <AboutHeroImgMobile />
    </div>
  );
}
