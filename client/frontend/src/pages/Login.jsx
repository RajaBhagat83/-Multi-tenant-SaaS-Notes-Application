import React, { useState } from "react";
import loginPage from "../assets/loginPage.png";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const bgImage = {
    backgroundImage: `url(${loginPage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: email,
        password: password,
      });
      setToken("Bearer "+response.data.token,response.data.user);
      console.log(response.data.token);
      localStorage.setItem("token", "Bearer "+response.data.token);
    } catch (err) {
      console.log(err);
      alert("Sigin Failed! Try again later");
    }
  };

  return (
    <main
      style={bgImage}
      className="h-screen w-full rounded-t-xl mt-2 ml-2 mr-2 flex items-center justify-center"
    >
      <div className=" w-[500px] flex justify-center h-[500px] border-4 border-white rounded-3xl bg-white">
        <div className="text-green-700 absolute top-60">
          <h1 className="text-5xl font-bold cursor-pointer">Login</h1>
        </div>
        <form
          className="mt-32 text-green-700 mr-44 w-full pl-7"
          onSubmit={handleClick}
        >
          <div className="text-xl p-3">
            <h2 className="mb-3 mr-2 cursor-pointer">Email</h2>
            <input
              type="text"
              placeholder="Enter Email"
              className="p-2 border-2 border-green-700 rounded-lg w-full "
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="text-xl p-3">
            <h2 className="mb-3 mr-2 cursor-pointer">Password</h2>
            <input
              type="password"
              placeholder="Enter Password"
              className="p-2 border-2 border-green-700 rounded-lg w-full"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="Submit"
            className=" cursor-pointer text-3xl text-white border-3 border-white bg-green-700 p-3 px-4 w-full rounded-xl ml-16 mt-6 "
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
