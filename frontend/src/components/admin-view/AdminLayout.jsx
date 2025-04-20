import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSideBar from './AdminSidebar'
function AdminLayout() {
  const [openSideBar, setOpenSideBar] = useState(false)
  return (
    // <div className="flex min-h-screen w-full">
    //   {/* admin sidebar */}
    //   <AdminSideBar open={openSideBar} setOpen={setOpenSideBar} />
    //   <div className="flex flex-1 flex-col">
    //     {/* admin header */}
    //     <AdminHeader  setOpen={setOpenSideBar}/>
    //     <main className="flex-1 flex-col flex bg-[#F0F0F0] p-4 md:p-6 ">
    //       <Outlet />
    //     </main>
    //   </div>
    // </div>

    <div className="flex min-h-screen w-full">
  <AdminSideBar open={openSideBar} setOpen={setOpenSideBar} />
  <div className="flex flex-1 flex-col">
    <AdminHeader setOpen={setOpenSideBar} />
    <main className="flex-1 flex-col flex bg-[#F0F0F0] p-4 md:p-6">
      <Outlet />
    </main>
  </div>
</div>

  )
}

export default AdminLayout