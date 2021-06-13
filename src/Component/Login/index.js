import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import {
    Link,
    useHistory,
    useLocation
} from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = ({ getUser }) => {
    const [user, setUser] = useState([]);
    const onHandleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    let history = useHistory();
    const onHandleSubmit = (e) => {
        if (user.username.length === 0) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username không được để trống',
                footer: '<a href>Why do I have this issue?</a>'
            })
        } else if (user.password.length === 0) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password không được để trống',
                footer: '<a href>Why do I have this issue?</a>'
            })
        } else {
            e.preventDefault();
            axios
                .post('http://localhost:1337/auth/local', {
                    ideantifier: user.username,
                    password: user.password
                })
                .then(response => {
                    // Handle success.
                    console.log('Well done!');
                    console.log('User profile', response.data.user.username);
                    console.log('User token', response.data.jwt);
                    Swal.fire({
                        icon: 'success',
                        title: 'Congratulations',
                        text: 'Đăng nhập thành công',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                    history.push("/")
                    getUser(user)
                })

                .catch(error => {
                    // Handle error.
                    e.preventDefault();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Username hoặc password không đúng',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                    console.log('An error occurred:', error.response);
                });
        }

    }


    return (
        <div className="container mx-auto mb-20" >
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg" style={{ backgroundImage: 'url("https://source.unsplash.com/K4mSJ7kc0As/600x800")' }} />
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={(e) => onHandleSubmit(e)}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                                    Username
            </label>
                                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="username" type="text" placeholder="Username" onChange={(e) => onHandleChange(e)} />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                    Password
            </label>
                                <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Password" onChange={(e) => onHandleChange(e)} />
                                <p className="text-xs italic text-red-500"></p>
                            </div>
                            <div className="mb-4">
                                <input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                                <label className="text-sm" htmlFor="checkbox_id">
                                    Remember Me
            </label>
                            </div>
                            <div className="mb-6 text-center">
                                <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                                    Sign In
            </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <Link to="/Register" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" >
                                    Create an Account!
            </Link>
                            </div>
                            <div className="text-center">
                                <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="./forgot-password.html">
                                    Forgot Password?
            </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
