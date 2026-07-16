"use client";
import Link from "next/link";
import React ,{useEffect}from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios"
export default function loginPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful!");
      router.push("/profile");
    }catch(error:any){
      console.log("Login failed",error.message);
      toast.error("Login failed. Please try again.");
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);       
    } else {
      setButtonDisabled(true);
    } 
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading? "Logging in...": "Login"}</h1>
      <hr />
      
      <label htmlFor="email">email</label>
      <input
        className="border-2 border-gray-300 p-2 rounded-md mb-4"
        type="email"
        name="email"
        id="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">password</label>
      <input
        className="border-2 border-gray-300 p-2 rounded-md mb-4"
        type="password"
        name="password"
        id="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded-md mb-4"
        onClick={onLogin}
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link className="text-blue-500" href="/signup">
        Don't have an account? Sign Up
      </Link>
    </div>
  );
}
