import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { ScaleLoader } from 'react-spinners';
import Todo from '../Todo/Todo';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: ""
  });
  const [todoKey, setTodoKey] = useState(0); // State to trigger re-render of Todo component

  useEffect(() => {
    // Update the key to trigger re-render of Todo component whenever userId changes
    setTodoKey(prevKey => prevKey + 1);
  }, [userId]);  

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/addTodo/v1/${userId}`;
    try {
      setLoading(true);
      if (!data.title) {
        toast.error("Please Add your Todo");
      } else if (!currentUser?.email) {
        navigate("/login");
      } else {
        const response = await axios.post(url, data);
        if (response.status === 200) {
          setData({ title: "" });
          toast.success(response.data.message);
          setTodoKey(todoKey + 1); // Trigger re-render of Todo component after successful addition
        }
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-[90vh]">
      <div className="flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold text-center mb-4">TO-DO APP</h1>
        <h2 className="text-2xl font-bold text-center mb-8">With Authentication using
          <span> </span>
          <span className='text-3xl text-[#489C3A]'>M</span>
          <span className='text-3xl text-[#3C3C3C]'>E</span>
          <span className='text-3xl text-[#65DCFB]'>R</span>
          <span className='text-3xl text-[#90CB4F]'>N</span>
          <span> </span>
          Stack</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center w-full justify-center">
          <input
            type="text"
            name="title"
            id="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Add Todo..."
            className="py-2 px-4 mb-4 md:mb-0 w-full md:w-[25%] md:mr-0 outline-red-300 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-transparent"
          />
          <button className="py-2 px-8 md:px-6 bg-red-500 text-white rounded-md md:rounded-sm hover:bg-red-600 focus:outline-none">
            {loading ? (
              <ScaleLoader color="#FFFF00" height={11} width={1} />
            ) : (
              "Add"
            )}
          </button>
        </form>
      </div>
      <Todo userId={userId} key={todoKey} /> {/* Pass the updated key prop */}
    </div>
  );
};

export default Home;