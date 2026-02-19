import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import FeedCard from "./FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const ProfileEdit = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [err, setErr] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    setErr("");
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          about,
          gender,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(addUser(res?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setErr(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full max-w-6xl px-6">
          <fieldset className="bg-base-200 border border-base-300 rounded-box w-80 p-6 shadow-xl">
            <legend className="text-lg font-semibold mb-4">
              Update Profile
            </legend>

            <label className="label">FirstName</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">LastName</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />

            <label className="label">Age</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="label">Gender</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

            <label className="label">About</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <p className="text-error mt-2">{err}</p>

            <button
              className="btn btn-neutral mt-4 w-full"
              onClick={handleUpdate}
            >
              Update Profile
            </button>
          </fieldset>

          <FeedCard
            user={{ firstName, lastName, photoURL, age, about, gender }}
            showActions={false}
          />
        </div>
      </div>
      {toast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>
      </div>}
    </div>
  );
};

export default ProfileEdit;
