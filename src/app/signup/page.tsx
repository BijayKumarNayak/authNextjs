'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'

const SignupPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSignup = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await axios.post("/api/user/signup", user)
      console.log(response.data)
      router.push("/login")

    } catch (error: any) {
      return toast.error(error.message)

    }

  }
  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)

    } else setButtonDisabled(true)
  }, [user])
  return (
    <div>
      <form action="" onSubmit={onSignup} className='flex flex-col gap-2 w-52 m-auto'>
        <h1>{loading ? "Processing..." : "Signup"}</h1>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} className='text-black p-1 rounded-sm' />

        <label htmlFor="username">Email: </label>
        <input type="email" id="email" name="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} className='text-black p-1 rounded-sm' />

        <label htmlFor="username">Password: </label>
        <input type="text" id="password" name="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} className='text-black p-1 rounded-sm' />

        <button type='submit' className='btn bg-blue-500'>{buttonDisabled ? "No signup" : "Signup"}</button>
      </form>
      <Link href="/login">Login</Link>
    </div>
  )
}

export default SignupPage
