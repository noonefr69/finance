import { Sidebar } from "@/components/ui/sidebar";
import SidebarLogo from "./SidebarLogo";
import SidebarProfile from "./SidebarProfile";
import SidebarMain from "./SidebarMain";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating" className="">
      {/* Header */}
      <SidebarLogo />

      {/* Main Content */}
      <SidebarMain />

      {/* Footer */}
      <SidebarProfile />
    </Sidebar>
  );
}
