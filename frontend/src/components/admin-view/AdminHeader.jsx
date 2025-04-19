import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice/authSlice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex  items-center justify-between px-4 py-3 bg-white border-b ">
      <Button 
      onClick={() => setOpen(true)}
       className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end ">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center  px-4 py-2 text-sm font-medium shadow bg-white text-[#A67A4B] hover:text-white hover:bg-[#A67A4B] border-[1px] border-[#A67A4B] rounded-[6px] "
        >
          <LogOut />
          <span className="hidden md:block">Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;