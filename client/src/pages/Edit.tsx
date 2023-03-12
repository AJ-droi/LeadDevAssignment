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
    <div className='px-[3%] '>
        <div className='flex justify-between items-center my-[2%]'>
            <div className='flex justify-between w-[50%]'>
                <div className='w-[50%]'>
                    <label>Seller State</label>
                    <input type="text" name="seller_state" className='rounded-lg ml-[3%]' onChange={handleChange} />
                </div>
        
                <div className='w-[50%]'>
                    <label>Seller City</label>
                    <input type="text" name="seller_city" className='rounded-lg ml-[3%]' onChange={handleChange} />
                </div>
            </div>
            <button className="bg-[#C9F7F5] text-[#1BC5BD] w-[30%] h-[4vh] rounded-lg" onClick = {handleSubmit}>
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