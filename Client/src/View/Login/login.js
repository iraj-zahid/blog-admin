import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Login = () => {

  const [signupData, setSignupData] = useState([])
  const navigate = useNavigate()
  const [allState, setAllState] = useState({
    email: "",
    password: "",
    error: false,
    errMssge: "",
  })
  const backend_url = "http://localhost:5000/api/"
  const fetchData = async () => {
    const { data } = await axios.get(backend_url + "auth/signup")
    setSignupData(data)

  }
  useEffect(() => {
    (fetchData())
  }, [])
  const filter = signupData.filter((e) => {
    if (e.email === allState.email && e.password === allState.password) {
      localStorage.setItem('currentUser', JSON.stringify({ email: e.email, password: e.password }))

      return e
    }
  })
  const hide = () => {
    setAllState(e => ({ ...e, error: false }))
  }
  const PrevUserData = JSON.parse(localStorage.getItem("currentUser"))

  const submit = () => {
    if (filter.length > 0) {
      localStorage.setItem('isAuthenticated', JSON.stringify({ isAuthenticated: true }))

      navigate("/")
    }

    else {
      setAllState(e => ({ ...e, error: true }))
      setAllState(e => ({ ...e, errMssge: "Something went wrong" }))
      setTimeout(hide, 3000)
    }
  }
  return (
    <>
      <div className="relative flex items-center justify-center w-[100%] h-screen">
        <div style={{ display: allState.error ? "flex" : "none" }} id="toast-danger" className=" top-2 left-[78%] absolute flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{allState.errMssge}</div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
        {/* gap here after err box  */}
        <div className="w-full max-w-xs">

          <form className="shadow-2xl bg-white rounded px-8 pt-6 pb-8 mb-4">

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" placeholder="Email" onChange={(e) => { setAllState(i => ({ ...i, email: e.target.value })) }} />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="******************" onChange={(e) => { setAllState(i => ({ ...i, password: e.target.value })) }} />
            </div>
            <div className="flex items-center justify-between">
              <button onClick={submit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Log In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Forgot Password?
              </a>
            </div>
          </form>

        </div>
      </div>

    </>
  )
}
export default Login