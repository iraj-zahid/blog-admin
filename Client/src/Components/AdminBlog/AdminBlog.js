import axios from 'axios'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { RiDeleteBin4Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const AdminBlog = () => {
    const navigate = useNavigate()
    const [blogdata, setBlogdata] = useState()
    const [allState, setAllState] = useState({
        title: "",
        metaTitle: "",
        description: "",
        metaDescription: ""
    })
    const backend_url = "http://localhost:5000/api/"
    const fetchData = async () => {
        const { data } = await axios.get(backend_url + "blog/getblog")
        setBlogdata(data.data)
    }
    const dltData = async (e) => {
        console.log(e);

        const formdata = new FormData()
        formdata.append('data', e)
        const { data } = await axios.post(backend_url + "blog/dltblog", {
            _id: e,
        })
        fetchData()

    }
    useEffect(() => {
        (fetchData())
    }, [])
    const dlt = async (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your blog has been deleted.",
                    icon: "success"
                });
                dltData(e._id)

            }
        });
    }


    const edit = async (e) => {
        navigate("/EditForm", { state: e })

    }

    return (
        <>
            <div className="sm:ml-64 p-[30px] ">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto max-h-[550px]">
                    <h2 className='text-3xl text-bold p-8'>MANAGE BLOGS</h2>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 truncate">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Title
                                </th>

                                <th scope="col" class="px-6 py-3">
                                    Meta Title
                                </th>

                                <th scope="col" class="flex justify-end px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogdata && blogdata.map((e) => {
                                return (<>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 truncate">
                                        <th scope="row" class="max-w-[400px] truncate text-ellipsis border-r px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {e.title}
                                        </th>
                                        <td class="overflow-hidden max-w-[400px] truncate px-6 py-4">
                                            {e.metaTitle}
                                        </td>
                                        <td class=" relative overflow-hide px-6 py-4 flex justify-end">
                                            < RiDeleteBin4Line style={{ color: "red", fontSize: '20px', marginLeft: "4px", cursor: "pointer" }} onClick={() => { dlt(e) }} />
                                            <MdOutlineEdit style={{ color: "blue", fontSize: '20px', marginLeft: "8px", cursor: "pointer" }} onClick={() => { edit(e) }} />
                                        </td>
                                    </tr>
                                </>)
                            })}



                        </tbody>
                    </table>
                </div>
            </div>



        </>
    )
}
export default AdminBlog;