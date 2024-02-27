import React, { useEffect, useState } from "react";
import loginSignUpImage from "../../assets/empty-profile.png";
import { useNavigate } from "react-router-dom";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { UpdateUserFailure, UpdateUserSucess, updateUserStart } from "../../redux/userSlice";
import Skeleton from "./Skeleton";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const tempImage = loginSignUpImage;
  const [loadingImage, setLoadingImage] = useState(true);
  const [myUserName, setMyUserName] = useState(currentUser?.username || "");
  const [myUserImage, setMyUserImage] = useState(currentUser?.image || "");
  // const [myUserId, setMyUserId] = useState(currentUser?._id || "");
  const myUserId = currentUser?._id || ""
  useEffect(() => {
    if (!currentUser?._id) {
      naviagte("/login")
    }
  }, [currentUser, naviagte]);

  useEffect(() => {
    // Set myUserImage initially when currentUser is available
    if (currentUser?.image) {
      setMyUserImage(currentUser.image);
      setLoadingImage(false); // Set loading to false after setting the image
    } else {
      setMyUserImage("");
      setLoadingImage(false); // Set loading to false after setting the image
    }
  }, [currentUser, tempImage]);

  const removeTheProfilePic = () => {
    setMyUserImage("");
  };
  const handleUploadProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setMyUserImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { myUserImage, myUserName, myUserId }
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/edit-profile`;
    try {
      setLoading(true)
      dispatch(updateUserStart());
      const response = await axios.post(url, dataToSend);
      if (response.status === 200) {
        dispatch(UpdateUserSucess(response.data.data));
        toast.success(response.data.message)
      }
    } catch (error) {
      dispatch(UpdateUserFailure(error));
      toast.error("Internal Server Error!")
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="flex h-[90vh] items-center justify-center bg-white z-0">
        {loadingImage ? (
          <>
            <Skeleton />
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
          >
            <div className="gap-4 w-screen max-w-md rounded-xl p-6 my-12 bg-gray-100">
              <h1 className="text-3xl md:2xl text-center font-bold mb-4">
                User Profile Edit
              </h1>
              <div className="flex flex-col items-center space-y-6">
                <div className="flex">
                  <div className="w-28 h-28 overflow-hidden rounded-full flex justify-center items-center border-4 border-red-500 -mr-3">
                    <div className="flex justify-center items-center gap-4 w-full mx-auto bg-red-600">
                      <label htmlFor="fileInput" className="cursor-pointer" aria-label="profile">
                        <img
                          src={myUserImage || tempImage}
                          alt="avatar-animation"
                          className='rounded-full h-auto w-[120px] z-1'
                          aria-label="profile"
                        />
                        <input type="file" accept="image/*" name="imageFile" onChange={handleUploadProfileImage} style={{ display: "none" }} id="fileInput" aria-label="upload-profile" />
                      </label>
                    </div>
                  </div>
                  <div className="-ml-6">
                      <SmallCloseIcon className="text-3xl cursor-pointer border border-white p-1 bg-red-500 rounded-full" onClick={removeTheProfilePic} />
                  </div>
                </div>
              </div>
              {/* Username input field */}
              <div className="mt-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700" aria-label="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="mt-1 p-2 border rounded-md w-full"
                  name="username"
                  value={myUserName}
                  autoComplete="off"
                  onChange={(e) => setMyUserName(e.target.value)}
                  arial-label="input-username"
                />
                <input type="text" id="userId" name="userId" defaultValue={currentUser && currentUser._id} hidden />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700" aria-label="email">
                  Email
                </label>
                <input type="email" id="email" name="email" className="mt-1 p-2 font-bold border rounded-md w-full" value={currentUser?.email} aria-label="input-email" autoComplete="off" disabled />
              </div>

              {/* Update button */}
              <div className="mt-6">
                <button className="w-full py-2 m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center rounded-md mt-8">

                  {loading ? (
                    <>
                      <ScaleLoader color="#FFFF00" height={20} width={4} />
                    </>
                  ) : (
                    <>
                      {"Update"}
                    </>
                  )}
                </button>
              </div>
              {/* Delete account and reset password links */}
              <div className="flex justify-between font-semibold mt-4">
                <div>
                  <Link href={"/forgot-password"} aria-label="Reset Password">
                    <p className="text-red-700 text-xs md:text-base">Reset Password</p>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </div >
    </>
  )
}

export default EditProfile