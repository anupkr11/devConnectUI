import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { BASE_URL } from '../utils/constants';

const Connections = () => {
    const dispatch = useDispatch();
    const connection = useSelector((store)=>store.connection);
    const fetchConn = async()=>{
        try{
            const res = await axios.get(BASE_URL+"user/connections", {withCredentials: true});
            console.log(res.data);
            dispatch(addConnection(res?.data?.data));

        }catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        fetchConn();
    },[])

    if(!connection) return ;
    if(connection?.length === 0) return <div className='flex items-center justify-center min-h-screen text-2xl'>No connections found</div>
  return (
    <div className='text-center my-10'>
        <h1 className='text-2xl font-bold'>Connections</h1>
        {connection?.map((conn, index)=>{
            const {firstName, lastName, age, gender, photoURL, about} = conn || {};
            return (
                <div key={index} className='card bg-base-100 w-96 shadow-sm mx-auto my-5'>
                    <figure>
                        <img src={photoURL} alt="Connection" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{firstName} {lastName}</h2>
                        <p>{age} years old, {gender}</p>
                        <h3>{about}</h3>
                    </div>
                </div>
            )
        }
        )}
    </div>
  )
}

export default Connections