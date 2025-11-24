import Image from "next/image";

export default function AboutHero() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 p-10 max-w-7xl mx-auto">
      <div>
        <h1 className=" font-medium font-serif lg:px-10 lg:leading-22 text-6xl mb-5">
          About{" "}
          <i className="border-b-2 font-bold rounded-2xl px-2 border-b-accent">
            Finance
          </i>{" "}
          with Wellness and Productivity
        </h1>
        <p className="lg:mx-14 opacity-80">
          Wherever you are should not be a factor in what you do. Brilliant
          well-being and Productivity at one time will change the way the world
          works.
        </p>
      </div>
      <div className="relative h-96 w-full bg-gray-900 rounded-md dark:shadow-[9px_9px_0px_5px_gray] shadow-[9px_9px_0px_5px_rgba(0,0,0,1)]">
        <Image src={`/idea-1.webp`} alt="img" fill className="rounded-md" />
      </div>
    </div>
  );
}
