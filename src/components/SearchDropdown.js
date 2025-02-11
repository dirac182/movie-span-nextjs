import Image from "next/image"
import useFormStore from '../store/form-data.js';
import useSearchMovieId from "@/api/searchMovieId.js";

export default function SearchDropdown({title, id, image, year}) {
    const releaseYear = year ? `(${year})`: ""
    const { setSelectedMovieInfo,  setSelectedMovieId, setIsMovieSelected } = useFormStore.getState();
    
    const handleMovieClick = () => {
        console.log("dropdown clicked")
        setSelectedMovieInfo({title,id,image,year})
        setSelectedMovieId(id)
        useSearchMovieId()
        setIsMovieSelected(true)
    }

    return(
        <div onClick={handleMovieClick} className="flex text-white items-center bg-gray-700 border-solid border-2 rounded-xl border-orange-500 hover:bg-gray-800 cursor-pointer md:w-fill md:p-2">
            <Image alt="movie poster" style={{borderRadius: "10px"}} 
                width={55}
                height={85} 
                src={image}/>
            <p className="px-2 text-lg font-bold">{title}</p>
            <p className="pr-2">{releaseYear}</p>
        </div>
    )
}