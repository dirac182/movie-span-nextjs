import Title from "../components/Title";
import Footer from "../components/Footer.js";
import SearchBar from "../components/SearchBar.js";
import SearchForm from "../components/SearchForm.js"
import SearchResults from "../components/SearchResults.js";

export default function Home() {
  
  return (
    <div className="flex flex-col bg-sky-950 min-h-screen">
      <div className="flex-grow flex-col justify-center bg-sky-950 md:p-10">
        <Title />
        <SearchBar/>
        <SearchForm/>
        <SearchResults/>
      </div>
      <div className="flex justify-end">
      <Footer/>
      </div>
    </div>
  );
}
