import React from 'react'
import { Link } from 'react-router-dom';
import notFound from "../../assets/not-found.jpg"

const ErrorPage = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-[80vh] gap-5 bg-no-repeat bg-center" style={{backgroundImage: `url(${notFound})`}}>
                <h1 className='text-3xl font-bold md:text-6xl text-center'>404 Page not found!</h1>
                <h3 className='text-xl font-bold md:text-4xl text-center'>Sorry! this page doesn't exist</h3>
                <h4 className='text-lg font-bold md:text-2xl text-center text-black'>Go Back to <span className='text-red-500'><Link to="/" className='underline'>Home Page</Link></span></h4>
            </div>
        </>
    )
}

export default ErrorPage