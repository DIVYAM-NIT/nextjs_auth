"use client"
import { toast } from "react-hot-toast"
import axios from "axios"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
export default function ProfilePage() {

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState("no data");

  const logout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("api/users/signout");
      console.log(response.data);
      toast.success("Logout successful");
      router.push("/login");

    }catch (error:any) {
      console.log("Error in logout:", error.message);
      toast.error("Error in logout: " + error.message);
    }finally {
      setLoading(false);
    }
  }

  const getUserData = async () => {
    try {
      const response = await axios.get("api/users/me");
      console.log("User data:", response.data.user._id);
      toast.success("User data fetched successfully");
      setData(response.data.user._id);
    }catch (error:any) {
      console.log("Error in getUserData:", error.message);
      toast.error("Error in getUserData: " + error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading? "Logging out from Profile..." : "Profile"}</h1>
      <h2 className="mt-4 bg-amber-500 p-2 rounded-md">
        {/* {data === "no data" ? "No user data fetched yet." : data} */}
        {data === "no data" ? "No user data fetched yet." : <Link href={`/profile/${data}`}
        className="ml-4 text-blue-500 hover:underline">Update Profile</Link>}
      </h2>
      <hr />
      <button onClick={logout}
       className="bg-blue-500 mt-4 text-white px-4 py-2 rounded hover:bg-blue-600">
        Sign Out
      </button>

      <button onClick={getUserData}
       className="bg-green-500 mt-4 text-white px-4 py-2 rounded hover:bg-green-600">
        Get User Data
      </button>
    </div>
  );
}