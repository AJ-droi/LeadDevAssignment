import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { TableBody, TableHead } from '../components/Tablle'
import { useAuth } from './context/authcontext'
import {BiFirstPage, BiLastPage} from 'react-icons/bi'

const Seller = () => {
  const {limit, offset, getOrders, setOffset, orders} = useAuth()
  const handleOffsetPrev = async() => {
    setOffset(offset - 1)
    if(orders.length >= 0 && offset <= 0){
        setOffset(1)
        console.log(offset)
    }
}

const handleOffsetNext = async() => {
    
    setOffset(offset + 1)
    if(orders.length === 0 ){
        setOffset(1)
    }
}

  useEffect(() => {
    getOrders(limit, offset)
  }, [offset])

   
  return (
    <div>Seller
        <div className='px-[3%]'>
            <TableHead head={["id", "product_id","date","price","product_category", ""]}>
                
                <TableBody />
            </TableHead>
        </div>
        <div className='flex justify-center'>
            <BiFirstPage className='text-[50px]' onClick={handleOffsetPrev} />
            <BiLastPage className='text-[50px]' onClick={handleOffsetNext} />
        </div>
       

      
    </div>
  )
}

export default Seller