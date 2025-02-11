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
    setClockHr: (i) => set ((state) => ({clockHr: i})),
    clockMin: 30,
    setClockMin: (i) => set ((state) => ({clockMin: i})),
    isPm: true,
    setIsPm: (i) => ((state) => ({isPm: i})),
    atTheater: true,
    setAtTheater: (i) => ((state) => ({atTheater: i})),
    endTime: null,
    setEndTime: (i) => set((state) => ({endTime: i})),
    genreList: [],
    setGenreList: (i) => ((state) => ({setGenreList: i})),
    castList: [],
    setCastList: (i) => ((state) => ({castList: i})),
}))

export default useFormStore