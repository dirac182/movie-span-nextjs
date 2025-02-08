import Image from "next/image";
import Title from "../components/Title";
import Footer from "../components/Footer.js";
import SearchBar from "../components/SearchBar.js";

export default function Home() {
  return (
    <div className="flex flex-col bg-sky-950 min-h-screen">
      <div className="flex-grow flex-col justify-center bg-sky-950 md:p-10">
        <Title />
        <SearchBar/>
      </div>
      <div className="flex justify-end">
      <Footer/>
      </div>
    </div>
  );
}
