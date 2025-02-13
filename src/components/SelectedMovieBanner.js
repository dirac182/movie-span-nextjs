import useFormStore from '../store/form-data.js';
import { MdOutlineCancel } from "react-icons/md";

export default function SelectedMovie () {
    const { isMovieSelected,selectedMovieInfo, clearSelected } = useFormStore.getState();

    const handleRemoveSelected = () => {
        clearSelected();
    }
    
    const obj = isMovieSelected ? 
    <div className="flex text-white items-center bg-gray-700 border-solid border-2 rounded-xl border-orange-500 p-2 w-fit">
            <img style={{width:"55px", height:"85px", borderRadius: "10px"}} src={selectedMovieInfo.image}/>
            <p className="px-2 text-lg font-bold">{selectedMovieInfo.title}</p>
            <p className="pr-2">({selectedMovieInfo.year})</p>
            <div onClick={handleRemoveSelected} className="justify-self-end px-4 hover:text-red-500 text-lg">
                <MdOutlineCancel/>
            </div>
    </div>
    : <div/>

    return(
        <div className="flex justify-center px-6">
            {obj}
        </div>
    )
}   