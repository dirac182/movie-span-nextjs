import { create } from "zustand";

const useFormStore = create((set) => ({
    searchTerm: "",
    setSearchTerm: (term) => set(() => ({searchTerm: term})),
    searchResults: null,
    setSearchResults: (r) => set(() => ({searchResults: r})),
    selectedMovieId: null,
    setSelectedMovieId: (id) => set(() => ({selectedMovieId: id})),
    isMovieSelected: false,
    setIsMovieSelected: (bool) => set(() => ({isMovieSelected: bool})),
    selectedMovieInfo: [],
    setSelectedMovieInfo: (i) => set(() => ({selectedMovieInfo: i, isMovieSelected: true, searchResults: null})),
    selectedMovieResults: {},
    setSelectedMovieResults: (i) => set(() => ({selectedMovieResults: i})),
    IdSearchResults: null,
    setIdSearchResults: (i)=> set(() => ({IdSearchResults: i})),
    clockHr: 7,
    setClockHr: (i) => set (() => ({clockHr: i})),
    clockMin: 30,
    setClockMin: (i) => set (() => ({clockMin: i})),
    isPm: true,
    setIsPm: (i) => set(() => ({isPm: i})),
    atTheater: true,
    setAtTheater: (bool) => set(() => ({atTheater: bool})),
    endTime: null,
    setEndTime: (i) => set(() => ({endTime: i})),
    clearSelected: () => set(() => ({selectedMovieInfo: [], selectedMovieId: null, isMovieSelected: false, searchTerm: "", endTime: null, endTime: null, IdSearchResults: null})),
    clearSearch: () => set(() => ({searchResults: null, searchTerm: ""})),
    isTwelveHr: true,
    setIsTwelveHr: (i) => set(() => ({isTwelveHr: i}))
}))

export default useFormStore