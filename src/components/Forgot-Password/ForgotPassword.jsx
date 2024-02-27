import React, { useState } from 'react'
import { ScaleLoader } from 'react-spinners';
import Loader from "../../components/Loader/Loader";
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({
    email: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/api/forgot-password`;
    if (!data.email) {
      toast.error("Email address can't be empty")
      return;
    } else {
      setLoading(true);
      const { email } = data;
      const requestData = { email };
      const response = await axios.post(url, requestData);
      if (response.status === 200) {
        setMsg(response.data.message)
        toast.success(response.data.message);
        setData({
          email: "",
        });
      } else {
        console.log(response);
        toast.error(response.data.message);
      }
        setLoading(false)
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={"w-full h-[77vh] flex justify-center items-center overflow-hidden"}>
            <form className={"w-[300px p-[10px] bg-white rounded-[10px] flex flex-col items-center shadow-lg"}
              onSubmit={handleSubmit}
            >
              <h1 className="text-2xl mb-4 font-extrabold tracking-wide text-center md:px-16">Forgot Password?</h1>
              <h3 className='text-lg font-semibold'>You'll get an email with a reset link</h3>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                autoComplete="off"
                value={data.email}
                onChange={handleChange}
                className={"outline-blue-200 border-none w-full p-[8px] rounded-[10px] bg-[#edf5f3] mt-[5px] mb-0 text-[18px] pl-3"}
              />
              {msg && <div className={"w-full p-[15px] mt-[5px] mb-0 text-[17px] text-center font-semibold bg-[#3cce70] rounded-[5px]"}>{msg}</div>}
              <button className="w-[30%] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center rounded-md mt-8">

                {loading ? (
                  <>
                    <div className="mt-1">
                      <ScaleLoader color="#FFFF00" height={20} width={4} />
                    </div>
                  </>
                ) : (
                  <>
                    {"Reset"}
                  </>
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default ForgotPassword;