import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './context/authcontext'

const Home = () => {
    const [formData, setFormData] = useState({})
    const {LoginConfig} = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
        console.log(formData)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        LoginConfig(formData)
    }
  return (
    <div className="bg-[#fff] w-[80%] mx-[auto] rounded-lg ">
        <h3 className="md:text-left md:ml-[5%] md:text-lg pt-[5%] text-[#272556] font-extrabold ">
        Sign In
        </h3>
        <form className="flex flex-col items-center text-left  w-[100%] " onSubmit={handleSubmit}>
        <div className="w-[100%] flex flex-col items-center py-[3%]">
            <label
            htmlFor="name"
            className="w-[60%] mx-[auto] text-center font-medium md:text-left md:w-[80%] "
            >
            Seller Id{" "}
            </label>
            <br />
            <input
            type="text"
            name="sellerId"
            id="name"
            placeholder="henry@nigerianbar.ng"
            className="border rounded-lg w-[80%] mt-[-5%] h-[6vh] pl-[2%] lg:mt-[0%]"
            onChange={handleChange}
    
            />
        </div>
        <div className="w-[100%] flex flex-col items-center py-[3%] ">
            <label htmlFor="name" className="font-medium md:w-[80%]">
            ZipCode
            </label>
            <br />
            <input
            type="number"
            name="zipCode"
            id="password"
            className="border w-[80%] mt-[-5%] h-[6vh] rounded-lg pl-[2%] lg:mt-[0%]"
            onChange={handleChange}
            />
        </div>
        <div className="flex flex-col md:flex-row md:justify-center md:items-center md:px-[10%] md:w-[200%] ">
            
            <button
            className="bg-[#272556] text-[#fff] w-[90%] h-[5vh] mx-[auto] md:mx-[0%] rounded-lg my-[5%] md:my-[3%] md:w-[50%] lg:w-[40%]"
            type="submit"
            >
            {" "}
            Sign In{" "}
            </button>
            {/* <button onClick={handleRole}>Check Role</button> */}
        </div>
        </form>
    </div>

  )
}

export default Home