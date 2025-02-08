import { FaGithub } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";

export default function Footer () {

    return (
        <div className="flex-shrink-0 flex text-white justify-between w-full px-2 content-end pt-10 pb-3">
                {/* <a href="https://github.com/dirac182/movie-span" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-orange-500 cursor-pointer" >
                    <p>Project Repo </p>
                    <div className="text-2xl pl-2">
                    </div>
                </a> */}
                <div className="flex flex-col md:flex-row items-center pl-6">
                    <p className="text-sm text-center">Created by dirac182</p>
                    <div className="flex">
                        <a href="https://github.com/dirac182" target="_blank" rel="noopener noreferrer" className="text-2xl pl-1 hover:text-orange-500 cursor-pointer"><FaGithub /></a>
                        <a href="https://linkedin.com/in/dmorin9696" target="_blank" rel="noopener noreferrer" className="text-2xl pl-1 hover:text-orange-500 cursor-pointer"><FaLinkedin/></a>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm md:text-lg text-center">Copyright © 2024 Movie Span</p>
                </div>
                <div className="flex flex-col pr-6">
                    <div className="">
                        <p className="pr-2 align-bottom">Powered By:</p>
                    </div>
                    <div className="flex">
                        <div className="text-2xl md:text-4xl text-red-500"><FaReact/></div>
                        <div className="text-2xl md:text-4xl text-indigo-700"><TbBrandNextjs /></div>
                        <div className="text-2xl md:text-4xl text-yellow-300"><SiJavascript/></div>
                    </div>
                </div>
        </div>
    )
}