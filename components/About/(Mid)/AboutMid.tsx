import AboutMidContentDesktop from "./AboutMidContentDesktop";
import AboutMidContentMobile from "./AboutMidContentMobile";
import AboutMidImgDesktop from "./AboutMidImgDesktop";
import AboutMidImgMobile from "./AboutMidImgMobile";

export default function AboutMid() {
  return (
    <div className="bg-secondary">
      <div className="flex items-center lg:flex-row flex-col-reverse  mt-10 max-w-7xl mx-auto gap-10 p-5 lg:p-10">
        <AboutMidImgDesktop />
        <AboutMidImgMobile />
        <div className="flex lg:w-1/2 flex-col gap-4">
          <AboutMidContentDesktop />
          <AboutMidContentMobile />
        </div>
      </div>
    </div>
  );
}
