import { useEffect } from 'react';
import { useFormStore } from '../stores/formStore';

const { searchTerm, setSearchResults } = useFormStore();

const searchMovie = async (searchTerm) => {
    const response = await fetch(`https://www.ph-zyx.com/search?searchTerm=${searchTerm}`);
    const data = await response.json();
    return data;
};

const useSearchMovies = () => {

    useEffect(() => {
        if (searchTerm) {
            searchMovie(searchTerm).then(setSearchResults);
        }
    }, [searchTerm, setSearchResults]);
};

export default useSearchMovies;
