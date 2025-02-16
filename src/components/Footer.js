import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";


export default function Footer () {

    return (
        <div className="flex-shrink-0 flex text-white justify-between w-full px-2 content-end pt-10 pb-3">
                
                <div className="flex flex-col items-center">
                    <p className="text-sm md:text-lg px-2 text-center">Copyright © 2025 Movie Span</p>
                </div>
                <div className="flex flex-col md:flex-row items-center pr-6">
                    <p className="text-sm md:text-lg text-center">Created by dirac182</p>
                    <div className="flex">
                        <a href="https://github.com/dirac182" target="_blank" rel="noopener noreferrer" className="text-2xl pl-1 hover:text-orange-500 cursor-pointer"><FaGithub /></a>
                        <a href="https://linkedin.com/in/dmorin9696" target="_blank" rel="noopener noreferrer" className="text-2xl pl-1 hover:text-orange-500 cursor-pointer"><FaLinkedin/></a>
                    </div>
                </div>
        </div>
    )
}