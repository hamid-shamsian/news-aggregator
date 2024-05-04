import { ReactNode } from "react";
import Drawer from "@mui/material/Drawer";

const MobileMenu = ({ open, onClose, children }: { open: boolean; onClose?: () => void; children: ReactNode }) => {
  return (
    <Drawer open={open} onClose={onClose} anchor='left'>
      {children}
    </Drawer>
  );
};

export default MobileMenu;
