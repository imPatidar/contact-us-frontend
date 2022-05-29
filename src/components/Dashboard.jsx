import React, {useEffect, useState} from "react";
import moment from "moment";
import config from "../config/config";
import {useNavigate} from "react-router";

export default function Dashboard() {

    const [data, setData] = useState([]);
    const navigate = useNavigate()

    async function fetchData() {
        let data = await fetch(`${config.appURL}/contact-us/getContactDetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        let response = await data.json();
        setData(response.data)
    }

    useEffect(() => {
        //Fetch data on load
        fetchData();
    }, []);
  return (
    <div>
        <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">

                <div className="w-full lg:w-5/6">
                    <h2 className="text-3xl lg:text-4xl font-bold leading-tight">What's in the box!</h2>

                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Message ID</th>
                                <th className="py-3 px-6 text-left">Message By</th>
                                <th className="py-3 px-6 text-center">Email</th>
                                <th className="py-3 px-6 text-center">Message Body</th>
                                <th className="py-3 px-6 text-center">Message Sent date</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                            {
                                data && data.map(data =>
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={data.id}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="font-medium">{"MSG"+data.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <span>{data.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                {data.email}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {data.message}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <button type="button"
                                onClick={() => {
                                    localStorage.clear();
                                    navigate('/');
                                }}
                                className="text-gray-600 mt-3 ml-3 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-600 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 mr-2 mb-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
                            </svg>
                            <span className="ml-4 font-sans">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}