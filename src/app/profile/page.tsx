'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


const ProfilePage = () => {
    const router = useRouter();
    const [data, setData] = useState("")
    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/user/me")
            setData(response.data.data._id)
        } catch (error: any) {
            return NextResponse.json({ message: error.message }, { status: 401 })

        }
    }
    const logoutUser = async () => {
        try {
            await axios.get("/api/user/logout")
            toast.success('Logged out successfully')
            router.push("/login")


        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <h2>{data.length > 0 ? <Link href={`/profile/${data}`}>{data}</Link> : ""}</h2>

            <button onClick={logoutUser} className='btn bg-blue-500'>Logout</button>
            <button onClick={getUserDetails} className='btn bg-red-500 mx-10'>profile</button>


        </div>
    )
}

export default ProfilePage
