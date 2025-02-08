import Image from "next/image";

export default function Title () {

    return (
        <div className="flex flex-col px-5">
            <div className="flex flex-col lg:flex-row items-center justify-center">
                {/* <img className="h-2/5 w-2/5 md:h-1/5 md:w-1/5 lg:h-1/12 lg:w-1/12 " src={timerLogo}/> */}
                <Image
                    src="/timerLogo.png"
                    alt="movie span logo"
                    width={200}
                    height={200}
                />
                <p className="text-orange-500 text-5xl font-bold md:text-6xl lg:text-8xl text-center py-5 md:relative md:top-3">MOVIE SPAN</p>
            </div>
            <div>
                <p className="text-white text-center md:text-lg">If you're catching a flick in theaters, or having a movie night at home. Find out what time your movie will end!</p>
            </div>
        </div>
    )
}