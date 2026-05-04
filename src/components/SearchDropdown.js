import Image from "next/image"
import useFormStore from '../store/form-data.js';
import useSearchMovieId from "@/app/api/searchMovieId.js";
import missingImg from "../../public/missing_img.png"

export default function SearchDropdown({title, id, image, year}) {
    const releaseYear = year ? `(${year.slice(0,4)})`: ""
    const { setSelectedMovieInfo,  setSelectedMovieId, setIdSearchResults } = useFormStore.getState();
    const imageUrl = image ? image : missingImg
    
    const handleMovieClick = async () => {
        try{
            console.log("requesting movie id:", id);
            setSelectedMovieInfo({title,id,image,year})
            setSelectedMovieId(id)
            const res = await fetch(`/api/movies/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch movie data.")
            }
            const data = await res.json()
            setIdSearchResults(data.movie)
        }catch (error) {
            console.error("Movie fetch error:", error)
        }
    };

    return(
        <div onClick={handleMovieClick} className="flex flex-col text-white items-center bg-gray-700 border-solid border-2 rounded-xl border-orange-500 hover:bg-gray-800 cursor-pointer md:w-fill p-2">
            <Image alt="movie poster" style={{borderRadius: "10px"}} 
                width={150}
                height={85} 
                src={imageUrl}/>
            <p className="px-2 text-lg font-bold">{title}</p>
            <p className="pr-2">{releaseYear}</p>
        </div>
    )
}   