/* eslint-disable react/no-unescaped-entities */
"use client";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import SigninButton from "../../components/SigninButton/SigninButton";
import { signInFailure, signInStart, signInSuccess } from "../../redux/userSlice";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [msg, setMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_SERVER_DOMAIN}/api/login`
        try {
            setLoading(true);
            if (!data.email) {
                toast.error("Email address can't be empty");
            } else if (!data.password) {
                toast.error("Password can't be empty");
            } else {
                const response = await axios.post(url, data);
                if (response.status === 200) {
                    dispatch(signInStart());
                    toast.success(response.data.message);
                    dispatch(signInSuccess(response.data.data));
                    navigate("/")
                } else {
                    toast.error(response.data.message)
                    dispatch(signInFailure(response.data.message));
                }
            }
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setLoading(false);
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false)
        }
    };
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className="p-3 bg-slate-100 min-h-[calc(90vh)] pt-40">
                <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 shadow-xl rounded-md">
                    <div variant={"success"} className="bg-green-300 w-full h-full text-center font-bold">{msg ? msg : ""}</div>
                    <h1 className="text-center text-3xl md:text-4xl font-bold">Login</h1>
                    <form
                        className="w-full py-3 flex flex-col"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="email">Email</label>
                        <input
                            type={"email"}
                            id="email"
                            name="email"
                            autoComplete="on"
                            value={data.email}
                            onChange={handleChange}
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        />

                        <label htmlFor="password">Password</label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={handleChange}
                                className=" w-full bg-slate-200 border-none outline-none"
                            />
                            <span
                                className="flex text-xl cursor-pointer"
                                onClick={handleShowPassword}
                            >
                                {showPassword ? <BiShow /> : <BiHide />}
                            </span>
                        </div>
                        <Link to={"/forgot-password"} className="underline text-red-500">Forget Password ?</Link>
                        <button className="w-[30%] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center rounded-md mt-8">

                            {loading ? (
                                <>
                                    <div className="mt-1">
                                        <ScaleLoader color="#FFFF00" height={20} width={4} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {"Login"}
                                </>
                            )}
                        </button>
                    </form>
                    <p className="text-left w-full text-sm mt-2">
                        Doesn't have an Account?{" "}
                        <Link to={"/signup"} className="text-red-500 underline">
                            Signup
                        </Link>
                    </p>
                    <div className="mt-2">
                        <SigninButton />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
