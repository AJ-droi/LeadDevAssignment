import React, { useState } from 'react'
import { SellerTable, TableHead } from '../components/Tablle'
import { useAuth } from './context/authcontext'

const Edit = () => {
    const [formData, setFormData] = useState({})
    const {updateSeller} = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
        console.log(formData)
    }

    const handleSubmit = () => {
        updateSeller(formData)
    }

  return (
    <div>
    <div className='px-[3%] bg-[#fff] w-[80%] mx-[auto] rounded-lg py-[2%] mt-[5%]'>
        <div className='flex flex-col lg:flex-row justify-between items-center my-[2%]'>
            <div className='flex flex-col lg:flex-row justify-between w-[100%] lg:w-[50%]'>
                <div className='w-[100%] lg:w-[50%]'>
                    <label className='' >Seller State</label>
                    <input type="text" name="seller_state" className='rounded-lg  w-[100%]' onChange={handleChange} />
                </div>
        
                <div className='w-[100%] lg:w-[50%] mt-[5%] lg:mt-[0%] lg:ml-[5%]'>
                    <label className=''>Seller City</label>
                    <input type="text" name="seller_city" className='rounded-lg  w-[100%]' onChange={handleChange} />
                </div>
            </div>
            <button className="bg-[#C9F7F5] text-[#1BC5BD] w-[100%] lg:w-[30%] h-[4vh] rounded-lg mt-[5%] lg:mt-[0%]" onClick = {handleSubmit}>
                    Update
                </button>
        </div>

        
        <TableHead head={["id", "seller_id","seller_zip_code_prefix","seller_city","seller_state"]}>
            <SellerTable />
        </TableHead>
    </div></div>
  )
}

export default Edit