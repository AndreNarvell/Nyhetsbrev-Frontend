import type { NextPage } from 'next'
import Link from 'next/link'
import axios from 'axios'
import { IUser } from '../models/IUser'
import { ChangeEvent, useState } from 'react'

const Signup: NextPage = () => {
  const [newUser, setNewUser] = useState<IUser>({
    email: '',
    password: '',
    subscription: false,
  })

  const [agree, setAgree] = useState(true)

  const signupUser = async () => {
    await axios.post<IUser>('http://localhost:5000/users', newUser)
  }

  const handleRegister = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleSignUp = () => {
    signupUser()
    alert('Du är nu reggad')
  }

  const handleCheckbox = () => {
    setAgree(!agree)
    setNewUser({ ...newUser, subscription: agree })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="bg-grey-lighter flex min-h-screen flex-col">
        <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
          <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
            <h1 className="mb-8 text-center text-3xl">Sign up</h1>

            <input
              type="text"
              className="border-grey-light mb-4 block w-full rounded border p-3"
              name="email"
              placeholder="Email"
              onChange={handleRegister}
            />

            <input
              type="password"
              className="border-grey-light mb-4 block w-full rounded border p-3"
              name="password"
              placeholder="Password"
              onChange={handleRegister}
            />

            <div className="mb-6 mt-3">
              <div className="md:w-1/3"></div>
              <label className="block font-bold text-gray-500 md:w-2/3">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  onChange={handleCheckbox}
                />
                <span className="text-sm">Send me your newsletter!</span>
              </label>
            </div>

            <button
              className="focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
              type="button"
              onClick={handleSignUp}
            >
              Create Account
            </button>

            <div className="text-grey-dark mt-4 text-center text-sm">
              By signing up, you agree to the{' '}
              <a
                className="border-grey-dark text-grey-dark border-b no-underline"
                href="#"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                className="border-grey-dark text-grey-dark border-b no-underline"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?{' '}
            <Link href={'/'}>
              <a
                className="border-blue text-blue border-b no-underline"
                href="../login/"
              >
                Log in
              </a>
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
