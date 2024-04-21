'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


export default function VerifyEmailPage() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  // Getting token from the url
  useEffect(() => {
    // const urlToken = window.location.search.split("=")[1]
    setError(false)
    const { query }: any = router;
    const urlToken = query?.token;
    setToken(urlToken)
  }, [router])

  // useEffect(() => {
  //   verifyEmail()
  // }, [token])

  const verifyEmail = async () => {
    try {
      await axios.post("/api/user/verifyemail", { token })
      setVerified(true);
      setError(false)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }
  return (
    <div>
      <h1 className='font-bold text-lg '>Verify Email</h1>
      <button onClick={verifyEmail}>Verify</button>
      {verified && (
        <div>
          <h3>Verified</h3>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h3>Error</h3>

        </div>
      )}

    </div>
  )
}


