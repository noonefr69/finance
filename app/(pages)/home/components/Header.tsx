import HeaderCards from "./HeaderCards";

export default function Header() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <HeaderCards />
      <HeaderCards />
      <HeaderCards />
      <HeaderCards />
    </div>
  );
}
