import LatestBlog from "./LatestBlog";

export default function LatestBlogs() {
  return (
    <div className="max-w-7xl grid lg:grid-cols-3 gap-5 mx-auto p-5 lg:p-10">
      <LatestBlog />
      <LatestBlog />
      <LatestBlog />
    </div>
  );
}
