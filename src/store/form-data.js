import { create } from "zustand";

const useFormStore = create((set) => ({
    searchTerm: "",
    setSearchTerm: (term) => set((state) => ({searchTerm: term})),
    searchResults: null,
    setSearchResults: (r) => set((state) => ({searchResults: r})),
    selectedMovieId: null,
    setSelectedMovieId: (id) => set((state) => ({selectedMovieId: id})),
    isMovieSelected: false,
    setIsMovieSelected: (bool) => set((state) => ({isMovieSelected: bool})),
    selectedMovieInfo: [],
    setSelectedMovieInfo: (i) => set((state) => ({selectedMovieInfo: i, isMovieSelected: true, searchResults: null})),
    selectedMovieResults: {},
    setSelectedMovieResults: (i) => set((state) => ({selectedMovieResults: i})),
    IdSearchResults: null,
    setIdSearchResults: (i)=> set((state) => ({IdSearchResults: i})),
    clockHr: 7,
    setClockHr: (i) => set ((state) => ({clockHr: i})),
    clockMin: 30,
    setClockMin: (i) => set ((state) => ({clockMin: i})),
    isPm: true,
    setIsPm: (i) => set((state) => ({isPm: i})),
    atTheater: true,
    setAtTheater: (bool) => set((state) => ({atTheater: bool})),
    endTime: null,
    setEndTime: (i) => set((state) => ({endTime: i})),
    clearSelected: (i) => set((state) => ({selectedMovieInfo: [], selectedMovieId: null, isMovieSelected: false, searchTerm: "", endTime: null, endTime: null, IdSearchResults: null})),
    clearSearch: (i) => set((state) => ({searchResults: null, searchTerm: ""})),
}))

export default useFormStore