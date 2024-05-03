import { Outlet } from "react-router-dom";
import Menu from "../widget/Menu";

const UserLayout = () => {
  return (
    <Menu>
      <Outlet />
    </Menu>
  );
};

export default UserLayout;
