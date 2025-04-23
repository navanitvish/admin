import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import SkipToMain from "./skip-to-main";
import Nav from "./nav";

export default function AppShell() {
  // const { isAuthenticated } = useAuth();
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className="relative h-full  bg-background">
      <SkipToMain />
    

      
      
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
     
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        <Outlet />
      </main>
    </div>
  );
}
