import React, { useEffect, useState } from "react";
import ProductCard from "../Route/productCard/productCard";
import styles from "../../styles/style";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { shopProducts } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.event);
    const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch(getAllProductsShop(id));
        dispatch(getAllEventsShop(seller._id));
  }, [dispatch, id]);

    const allReviews =
    shopProducts && shopProducts.map((product) => product.reviews).flat();

   console.log(shopProducts);
    console.log(events);
  // console.log(allReviews);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>

        <div className="">
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} h-[42px] !rounded-[4px]  hidden 800px:flex text-center item-center`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {shopProducts &&
            shopProducts.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} isEvent={true} />
              ))}
          </div>
        </div>
      )}

      {active === 3 && (
        <div className="w-full ">
          {allReviews &&
            allReviews.map((item, index) => (
              <div key={index} className="">
                <span className="w-full flex my-4">
                  <img
                    src={`${item.user.avatar.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="pl-2">
                    <div className="flex w-full items-center">
                      <h1 className="font-[600] pr-2">{item.user.name}</h1>
                      <Ratings rating={item.rating} />
                    </div>
                    <p className="font-[400] text-[#00000094]">
                      {item?.comment}
                    </p>
                    <p className="text-[#000000a7] text-[14px]">
                      {"2days ago"}
                    </p>
                  </div>
                </span>
                {/* <span className="text-gray-600">{item.comment}</span> */}
              </div>
            ))}
        </div>
      )}


      {shopProducts && shopProducts.length === 0 && (
        <h5 className="w-full text-center py-5 text-[18px]">
          No Products have for this shop!
        </h5>
      )}
    </div>
  );
};

export default ShopProfileData;
