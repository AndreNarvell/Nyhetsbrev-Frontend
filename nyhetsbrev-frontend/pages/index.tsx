import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-8 text-center text-3xl">Very nice log in page yes</h1>
      <form className="w-full max-w-sm">
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
              placeholder="********"
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="focus:shadow-outline mr-5 rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
              type="button"
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
          </div>
        </div>
      </form>
    </div>
  )
}

export default Home
