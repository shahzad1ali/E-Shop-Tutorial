import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from 'react-icons/ai'
import styles from '../../styles/style'
import { Link } from 'react-router-dom'
import { MdBorderClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {getAllOrdersOfShop} from "../../redux/actions/order"
import {getAllProductsShop} from "../../redux/actions/product"
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'


const DashboardHero = () => {
    const dispatch = useDispatch()
    const {seller} = useSelector((state) => state.seller)
  const {orders} = useSelector((state) => state.order)
    const {shopProducts} = useSelector((state) => state.products)

    
      
    useEffect(() => {
     dispatch(getAllProductsShop(seller._id))
     dispatch(getAllOrdersOfShop(seller._id))
    }, [dispatch])


     const availableBalance =  seller?.availableBalance.toFixed(2)


    const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: "",
      type: "number",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];
    
   const rows = [];
   orders && orders.forEach((item) => {
     rows.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US$" + item.totalPrice,
        status: item.status,
     })
   })

  return (
    <div className='w-full p-8'>
         <h3 className='text-[22px] pb-2 font-Poppins'>Overview</h3> 
         <div className="w-full block 800px:flex items-center justify-between">
             <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">

                <div className="flex items-center ">
                    <AiOutlineMoneyCollect 
                    size={30}
                    className='mr-2'
                    fill="#0000085"/>
                    <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#0000085]`}>
                        Account Balance <span className='text-[16px]'>(with 10% service charge)</span>
                    </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${availableBalance}</h5>
                <Link to="/dashboard-withdraw-money"><h5 className='pt-4 pl-2 text-[#077f9c]'>Withdraw Money</h5></Link>
             </div>

               <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center ">
                    <MdBorderClear  
                    size={30}
                    className='mr-2'
                    fill="#0000085"/>
                    <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#0000085]`}>
                       All Orders
                    </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
                <Link to="/dashboard-orders"><h5 className='pt-4 pl-2 text-[#077f9c]'>View Orders</h5></Link>
             </div>

               <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">

                <div className="flex items-center ">
                    <AiOutlineMoneyCollect 
                    size={30}
                    className='mr-2'
                    fill="#0000085"/>
                    <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#0000085]`}>
                        All Products
                    </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{shopProducts && shopProducts.length}</h5>
                <Link to="/dashboard-products"><h5 className='pt-4 pl-2 text-[#077f9c]'>View Products</h5></Link>
             </div>

            </div>  
            
             <br />
             <h3 className='text-[22px] font-Poppins pb-2'>Latest Orders</h3>
             <div className="w-full bg-white rounded min-h-[45vh]">
                        <DataGrid
            rows={rows} // ✅ fixed
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
          />
             </div>
    </div>
  )
}

export default DashboardHero