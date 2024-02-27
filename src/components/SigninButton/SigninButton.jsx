
import { app } from "../../redux/firebase";
import "./SigninButton.css";
import React from 'react';
import { signInStart, signInSuccess, signInFailure } from "../../redux/userSlice";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";

const SigninButton = () => {
    const [loading, setLoading] = useState(false); // Add loading state
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            setLoading(true)
        } catch (error) {
            setLoading(false)
            console.log("Could not login with google", error);
        }
    }
    return (
        <>
            <button onClick={handleGoogleClick} type="button" className="login-with-google-btn" >
                {loading ? "Please wait... Signing in..." : "Sign in with Google"}
            </button>
        </>
    )
}
export default SigninButton;