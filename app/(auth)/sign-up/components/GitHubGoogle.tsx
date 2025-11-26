import { FaGoogle, FaGithub } from "react-icons/fa";
import ProviderLoginWay from "./ProviderLoginWay";

export default function GitHubGoogle() {
  return (
    <div className="flex items-center gap-4 px-6 justify-between">
      <ProviderLoginWay
        icon={<FaGithub />}
        label="Sign up with GitHub"
        way={"github"}
      />
      <ProviderLoginWay
        icon={<FaGoogle />}
        label="Sign up with Google"
        way={"google"}
      />
    </div>
  );
}
