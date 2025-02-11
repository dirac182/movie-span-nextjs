import { create } from "zustand";

const useFormStore = create((set) => ({
    searchTerm: "",
    setSearchTerm: (term) => set((state) => ({searchTerm: term})),
    searchResults: null,
    setSearchResults: (r) => set((state) => ({searchResults: r})),
    selectedMovieId: null,
    setSelectedMovieId: (id) => set((state) => ({selectedMovieId: id})),
    isMovieSelected: false,
    setIsMovieSelected: (bool) => set((state) => ({selectedMovieId: bool})),
    selectedMovieInfo: [],
    setSelectedMovieInfo: (i) => set((state) => ({selectedMovieInfo: i})),
    selectedMovieResults: {},
    setSelectedMovieResults: (i) => set((state) => ({selectedMovieResults: i})),
    IdSearchResults: [],
    setIdSearchResults: (i)=> set((state) => ({searchIdResults: i})),
    clockHr: 7,
    clockMin: 30,
    isPm: true,
    atTheater: true,
    endTime: null,
    setEndTime: (i) => set((state) => ({endTime: i})),
    isLoadingResults: false,
    genreList: [],
    castList: [],
    relatedMoviesList: [],
}))

export default useFormStore