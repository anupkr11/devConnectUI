import axios from 'axios';
import React, { use, useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { showFeed } from '../utils/feedSlice';
import FeedCard from './FeedCard';
import { useSelector } from 'react-redux';

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store)=>store.feed);
    const feeds = async() =>{
        if(feed) return;
        try{
            const res = await axios.get(BASE_URL+"feed", {withCredentials: true});
            console.log(res.data);
            dispatch(showFeed(res?.data?.data));
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        feeds();
    },[])
  return (
    <div>
        <FeedCard user={feed?.[1]} />
    </div>
  )
}

export default Feed