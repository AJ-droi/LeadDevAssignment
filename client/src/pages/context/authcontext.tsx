import React, { createContext, useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Login {
    sellerId:string,
    zipCode:string
}

type ProductCategory = {
    product_category_name: string
}

interface Order {
    _id: string,
    order_item_id: number,
    product_id: string,
    seller_id: string,
    shipping_limit_date: string,
    price: number,
    order_products: ProductCategory[]
}

interface Sellers {
    _id: string,
    seller_id: string,
    seller_zip_code_prefix: number,
    seller_city: string,
    seller_state: string
}


export const dataContext = createContext<any | null>(null);

const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const [orders, setOrders] = useState<Order[]>([])
    const [seller, setSeller] = useState<Sellers[]>([])
    const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(1);


	/**==============Login ========== **/
	const LoginConfig = async (formData: Login) => {
		try {
			const LoginData = {
				sellerId: formData.sellerId,
				zipCode: formData.zipCode,
			};

			console.log(LoginData)
            

			const result = await apiPost(`/login`, LoginData)
			const response = await result.data.user
            const message = await result.data.message
            toast.success(message)
			localStorage.setItem("signature", result.data.signature);
            setTimeout(() => {
				window.location.href = "/seller"
			}, 2000)

		} catch (err: any) {
			// setResendError(err.response.data.message);
            toast.error(err.response.data.errorMessage)
			setTimeout(() => {
				window.location.href = "/"
			}, 2000)
		}
	};

    /**==============Get Orders ========== **/
    const getOrders = async(limit:number, offset:number) => {
        console.log(offset)
        try{
          const result =  await apiGet(`/order_items?limit=${limit}&offset=${offset}`)
          const response = await result.data.data
          setOrders([...response])

        }catch(err:any){
            console.log(err.response.data.message);
        }
    }

     /**==============Delete Orders ========== **/
     const deleteOrder = async(id:number) => {
        try{
          const result =  await apiDelete(`/order_items/${id}`)
          const response = await result.data.data
          const message = await result.data.message
          toast.success(message)
          setOrders([...response])
          setTimeout(() => {
            window.location.href = `/seller/${id}`
        }, 2000)

        }catch(err:any){
            toast.error(err.response.data.errorMessage)
        }
    }

    /**==============Get All Sellers ========== **/
    const getSeller =  async() => {
      
        try{
          const result =  await apiGet(`/seller`)
          const response = await result.data.user
          console.log(response)
          setSeller([response])
        }catch(err:any){
            console.log(err)
            // console.log(err.response.data.message);
        }
    }


     /**==============update Sellers ========== **/
     const  updateSeller = async(formData:Sellers) => {
        const updateData = {
            state:formData.seller_state,
            city:formData.seller_city
        }
        try{
            const result =  await apiPut(`/account`, updateData)
            const message = await result.data.message
            toast.success(message)
            setTimeout(() => {
				window.location.href = "/edit"
			}, 2000)

        }catch(err:any){
            toast.error(err.response.data.errorMessage)
            // setTimeout(() => {
            //     window.location.href = `/seller/${id}`
            // }, 2000)

        }

     }




	/**==============Logout ======= **/
	const Logout = () => {
		localStorage.clear();
		window.location.href = "/";
	};


	return (
		<dataContext.Provider value={{
			LoginConfig,
			Logout,
            orders,
            getOrders,
            limit,
            offset,
            setOffset,
            deleteOrder,
            seller,
            getSeller,
            updateSeller
        	
		}}>
			{children}
		</dataContext.Provider>
	);
};

export const useAuth = () => {
	const context = React.useContext(dataContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within the auth provider");
	}
	return context;
};

export default DataProvider;


