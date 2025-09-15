import React from 'react'
import AdminHeader from '../components/layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AdminProducts from "../components/Admin/AdminProducts"


const AdminDashboardProducts = () => {
  return (
 <div>
        <AdminHeader />
        <div className="w-full flex">
              <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
        </div>
        <AdminProducts />
      </div>
        </div>
    </div>  )
}

export default AdminDashboardProducts