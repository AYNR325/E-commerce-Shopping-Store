import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return ( 
    <nav className=" mt-8  flex-col flex gap-2 bg-[#A67A4B] ">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        {/* <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent> */}
        {/* <SheetContent side="left" className="w-64 p-0">
  <div
    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
    aria-hidden="true"
  />
  <div className="relative z-10 flex h-full flex-col bg-background">
    <SheetHeader className="border-b">
      <SheetTitle className="mt-5 mb-5 flex gap-2">
        <ChartNoAxesCombined size={30} />
        <h1 className="text-2xl font-extrabold">Admin Panel</h1>
      </SheetTitle>
    </SheetHeader>
    <MenuItems setOpen={setOpen} />
  </div>
</SheetContent> */}
<SheetContent
  side="left"
  className="w-64  p-0  bg-[#A67A4B] shadow-lg border-none backdrop-blur-0"
>
  <div className="flex  h-full flex-col ">
    <SheetHeader className="border-b">
      <SheetTitle className="mt-5  mb-5 flex gap-2">
        <ChartNoAxesCombined size={30} />
        <h1 className="text-2xl font-extrabold">Admin Panel</h1>
      </SheetTitle>
    </SheetHeader>
    <MenuItems setOpen={setOpen} />
  </div>
</SheetContent>


      </Sheet>
      <aside className="hidden w-64 flex-col border-r  p-6 lg:flex bg-[#A67A4B] ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems  />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;




