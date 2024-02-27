import React, { useState } from 'react'
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import SigninButton from '../SigninButton/SigninButton';
import toast from 'react-hot-toast';
import axios from 'axios';


const Signup = () => {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = process.env.REACT_APP_SERVER_DOMAIN
        try {
            setLoading(true);
            if (data.username === "") {
                toast.error("Username name can't be empty");
                setLoading(false);
                return;
            }
            else if (data.email === "") {
                toast.error("Email address can't be empty");
                setLoading(false);
                return;
            }
            else if (data.password === "") {
                toast.error("Password can't be empty");
                setLoading(false);
                return;
            }
            if (data.password !== data.confirmpassword) {
                toast.error("Password and Confirm Password do not match.");
                setLoading(false);
                return;
            }
            else {
                const { username, email, password } = data;
                const requestData = { username, email, password };
                const response = await axios.post(`${url}/api/register`, requestData);
                if (response.status === 201) {
                    setMsg(response.data.message)
                    toast.success(response.data.message);
                    setData({
                        username: "",
                        email: "",
                        password: "",
                        confirmpassword: "",
                    });
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            setLoading(false);
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error("Server is Down! 😣");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="p-3 bg-slate-100 min-h-[calc(90vh)]">
                <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 mt-24 shadow-md rounded-md">
                    <div variant={"success"} className="bg-green-300 w-full h-full text-center font-bold">{msg ? msg : ""}</div>
                    <form
                        className="w-full py-3 flex flex-col"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-center text-3xl md:text-4xl font-bold">Sign-up</h1>
                        <label htmlFor="username">Username</label>
                        <input
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                            type={"text"}
                            id="username"
                            name="username"
                            autoComplete="off"
                            value={data.username}
                            onChange={handleChange}
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                            type={"email"}
                            id="email"
                            name="email"
                            autoComplete="on"
                            value={data.email}
                            onChange={handleChange}
                        />

                        <label htmlFor="password">Password</label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                            <input
                                className=" w-full bg-slate-200 border-none outline-none"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                            />
                            <span
                                className="flex text-xl cursor-pointer"
                                onClick={handleShowPassword}
                            >
                                {showPassword ? <BiShow /> : <BiHide />}
                            </span>
                        </div>

                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                            <input
                                className=" w-full bg-slate-200 border-none outline-none"
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmpassword"
                                name="confirmpassword"
                                value={data.confirmpassword}
                                onChange={handleChange}
                            />
                            <span
                                className="flex text-xl cursor-pointer"
                                onClick={handleShowConfirmPassword}
                            >
                                {showConfirmPassword ? <BiShow /> : <BiHide />}
                            </span>
                        </div>
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
                    <p className="text-left w-full text-sm mt-2">
                        Already have Account ?{" "}
                        <Link to={"/login"} className="text-red-500 underline">
                            Login
                        </Link>
                    </p>
                    <div className="mt-2">
                        <SigninButton />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup