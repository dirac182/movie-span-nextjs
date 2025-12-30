import Image from "next/image"
import useFormStore from '../store/form-data.js';
import useSearchMovieId from "@/app/api/searchMovieId.js";
import missingImg from "../../public/missing_img.png"

export default function SearchDropdown({
    title,
    id,
    image,
    year,
}) {
    const releaseYear = year ? `(${year})` : "";
    const {
        setSelectedMovieInfo,
        setSelectedMovieId,
        setIdSearchResults,
    } = useFormStore.getState();
    const imageUrl = image ? image : missingImg;

    const handleMovieClick = async () => {
        console.log("dropdown clicked");
        setSelectedMovieInfo({ title, id, image, year });
        setSelectedMovieId(id);
        const search = await useSearchMovieId(id);
        await setIdSearchResults(search);
    };

    return (
        <div
            onClick={handleMovieClick}
            className="flex flex-col justify-between text-wrap
                text-white items-center h-full bg-gray-700
                border-solid border-2 rounded-xl border-orange-500
                hover:bg-gray-800 cursor-pointer md:p-2
                w-40 md:w-48 lg:w-60 p-4 text-center"
                
        >
            <Image
                alt="movie poster"
                style={{ borderRadius: "10px" }}
                width={300}
                height={450}
                src={imageUrl}
            />
            <p className="px-2 w-full md:text-lg text-sm font-bold ">{title}</p>
            <p className="pr-2">{releaseYear}</p>
        </div>
    );
}