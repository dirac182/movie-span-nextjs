import Image from "next/image";

export default async function Title () {

    return (
        <div className="flex flex-col px-5">
            <a href="https://www.moviespan.net/" target="_blank" rel="noopener noreferrer">
                <div className="flex lg:flex-row items-center justify-center">
                    <Image
                        src="/timerLogo.png"
                        alt="movie span logo"
                        width={50}
                        height={150}
                    />
                    <p className="text-orange-500 pb-3 text-3xl font-bold md:text-6xl lg:text-8xl text-center py-5 md:relative md:top-3">MOVIE SPAN</p>
                </div>
            </a>
        </div>
    )
}