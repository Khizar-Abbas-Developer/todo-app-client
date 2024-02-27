import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ClipLoader } from 'react-spinners';

const Todo = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/${userId}`;
      try {
        setLoading(true);
        if (userId && userId !== undefined) {
          const response = await axios.get(url);
          if (Array.isArray(response.data.data)) {
            const allItems = response.data.data.flatMap(item => item.items);
            setList(allItems);
          } else if (response.data.data.items) {
            setList(response.data.data.items);
          } else {
            console.error('Unexpected response structure:', response.data.data);
          }
        } else {
          setList([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (itemId) => {
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/${itemId}`
    try {
      setLoading(true);
      const response = await axios.delete(url);
      if (response.status === 200) {
        setList(list.filter(item => item._id !== itemId));
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  const handleEdit = async (itemId) => {
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/${itemId}`
    try {
      const updatedTitle = window.prompt('Enter the new title:');
      setLoading(true);
      const response = await axios.put(url, { title: updatedTitle });
      if (response.status === 200) {
        setList(list.map(item => {
          if (item._id === itemId) {
            return { ...item, Title: updatedTitle };
          }
          return item;
        }));
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <ClipLoader />
      ) : (
        <div className='flex flex-col justify-center items-center px-8 md:px-0 w-full md:w-[25%]'>
          {list.map((item, index) => {
            return (
              <div className="bg-slate-300 mb-2 w-full flex justify-between px-6 rounded-md cursor-pointer" key={index}>
                <div className="text-2xl">
                  {item.Title}
                </div>
                <div className="flex justify-center items-center gap-4">
                  <MdDeleteForever onClick={() => handleDelete(item._id)} className='text-3xl text-red-700' />
                  <FaEdit onClick={() => handleEdit(item._id)} className='text-2xl text-blue-700' />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default Todo;