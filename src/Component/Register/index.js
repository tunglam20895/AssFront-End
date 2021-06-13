import React, { useState } from 'react'
import axios from 'axios'
import {
    useHistory
} from "react-router-dom";
import Swal from "sweetalert2"
import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit, errors } = useForm();
    let history = useHistory();
    const onSubmit = (data) => {
        console.log(data)
        axios
            .post('http://localhost:1337/auth/local/register', {
                username: data.username,
                email: data.email,
                password: data.password,
            })
            .then(response => {
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations',
                    text: 'Đăng ký thành công',
                    footer: '<a href>Why do I have this issue?</a>'
                })
                history.push("/login")
            })
            .catch(error => {
                // Handle error.              
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'username hoặc email đã tồn tại',
                    footer: '<a href>Why do I have this issue?</a>'
                })
                console.log('An error occurred:', error.response);
            });
    }
    return (

        <div className="container mx-auto mb-20">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg" style={{ backgroundImage: 'url("https://source.unsplash.com/Mv9hjnEUHR4/600x800")' }} />
                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                    Email
            </label>
                                <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="email" type="email" ref={register({ required: true, maxLength: 50 })} />
                                {errors.email && <p className="text-red-500">Email không được để trống</p>}
                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Username
              </label>
                                    <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="username" type="text" ref={register({ required: true, maxLength: 50 })} />
                                    {errors.username && <p className="text-red-500">Username không được để trống</p>}
                                    <p className="text-xs italic text-red-500"></p>
                                </div>
                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                                        Password
              </label>
                                    <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="password" type="password" ref={register({ required: true, maxLength: 50 })} />
                                    {errors.password && <p className="text-red-500">Password không được để trống</p>}
                                </div>
                            </div>
                            <div className="mb-6 text-center">
                                <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                                    Register Account
            </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
                                    Forgot Password?
            </a>
                            </div>
                            <div className="text-center">
                                <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="./index.html">
                                    Already have an account? Login!
            </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
