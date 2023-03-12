import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../pages/context/authcontext";

export const TableHead = ({ head, children }: any) => {
  return (
    <div className="w-[100%] overflow-auto">
      <Table className="w-[400%] md:w-[300%] lg:w-[150%] xl:w-[100%]">
        <Table.Head className="border text-center ">
          {head.map((elem: any, id: any) => (
            <Table.HeadCell key={id}>{elem}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">{children}</Table.Body>
      </Table>
    </div>
  );
};

export const TableBody = () => {
  

  const { orders, getOrders, limit, offset, deleteOrder } = useAuth();
  const { productId } = useParams() 
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    getOrders(limit, offset);
  }, []);

  console.log(orders.length);
  const singleOrder = orders.filter(
    (item: any, id: number) => item.id == productId
  );


  return (
    <>
      {(location.pathname == `/seller/${productId}` ? singleOrder : orders).map(
        (elem: any, id: number) => (
          <Table.Row className="h-[8vh]" key={id}>
            <Table.Cell className="text-center w-[10%]">{elem.id}</Table.Cell>
        
            <Table.Cell className="text-center w-[20%] ">
              {elem.product_id}
            </Table.Cell>
            <Table.Cell className="text-center w-[15%] ">
              {elem.date}
            </Table.Cell>
            <Table.Cell className="text-center w-[10%]">
              {elem.price}
            </Table.Cell>
            <Table.Cell className="text-center w-[10%]">
              {elem.product_category}
            </Table.Cell>
            {location.pathname == `/seller/${productId}`?<>
            <Link
              to={`/edit`}
              className="flex items-center justify-center h-[inherit]"
            ><button className="bg-[#C9F7F5] text-[#1BC5BD] w-[100%] h-[4vh] rounded-lg">
               Edit
              </button>
              </Link>
              <button className="bg-[#C9F7F5] text-[#1BC5BD] w-[100%] h-[4vh] rounded-lg" onClick={(e) => deleteOrder(productId)} >
                Delete
              </button>
            </> :<Link
              to={`/seller/${elem.id}`}
              className="flex items-center justify-center h-[inherit]"
            >
              <button className="bg-[#C9F7F5] text-[#1BC5BD] w-[100%] h-[4vh] rounded-lg">
                View
              </button>
            </Link>}
          </Table.Row>
        )
      )}
    </>
  );
};

export const SellerTable = () => {
  const {seller, getSeller} = useAuth()

  useEffect(() => {
    getSeller()
  }, [])

  console.log(seller)
  return (
    <>
      {seller.map(
        (elem: any, id: number) => (
          <Table.Row className="h-[8vh]" key={id}>
            <Table.Cell className="text-center w-[10%]">{elem._id}</Table.Cell>
            <Table.Cell className="text-center w-[20%] ">
              {elem.seller_id}
            </Table.Cell>
            <Table.Cell className="text-center w-[15%] ">
              {elem.seller_zip_code_prefix}
            </Table.Cell>
            <Table.Cell className="text-center w-[10%]">
              {elem.seller_city}
            </Table.Cell>
            <Table.Cell className="text-center w-[10%]">
              {elem.seller_state}
            </Table.Cell>
          </Table.Row>
        )
      )}
    </>
  );

}
