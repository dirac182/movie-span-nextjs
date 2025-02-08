'use client'
import { useEffect } from "react";
import useFormStore from "../store/form-data.js";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import useSearchMovies from "../api/searchMovie.js";



export default function SearchBar (){
 
    const { searchTerm, setSearchTerm } = useFormStore();
    
    const handleClearSearchTerm = () => {
            setSearchTerm('')
        }
    const clearSearchTermButton = <span onClick={handleClearSearchTerm} className="flex items-center text-white text-lg bg-gray-700 border-solid border-2 border-r-0 border-l-0 border-orange-500 cursor-pointer"><MdOutlineCancel/></span>

    const handleSearchButton = (event) => {
        event.preventDefault();
        console.log(searchTerm)
        if(searchTerm.length >= 2){
            useSearchMovies();
        }else{
            console.log("Term too short")
        }
        
    } 

    return (
        <form onSubmit={handleSearchButton}>
            <div className=" pt-5 md:flex md:flex-col justify-center items-center">
            <div className="flex justify-center p-5 md:w-3/5">
                <input 
                placeholder="Enter Movie Name"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="bg-gray-700 border-2 border-r-0 border-orange-500 rounded-l-lg h-10 text-white w-3/5 p-1" />
                {searchTerm && clearSearchTermButton}
                <div onClick={handleSearchButton} className="px-3 bg-gray-700 flex items-center text-white border-2 rounded-r-lg border-l-0 border-orange-500 hover:bg-orange-500">
                    <FaSearch/>
                </div>
            </div>
        </div>
        </form>
    )
}