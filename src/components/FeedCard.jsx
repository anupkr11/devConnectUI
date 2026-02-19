import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const FeedCard = ({ user, showActions = true }) => {
  const { _id, firstName, lastName, age, gender, photoURL, about } = user || {};
  console.log(gender, about);
  const dispatch = useDispatch();
  const handleSendReq = async (status, id) => {
    try{
      const res = await axios.post(BASE_URL+"request/send/"+ status + "/"+ id, {}, {withCredentials: true});
      dispatch(removeFeed(id));
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm mx-auto ">
      <figure>
        <img
          src={photoURL}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        <p>
          {age} years old, {gender}
        </p>
        <h3>{about}</h3>
        <div className="card-actions justify-end">
          {showActions && (
            <>
              <button className="btn btn-primary" onClick={()=>handleSendReq("ignored", _id)}>Ignore</button>
              <button className="btn btn-primary" onClick={()=>handleSendReq("interested", _id)}>Interested</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
