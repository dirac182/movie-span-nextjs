import { create } from "zustand";

const useFormStore = create((set) => ({
    searchTerm: "",
    setSearchTerm: (term) => set((state) => ({searchTerm: term})),
    searchResults: [],
    setSearchResults: (r) => set((state) => ({searchResults: [r]})),
    selectedMovieId: null,
    setSelectedMovieId: (id) => set((state) => ({selectedMovieId: [id]})),
    isMovieSelected: false,
    setIsMovieSelected: () => set((state) => ({selectedMovieId: !isMovieSelected})),
    selectedMovieInfo: [],
    selectedMovieResults: {},
    clockHr: 7,
    clockMin: 30,
    isPm: true,
    atTheater: true,
    endTime: null,
    isLoadingSearch: false,
    isLoadingResults: false,
    genreList: [],
    castList: [],
    relatedMoviesList: [],
}))

export default useFormStore