'use client'
import { useState, useEffect } from "react";
import useFormStore from "../store/form-data.js";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import useSearchMovies from "../app/api/searchMovie.js";
import SearchDropdown from "./SearchDropdown.js"
import { ThreeCircles } from "react-loader-spinner";
import SelectedMovieBanner from "./SelectedMovieBanner.js";


export default function SearchBar (){
 
    const { searchTerm, setSearchTerm, searchResults, clearSearch, setSearchResults } = useFormStore();
    const [noResults, setNoResults] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    
    const handleClearSearchTerm = () => {
            clearSearch();
            setIsSearchClicked(false);
        }

    const handleSearchButton = async (event) => {
        event.preventDefault();
        if(searchTerm.length >= 2){
            setIsSearchClicked(true)
            const movieList = await useSearchMovies(searchTerm);
            
            await setSearchResults(movieList);
            
        }
    } 

    useEffect(() => {
        if (isSearchClicked && isLoading === false && searchResults){
            if (searchResults.length === 0){
                setNoResults(true)
                setIsLoading(false)
            }
        }else{
            setNoResults(false)
        }
        if(isSearchClicked && searchResults == null){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }
    },[searchResults, isSearchClicked, isLoading, noResults])

    const searchDropdown = searchResults ? searchResults.map((movie,index) => {
        return <div key={movie.id || index} className="p-1 md:w-fill"><SearchDropdown title={movie.title} id={movie.id} image={movie.image} year={movie.releaseDate}/></div>
    })
    : null;

    const clearSearchTermButton = <span onClick={handleClearSearchTerm} className="flex items-center text-white text-lg bg-gray-700 border-solid border-2 border-r-0 border-l-0 border-orange-500 cursor-pointer"><MdOutlineCancel/></span>


    const selectedMovieBanner = <SelectedMovieBanner/>

    const spinnerDiv = <div className="flex justify-center"><ThreeCircles color="#f97316"/></div>

    const noResultsDiv =<div><p className="text-white">There were no matches to your search</p></div>


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
                
                    <div onClick={handleClearSearchTerm} className="flex flex-col px-6 md:w-4/5 md:flex-row md:flex-wrap justify-center">
                        {!isLoading && searchDropdown}
                        {isLoading && spinnerDiv}
                        {noResults && noResultsDiv}
                    </div>
                    <div>
                        {selectedMovieBanner}
                    </div>
                </div>
            </form>
            

        
    )
}