import React from 'react'
import ProductsChild from '../ProductChild'
import Search from '../Search'
import DropDown from '../DropDown'
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

const index = ({ listProduct, onHandleSearch, PriceUp, PriceDown, getValue }) => {
    return (
        <div>
            <section className="bg-white py-8">
                <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                    <nav className="w-full z-30 top-0 px-6 py-1">
                        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                            <Link className=" uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl" to="/"> Store </Link>
                            <DropDown getValue={getValue} /><Link to="/" className="mr-12" onClick={PriceUp}><AiFillCaretUp />Price Up</Link>
                            <Link to="/" className="mr-12" onClick={PriceDown}><AiFillCaretDown />Price Down</Link>
                            <Search onHandleChange={onHandleSearch} />
                        </div>
                    </nav>
                    {listProduct.map((product, index) => (
                        <ProductsChild key={index} product={product} />
                    ))}
                </div>
            </section>

        </div>
    )
}

export default index
