import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'


const EditForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [state, setState] = useState({
        err: false,
        errMssge: ""
    })
    const [allState, setAllState] = useState({
        title: "",
        metaTitle: "",
        description: "",
        metaDescription: "",
        image: "",
        imgName: ""

    })
    const takingImageFunction = (event) => {
        setAllState((e) => ({
            ...e, image: event.target.files[0], imgName: event.target.files[0].name
        }))



    }
    const backend_url = "http://localhost:5000/api/"
    const hide = () => {
        setState(e => ({ ...e, err: false }))
    }
    const submit = async () => {
        if (allState.image && allState.title && allState.metaTitle && allState.description && allState.metaDescription && allState.imgName) {
            const formdata = new FormData();
            navigate("/dashboard")
            formdata.append('title', allState.title);
            formdata.append('metaTitle', allState.metaTitle);
            formdata.append('description', allState.description);
            formdata.append('metaDescription', allState.metaDescription);
            formdata.append('imgName', allState.imgName);
            formdata.append('image', allState.image);
            formdata.append('_id', location.state._id)
            const { data } = await axios.post(backend_url + "blog/updateblog", formdata)
            console.log(data)
        }
        else {
            setState((e) => ({
                ...e, err: true, errMssge: "Select Blog Thumbnail"
            }))
            setTimeout(hide, 3000)
        }
    }


    return (
        <>
            <div style={{ display: state.err ? "flex" : "none" }} id="toast-danger" className=" top-2 left-[78%] absolute flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                    </svg>
                    <span className="sr-only">Error icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">{state.errMssge}</div>
                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
            {/* gap after validation err */}

            <div className="relative flex items-center justify-center w-[100%] h-screen">
                <div class="shadow-2xl w-full max-w-lg px-8 pt-6 pb-8 mb-4">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Title
                            </label>
                            <input onChange={(e) => { setAllState(i => ({ ...i, title: e.target.value })) }} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" placeholder="Title of Blog" />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Meta Title
                            </label>
                            <input onChange={(e) => { setAllState(i => ({ ...i, metaTitle: e.target.value })) }} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder="Meta Title" />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Description
                            </label>
                            <input onChange={(e) => { setAllState(i => ({ ...i, description: e.target.value })) }} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" placeholder="Description" />
                            <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                Meta Description
                            </label>
                            <input onChange={(e) => { setAllState(i => ({ ...i, metaDescription: e.target.value })) }} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" placeholder="Meta Des" />
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                select image
                            </label>
                            <button onChange={takingImageFunction} type="button" class="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Choose&nbsp;image
                                <svg class="rtl:rotate-180 w-3 h-3.5 ms-2" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                                <input className="absolute left-0 top-0 w-full pointer opacity-0 h-full" type="file" name="file" accept="image/*" />
                            </button>

                        </div>

                        <button onClick={submit} class="bg-blue-500 hover:bg-blue-700 w-[110px] text-white font-bold mt-6 ml-[20px] px-4 rounded h-[45px]">
                            Update
                        </button>
                    </div>

                </div>
            </div>

        </>
    )
}
export default EditForm