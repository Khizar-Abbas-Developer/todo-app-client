import React from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment, useMemo } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { BiHide, BiShow } from "react-icons/bi";
import Loader from "../Loader/Loader"
import toast from "react-hot-toast";
import { ScaleLoader } from 'react-spinners';

const PasswordReset = () => {
  const param = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [validUrl, setValidUrl] = useState(null);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = param.id;
  const token = param.token;
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const url = `${process.env.REACT_APP_SERVER_DOMAIN}/${id}/${token}`;
  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setValidUrl(true)
        setError(false)
        toast.success("Enter New Password")
      }
    } catch (error) {
      setValidUrl(false)
      setError(error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(url, data)
      if(response.status === 200) {
        toast.success(response.data.message)
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <Fragment>
      {loading && <Loader />}
      {validUrl === false && !loading && (
        <div className="flex justify-center items-center text-2xl h-96 ml-2 text-center md:ml-0 md:mr-0">
          {error}
        </div>
      )}
      {validUrl && !loading && (
        <div className={styles.container}>
          <form className={styles.form_container}
          onSubmit={handleSubmit}
          >
            <h1 className="text-2xl mb-4 font-bold text-center md:text-left">
              Add New Password
            </h1>
            <div className="w-[80%] flex px-2 py-3 md:py-2 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                className="w-full bg-slate-200 border-none outline-none text-lg"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="New password"
                value={data.password}
                onChange={handleChange}
                name="password"
              />
              <span
                className="flex text-2xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
            <input type="text" name="id" hidden defaultValue={id} />
            <input type="text" name="token" hidden defaultValue={token} />
            <button className="w-[30%] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center rounded-md mt-8">

              {loading ? (
                <>
                  <div className="mt-1">
                    <ScaleLoader color="#FFFF00" height={20} width={4} />
                  </div>
                </>
              ) : (
                <>
                  {"Signup"}
                </>
              )}
            </button>
          </form>
        </div>
      )}
      {
        !error && !validUrl && !loading && (
          <div className="flex justify-center items-center h-[50vh]">
            <button onClick={handleResetPassword} className="px-4 py-4 bg-black text-red-500 border-none rounded-lg text-md">Click to Reset Password</button>
          </div>
        )
      }
    </Fragment>
  )
}

export default PasswordReset;