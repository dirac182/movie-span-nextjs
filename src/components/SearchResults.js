"use client"
import { useEffect, useState } from "react"
import { Watch } from "react-loader-spinner"
import { FaImdb } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useSpring, animated } from "react-spring";
import useFormStore from '../store/form-data.js';

export default function SearchResults() {
    const {  atTheater,IdSearchResults ,isMovieSelected, selectedMovieResults,clockHr, clockMin,isPm,isAtTheater,endTime,selectedMovieId,setEndTime, setSelectedMovieResults, setResultLists} = useFormStore();
    const [accordionIsOpen, setAccordionIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const trailerTime = 22; //minutes

    const toggleAccordion = () => {
        setAccordionIsOpen(!accordionIsOpen)
    }

    const openAnimation = useSpring({
        from: { opacity: "0", maxHeight: "0px" },
        to: { opacity: "1", maxHeight: accordionIsOpen ? "1000px" : "0px" },
        config: { duration: "300" }
      });

    const iconAnimation = useSpring({
    from: {
        transform: "rotate(0deg)",
    },
    to: {
        transform: accordionIsOpen ? "rotate(45deg)" : "rotate(0deg)",
    },
    config: { duration: "120" }
    });

    useEffect(() => {
        if (isMovieSelected && !IdSearchResults){
            setIsLoading(true);
        }
        if (IdSearchResults){
            const timeToAdd = IdSearchResults.runtime;
            const amPm = isPm ? "PM" : "AM"
            const newTime = new Date(`01/01/2001 ${parseInt(clockHr)}:${parseInt(clockMin)} ${amPm}`)
            if (atTheater){
                const newSeconds = parseInt(timeToAdd) + (trailerTime*60)
                newTime.setSeconds(newTime.getSeconds() + newSeconds)
            }else{
                newTime.setSeconds(newTime.getSeconds() + timeToAdd)
            }
            const options = { hour: 'numeric', minute: '2-digit', hour12: true };
            const newTimeString = newTime.toLocaleTimeString('en-US', options);
            setEndTime(newTimeString)
            setIsLoading(false)
        }
    },[clockHr,clockMin, isPm, atTheater, IdSearchResults, isMovieSelected])

    const endTimeDiv =  <div className="text-center p-5 md:w-2/5">
        <p className="font-bold text-white text-3xl border-dotted border-8 border-orange-500 p-2 ">Your movie will end around {endTime}</p> 
    </div>

    const accordionButtonString = accordionIsOpen ? "Hide Movie Details" : "Show Movie Details"

    const accordionDiv = IdSearchResults ? 
    <div className={`md:w-4/5 border-white pb-6 ${accordionIsOpen ? 'border-t-2' : 'border-t'}`}>
        <animated.div className={"overflow-hidden"} style={openAnimation}>
                <div className={`grid text-center p-5  transition-all duration-300 ease-out ${accordionIsOpen ? 'grid-rows-1 opacity-100 ' : 'grid-rows-none opacity-0'}`}>
                    <a className="font-bold text-orange-500 text-4xl hover:underline" href={`https://www.imdb.com/title/${IdSearchResults.movieId}`} target="_blank" rel="noopener noreferrer">{IdSearchResults.name}</a>
                    <p className="text-white text-md md:text-xl pb-3">Directed by <a className="hover:underline" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${IdSearchResults.directorId}`}>{IdSearchResults.director}</a> </p>
                    <div className="flex justify-center px-2">
                        <div className="flex text-3xl text-yellow-500 self-center"><FaImdb/><p className="text-white text-sm md:text-lg self-center">Rating: {IdSearchResults.rating}/10</p></div>
                        <div className="flex flex-wrap justify-center content-center px-5">
                            {IdSearchResults.genreList.map((genre)=> { return <div className="text-white text-xs md:text-sm bg-gray-700 border-solid border-2 border-orange-500 rounded-lg mx-1 p-0.5 h-min self-center" key={genre.genre.text}>{genre.genre.text}</div> })}
                        </div>
                        <p className="text-white text-sm md:text-lg self-center">Runtime: {IdSearchResults.runtimeString}</p>
                    </div>
                    <p className="text-white text-sm md:text-lg pt-2">{IdSearchResults.plotText}</p>
                    <p className="text-white text-lg md:text-xl pt-2">Main Cast</p>
                    <div className="flex flex-wrap justify-center">
                        {IdSearchResults.castList.map((cast,index)=> {const charName = cast.node.characters ? cast.node.characters[0].name : "N/A"; const imageLink = cast.node.name.primaryImage ? cast.node.name.primaryImage.url : "../images/no-image.jpg" ; return <a key={index} target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${cast.node.name.id}`}><div className="text-white text-xs bg-gray-700 border-solid border-2 border-orange-500 rounded-lg m-1 p-0.5" key={cast.node.name.id}><div className="flex justify-center "><img alt="Cast memeber" style={{width:"auto", height:"100px", borderRadius: "10px"}} src={imageLink}/></div><p>{cast.node.name.nameText.text} <br/> as {charName}</p></div></a> })}
                    </div>
                </div>
            </animated.div>
        <animated.div style={openAnimation}>
            <div className={`flex justify-center border-t-2 border-white ${accordionIsOpen ? 'border-t-2' : 'border-t'}`}>
                <button onClick={toggleAccordion} className="flex justify-center text-white bg-sky-950 border-x-2 border-b-2 rounded-b-full px-2 text-xl font-bold hover:bg-orange-500"><animated.i style={iconAnimation}><IoMdAdd /></animated.i>{accordionButtonString}<animated.i style={iconAnimation}><IoMdAdd /></animated.i></button>
            </div>
        </animated.div>
    </div> : null
    
 const spinnerDiv = <div className="flex justify-center"><Watch color="#f97316"/></div>
      
   return(
        <div>
            <div className="flex justify-center">
                {isMovieSelected && isLoading && spinnerDiv}
                {isMovieSelected &&!isLoading && endTimeDiv}
            </div>
            <div className="flex justify-center">
                {isMovieSelected && !isLoading && accordionDiv}
            </div>
        </div>
    )
}