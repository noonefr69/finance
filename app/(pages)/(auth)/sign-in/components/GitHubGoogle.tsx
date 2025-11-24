import { FaGoogle, FaGithub } from "react-icons/fa";
import ProviderLoginWay from "./ProviderLoginWay";

export default function GitHubGoogle() {
  return (
    <div className="flex items-center gap-4 justify-between">
      <ProviderLoginWay
        icon={<FaGithub />}
        label="Sign in with GitHub"
        way={"github"}
      />
      <ProviderLoginWay
        icon={<FaGoogle />}
        label="Sign in with Google"
        way={"google"}
      />
    </div>
  );
}
