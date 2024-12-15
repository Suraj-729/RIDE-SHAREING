import React from "react";

const UserLogin = () => {
  return (
    <div className="p-7">
      <div>
        <form>
          <img
            className="w-16 mb-10"
            src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
            alt=""
          />

          <h3 className="text-lg font-medium mb-2 ">What is your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="password"
          />
          <button className="bg-[#111] text-white  font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
