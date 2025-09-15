import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { deleteEvent } from "../../redux/actions/event";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { toast } from "react-toastify";

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdraw-request`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "id",
      headerName: "Withdraw Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Request given at",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "",
      headerName: "Updated Status",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <BsPencil
            size={20}
            className={`${params.row.status !== "Processing" ? 'hidden' : ''} mt-[15px] ml-[50px] cursor-pointer`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
    // {
    //   field: "Delete",
    //   headerName: "",
    //   type: "number",
    //   minWidth: 120,
    //   flex: 0.8,
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Button onClick={() => handleDelete(params.id)}>
    //           <AiOutlineDelete size={20} />
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ];

  const handleSubmit = async () => {
    await axios
      .put(`${server}/withdraw/update-withdraw-requst/${withdrawData.id}`, {
        sellerId: withdrawData.shopId,
      },{withCredentials: true})
      .then((res) => {
        toast.success("Withdraw requested updated successfully!");
        setData(res.data.withdraws);
        setOpen(false)
      });
  };
  const row = [];
  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.seller._id,
        name: item.seller.name,
        amount: "U$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex items-center pt-5 justify-center">
      <div className="w-[95%] bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      </div>
      {open && (
        <div className="w-full fixed left-0 top-0 bg-[#00000089] z-[9999] flex items-center justify-center h-screen">
          <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-5">
            <div className="flex justify-end w-full">
              {" "}
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />{" "}
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Update Withdraw status
            </h1>
            <br />
            <select
              name=" "
              id=""
              onChange={(e) => setWithdrawStatus(e.target.value)}
             
              className="w-[200px] h-[35px] border rounded"
            >
              <option  value={withdrawStatus} >{withdrawData.status}</option>
              <option value={withdrawStatus}>Processing</option>
            </select>
            <button
              type="Submit"
              className={`${styles.button} block text-white !h-[42px] mt-4 text-[18px]`}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWithdraw;
