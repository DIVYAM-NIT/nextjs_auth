"use client"
import Link from "next/link"
import React,{useEffect} from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
export default function SignupPage(){
    const router = useRouter();
    
    const [user,setUser] = React.useState({
        username:"",
        email:"",        
        password:""
    })
    const  [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const onSignup = async ()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup success",response.data);
            router.push("/login");

        }catch(error:any){
            console.log("Signup failed",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.username.length>0 && user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                {
                    loading? "Processing...":"Signup"
                }
            </h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="border-2 border-gray-300 p-2 rounded-md mb-4"
             type="text" name="username" id="username" value={user.username} placeholder="username"
            onChange={(e)=>setUser({...user,username:e.target.value})} />

            <label htmlFor="email">email</label>
            <input className="border-2 border-gray-300 p-2 rounded-md mb-4"
             type="email" name="email" id="email" value={user.email} placeholder="email"
            onChange={(e)=>setUser({...user,email:e.target.value})} />
            
            <label htmlFor="password">password</label>
            <input className="border-2 border-gray-300 p-2 rounded-md mb-4"
             type="password" name="password" id="password" value={user.password} placeholder="password"
            onChange={(e)=>setUser({...user,password:e.target.value})} />
            <button type="button" className="bg-blue-500 text-white p-2 rounded-md mb-4"
             onClick={onSignup}>{buttonDisabled? "No Signup":"Signup"}</button>
            <Link className="text-blue-500" href="/login">Already have an account? Login</Link>
            
        </div>
    )
}