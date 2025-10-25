import Image from "next/image"
import useFormStore from '../store/form-data.js';
import useSearchMovieId from "@/app/api/searchMovieId.js";
import missingImg from "../../public/missing_img.png"

export default function SearchDropdown({title, id, image, year}) {
    const releaseYear = year ? `(${year})`: ""
    const { setSelectedMovieInfo,  setSelectedMovieId, setIdSearchResults } = useFormStore.getState();
    const imageUrl = image ? image : missingImg
    
    const handleMovieClick = async () => {
        console.log("dropdown clicked")
        setSelectedMovieInfo({title,id,image,year})
        setSelectedMovieId(id)
        const search = await useSearchMovieId(id)
        await setIdSearchResults(search)
    }

    return(
        <div onClick={handleMovieClick} className="flex text-white items-center bg-gray-700 border-solid border-2 rounded-xl border-orange-500 hover:bg-gray-800 cursor-pointer md:w-fill md:p-2">
            <Image alt="movie poster" style={{borderRadius: "10px"}} 
                width={55}
                height={85} 
                src={imageUrl}/>
            <p className="px-2 text-lg font-bold">{title}</p>
            <p className="pr-2">{releaseYear}</p>
        </div>
    )
}