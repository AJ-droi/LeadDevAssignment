import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { TableBody, TableHead } from "../components/Tablle";
import { useAuth } from "./context/authcontext";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { useLocation, useParams } from "react-router-dom";

const Seller = () => {
  const { limit, offset, getOrders, setOffset, orders } = useAuth();
  const handleOffsetPrev = async () => {
    setOffset(offset - 1);
    if (orders.length >= 0 && offset <= 0) {
      setOffset(1);
    }
  };

  const handleOffsetNext = async () => {
    setOffset(offset + 1);
    if (orders.length === 0) {
      setOffset(1);
    }
  };

  useEffect(() => {
    getOrders(limit, offset);
  }, [offset]);

  const location = useLocation();

  return (
    <div className="bg-[#E5E5E5] py-[3%] ">
      <div className="px-[3%] w-[90%] bg-[#fff] mx-[auto] py-[2%] rounded-lg">
        <h1 className="text-[30px] font-bold">Order Items</h1>
        <TableHead
          head={["id", "product_id", "date", "price", "product_category", ""]}
        >
          <TableBody />
        </TableHead>
      </div>
      {location.pathname === `/seller` ? (
        <div className="flex justify-between px-[5%] mt-[3%]">
          <button className="flex items-center justify-center rounded-lg bg-[#F64E60] text-[#fff] w-[30%] lg:w-[10%]"onClick={handleOffsetPrev} >
            <h4>Previous{" "}</h4>
            <BiFirstPage className="text-[30px]"  />{" "}
          </button>
          <h4>Page {offset}</h4>
          <button className="flex items-center justify-center rounded-lg bg-[#3699FF] text-[#fff] w-[30%] lg:w-[10%] " onClick={handleOffsetNext}>
            <h4>Next</h4>
            <BiLastPage
              className="text-[30px]"
              
            />{" "}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Seller;
