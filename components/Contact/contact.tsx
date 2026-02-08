import FormContact from "./FormContact";
import ImagePart from "./ImagePart";

export default function Contact() {
  return (
    <div id="contact" className="flex flex-col-reverse lg:flex-row items-center gap-10 max-w-5xl mx-auto p-5 lg:p-10">
      <ImagePart />
      <FormContact />
    </div>
  );
}
