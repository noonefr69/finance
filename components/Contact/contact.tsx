import Image from "next/image";
import FormContact from "./FormContact";

export default function Contact() {
  return (
    <div id="contact" className="flex flex-col-reverse lg:flex-row items-center gap-10 max-w-5xl mx-auto p-5 lg:p-10">
      <div className="lg:w-2/5">
        <Image src={`/nerdCat.jpg`} alt="nerd cat" width={900} height={400} />
      </div>
      <FormContact />
    </div>
  );
}
