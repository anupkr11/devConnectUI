import axios from 'axios'
import React, { use, useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const request = useSelector((store)=>store.request);
    const fetchRequests = async() => {
        try{
            const requests = await axios.get(BASE_URL+"user/requests/recieved", {withCredentials: true})
            console.log(requests.data);
            dispatch(addRequest(requests?.data?.data));
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[])
  if(!request) return ;
    if(request?.length === 0) return <div className='flex items-center justify-center min-h-screen text-2xl'>No requests found</div>
  return (
    <div className='text-center my-10'>
        <h1 className='text-2xl font-bold'>Requests</h1>
        {request?.map((conn, index)=>{
            const {firstName, lastName, age, gender, photoURL, about} = conn.fromUserId || {};
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
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Accept</button>
                        <button className="btn btn-primary">Reject</button>
                    </div>
                </div>
            )
        }
        )}
    </div>
  )
}

export default Requests