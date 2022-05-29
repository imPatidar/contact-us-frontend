import React, {useState} from "react";
import {useNavigate} from "react-router";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config/config";

export default function ContactUs() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        user_name: "",
        password: ""
    });

    const notify = (message) => toast(message);

    const [error, setError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        try {
            if (!formData.user_name || !formData.password) {
                notify("Please provide email and password")
            } else {
                let data = await fetch(`${config.appURL}/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                let response = await data.json();

                if (response.success === true) {
                    setError(false)
                    localStorage.setItem("token", response.token);
                    navigate("/dashboard")
                } else {
                    setError(true);
                    notify("Invalid Credentials")
                }
            }
        } catch (error) {
            notify("Please try after some time")
            setError(true);
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const navigatePath = () => {
        navigate("/")
    }

    return (
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <div className="text-right mb-5">
                            <button type="button"
                                    onClick={() => {
                                        navigatePath()
                                    }}
                                    className="text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-600 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 mr-2 mb-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="ml-4 font-sans">Go Back to Form</span>
                            </button>
                        </div>
                        <h1 className="text-2xl mb-6 font-bold text-center text-gray-800">
                            Contact Us Admin
                        </h1>
                        <h6 className="mb-6 text-center text-gray-500">
                            Email: admin@admin.com <br/>
                            Password: admin
                        </h6>
                        <form>
                            <div className="mb-6">
                                <input
                                    name="user_name"
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    name="password"
                                    type="password"
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={(e) => {
                                    handleSubmit(e)
                                }}
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Sign in
                            </button>

                            {/*    Error Invalid Login*/}
                            {
                                error &&
                                <div className="text-center text-red-500 mt-2 text-sm">
                                    Invalid Login! Please enter correct email and password or contact admin.
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </section>
    );
}