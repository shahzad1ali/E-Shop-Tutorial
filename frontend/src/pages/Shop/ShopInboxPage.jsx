import React from 'react'
import DashboardSideBar from '../../components/shop/Layout/DashboardSideBar'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import DashboardMessages from "../../components/shop/DashboardMessages"

const ShopInboxPage = () => {
  return (
  <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">

            <DashboardSideBar active={8} />
        </div>
        <DashboardMessages />
      </div>
    </div>  )
}

export default ShopInboxPage