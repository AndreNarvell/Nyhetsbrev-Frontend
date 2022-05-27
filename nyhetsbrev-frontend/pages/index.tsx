import type { NextPage } from 'next'
import Link from 'next/link'
import axios from 'axios'
import { IUser } from '../models/IUser'
import { ChangeEvent, useEffect, useState } from 'react'
import { ILogin } from '../models/ILogin'
import { SubmitHandler, useForm } from 'react-hook-form'

const Home: NextPage = () => {
  const [failure, setFailure] = useState<any>('')
  const [changesSub, setChangedSub] = useState<any>('')
  const [user, setUser] = useState<ILogin>({
    email: '',
    password: '',
  })

  const [loggedIn, setLoggedIn] = useState(false)
  const [checkbox, setCheckbox] = useState(false)

  const [subUser, setSubUser] = useState({
    userId: '',
    subscription: !checkbox,
  })

  // const headers = {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  //   withCredentials: true,
  //   credentials: 'include',
  // }

  const signinUser = async () => {
    await axios
      .post('https://nyhetsbrev-back-end.azurewebsites.net/users/login', user, {
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
      })
      .then((res) => {
        if (res.data == 'Failure') {
          setFailure(<p>Fel användarnamn eller lösenord</p>)
        } else {
          localStorage.setItem('user', JSON.stringify(res.data.userPost.userId))
          setFailure('')
          setLoggedIn(true)
          setCheckbox(res.data.userPost.subscription)
          setSubUser({ ...subUser, userId: res.data.userPost.userId })
          console.log(res.data.userPost.subscription)
        }
      })
  }

  // const signinUser = async () => {
  //   console.log('körs')

  //   const response = await fetch('http://localhost:5000/users/login', {
  //     method: 'POST',
  //     body: JSON.stringify(user),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       credentials: 'include',
  //     },
  //   })
  //   setLoggedIn(true)

  //   const result = await response.json()
  //   console.log(result)
  // }

  const updateSub = async () => {
    await axios
      .put(
        'https://nyhetsbrev-back-end.azurewebsites.net/users/change',
        subUser
      )
      .then((res) => {
        console.log(res)
      })
    console.log(checkbox)
    setChangedSub(<p>Subscription status changed!</p>)
  }

  const handleChecked = () => {
    setCheckbox(!checkbox)
    setSubUser({ ...subUser, subscription: !checkbox })
    // setChangedSub(<p>Subscription status changed!</p>)

    setTimeout(() => {
      setChangedSub('')

      console.log(!checkbox)
    }, 3000)
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    signinUser()
  }

  const handleLogout = () => {
    localStorage.clear()
    setLoggedIn(false)
  }

  const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  // const getLoggedInUser = async (userId: string) => {
  //   await axios.get(`http://localhost:5000/users/${userId}`).then((res) => {
  //     console.log(res)
  //   })

  // }

  useEffect(() => {
    if (localStorage.getItem('user') || '') {
      // getLoggedInUser(localStorage.getItem('user') as string)
      setLoggedIn(true)
    }
  }, [])

  return (
    <>
      {!loggedIn && (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <h1 className="mb-8 text-center text-3xl">
            Very nice log in page yes
          </h1>
          <form className="w-full max-w-sm" onSubmit={handleClick}>
            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                  id="inline-full-name"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  onChange={handleLogin}
                />
              </div>
            </div>
            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                  id="inline-password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  required
                  onChange={handleLogin}
                />
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="focus:shadow-outline mr-5 rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
                  type="submit"
                  // onClick={handleClick}
                >
                  Log in
                </button>
                <Link href={'/signup'}>
                  <button
                    className="focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
                    type="button"
                  >
                    Sign up
                  </button>
                </Link>
                {failure}
              </div>
            </div>
          </form>
        </div>
      )}
      {loggedIn && (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <h1 className="mb-5 text-9xl">😋</h1>
          <h1 className="mb-8 text-center text-3xl">
            Welcome user with ID: <br /> {localStorage.getItem('user')}
          </h1>

          <p className="text-l mb-5 text-center">
            Would you like to change your subscription status?
          </p>
          <form
            action="submit"
            className="flex w-full max-w-sm flex-col items-center justify-center "
          >
            <input
              type="checkbox"
              className="h-6 w-6  rounded-md border-0 focus:ring-0"
              onChange={handleChecked}
              checked={checkbox}
            />

            <br />
            <button
              type="button"
              onClick={updateSub}
              className="focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
            >
              Save
            </button>
            {changesSub}
          </form>
          <Link href={'/'}>
            <button
              className="focus:shadow-outline mt-5 rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </Link>
        </div>
      )}
    </>
  )
}

export default Home
