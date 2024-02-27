import { useEffect, useState, Fragment } from "react";
import toast from 'react-hot-toast';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import success from "../../assets/success.png";
import styles from "./styles.module.css";
import * as React from "react";
import { motion } from "framer-motion";

const EmailVerify = () => {
  const [loading, setLoading] = useState(false);
  const [validUrl, setValidUrl] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const param = useParams();
  const handleVerify = async () => {
    try {
      setLoading(true);
      if (!param || !param.id || !param.token || !param.id[0] || !param.id[2]) {
        throw new Error("Invalid parameters in the URL");
      } else {
        const url = process.env.REACT_APP_SERVER_DOMAIN;
        const finalUrl = `${url}/${param.id}/verify/${param.token}`;
        const response = await axios.get(finalUrl);
        if (response.status === 200) {
          setValidUrl(true);
          setVerified(true);
          setError(false);
        } else {
          setValidUrl(false);
          setVerified(false);
          setError(true);
        }
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
        setValidUrl(false);
        setVerified(false);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-96">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader />
          </div>
        ) : error && (
          <div className="flex flex-col justify-center items-center h-96 gap-6">
            <h1 className="text-2xl font-bold md:text-5xl">
              Your token has expired!
            </h1>
            <h3 className="text-xl md:text-3xl">Please try again</h3>
            <p className="text-5xl md:text-6xl">⚠️</p>
          </div>
        )}
        {verified && (
          <div className="flex flex-col justify-center items-center h-96">
            <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl text-center">
              Email Verified Successfully
            </h1>
            <p className="text-7xl md:text-8xl">✅</p>
            <Link to={"/login"} className="underline text-xl">
              Login to your account
            </Link>
          </div>
        )}

        {
          !error && !verified && !loading && (
            <button onClick={handleVerify} className="px-4 py-4 bg-black text-red-500 border-none rounded-lg text-md">Click to Verify</button>
          )
        }
      </div>
    </>
  );
};

export default EmailVerify;
