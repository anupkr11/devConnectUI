import React from "react";

const FeedCard = ({ user, showActions = true }) => {
  const { firstName, lastName, age, gender, photoURL, about } = user || {};
  console.log(gender, about);
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
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-primary">Interested</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
