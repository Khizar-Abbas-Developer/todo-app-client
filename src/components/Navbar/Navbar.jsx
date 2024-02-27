import React from 'react';
import { Link } from 'react-router-dom';
import { UserSignOut } from "../../redux/userSlice";
import { ImCross } from "react-icons/im";
import logo from "../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";

const Navbar = () => {
  const pathname = window.location.pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    setAuthorized(currentUser?.email !== undefined && currentUser?.email !== "");
    setAdmin(currentUser?.email === process.env.REACT_APP_ADMIN_EMAIL);
  }, [currentUser?.image, currentUser?.email]);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]
  const handleLogOut = () => {
    dispatch(UserSignOut(currentUser))
    window.location.href = "/login"
  }
  const SidebarLink = ({ href, children }) => {
    const closeSidebar = useCallback(() => {
      document.getElementById("my-drawer-4").click();
    }, []);
    const isActive = href === pathname;
    return (
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">
        <div onClick={closeSidebar} className={isActive ? ' text-red-500 underline font-semibold' : ''}>
          <Link to={href}>
            {children}
          </Link>
        </div>
      </label>
    );
  };
  const toggleMenu = () => {
    setOpen(prevStat => !prevStat)
  }
  return (
    <>
      <div className="navbar bg-base-500 drop-shadow-md bg-black md:px-5 text-white">
        <div className="">
          <div className="flex-none md:hidden">
            <label htmlFor="my-drawer-4" className="drawer-button ml-2 mr-4 flex justify-center items-center bg-red-500 px-2 py-1 rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
            {/* //Drawer */}
            <div className="drawer drawer-start overflow-hidden bg-black">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

              <div className="drawer-side z-50">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">
                </label>
                <ul className="menu p-4 w-80 min-h-full text-base-content bg-black">
                  <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">
                    <ImCross className="text-2xl text-red-500" />
                  </label>

                  <div className="flex flex-col justify-center items-center gap-6 text-lg text-white" aria-label="my-drawer-4">
                    {
                      navLinks.map((link) => {
                        return (
                          <SidebarLink href={link.href} key={link.name} className={pathname === link.href ? "text-red-500 underline font-semibold" : ""}>{link.name}</SidebarLink>
                        )
                      })
                    }
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Link to={"/"} className="" aria-label="home-page">
            <img src={logo} className="w-[40px] h-[40px]" alt="" />
          </Link>
        </div>
        {/* middle dev */}
        <div className="hidden md:flex items-center text-lg justify-between gap-6">
          {
            navLinks.map((link) => {
              return (
                <Link to={link.href} key={link.name}>{link.name}</Link>
              )
            })
          }
        </div>
        {/* middle dev */}
        {/* third div starting from here */}
        <div className={`${open ? "dropdown dropdown-end md:ml-10" : "dropdown md:ml-10"}`} onClick={toggleMenu}>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" aria-label="drop-down-menu">
            {authorized && currentUser?.image ? (
              <div className="w-10 rounded-full border-2 border-red-600">
                <img src={currentUser?.image} className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover" alt="" />
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <HiOutlineUserCircle className="text-[40px]" />
              </div>
            )}
          </div>
          {authorized && (
            <>
              <ul tabIndex={0} className={`${open ? "menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-500 rounded-box w-52 bg-black text-red-500" : "hidden"} `}>
                {
                  admin && (
                    <>
                      <li className="cursor-pointer">
                        <Link to={"/product"} className="justify-between text-white hover:text-red-500">
                          Admin
                          <span className="badge bg-red-500 font-bold text-black border-none">New</span>
                        </Link>
                      </li>
                    </>
                  )
                }
                <li className="cursor-pointer">
                  <Link to={"/edit-profile"} className="justify-between text-white hover:text-red-500">
                    Profile
                    <span className="badge bg-red-500 font-bold text-black border-none">New</span>
                  </Link>
                </li>
                <li className={`${open ? "cursor-pointer ml-3 text-white hover:text-red-500" : ""}`} onClick={handleLogOut}>
                  Logout
                </li>
              </ul>
            </>
          )}
          {!authorized && (
            <>
              <ul tabIndex={0} className={`${open ? "menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-500 rounded-box w-52 bg-black text-red-500" : "hidden"}`}>
                <li className={`${open ? "cursor-pointer" : ""}`}>
                  <Link to={"/login"} className="justify-between">
                    Login
                  </Link>
                </li>
              </ul>
            </>
          )}

        </div>
      </div>
    </>
  )
}

export default Navbar;