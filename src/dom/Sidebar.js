import { SidebarHeader } from "./SidebarHeader";
import { Menu } from "./Menu";

export default function Sidebar({ children }) {
  return (
    <div id="sidebar">
      <SidebarHeader />
      <Menu />
      {/*{{...children}}*/}
    </div>
  );
}