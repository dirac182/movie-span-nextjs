"use client";
import { useId } from 'react';
import useFormStore from '../store/form-data.js';
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { ThreeCircles } from "react-loader-spinner";


export default function NowPlayingCarousel({ movies=[], isLoading }) {
  const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel({ loop: true, ssr: movies.map(() => 50) });
  const { setSelectedMovieInfo,  setSelectedMovieId, setIdSearchResults } = useFormStore.getState();
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const carouselId = useId()
  const renderSsrStyles = !emblaApi

  if (!movies?.length) {
    return (
      <div className="flex flex-col">
        <div className="embla relative bg-gray-700 p-2 rounded-xl">
          <div className="p-6 text-center text-white">No carousel movies available.</div>
        </div>
      </div>
    );
  }

  return (
  <>
    {renderSsrStyles && (
      <style>
        {emblaServerApi.ssrStyles(`#${carouselId}`, ".embla__slide")}
      </style>
    )}

    <div className="flex flex-col">
      <div className="embla relative rounded-xl bg-gray-700 p-2">
        <div className="flex">
          <button
            type="button"
            className="h-full self-center rounded-full bg-orange-500 p-2 text-white"
            onClick={scrollPrev}
          >
            <FaChevronLeft />
          </button>

          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {movies.map((movie) => (
                <div
                  className="embla__slide min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%]"
                  key={movie.id}
                >
                  <div className="rounded-xl bg-gray-700 p-3">
                    <div className="flex justify-center">
                      {movie.posterImage ? (
                        <Image
                          src={movie.posterImage}
                          alt={movie.title}
                          width={150}
                          height={225}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-[270px] w-[180px] items-center justify-center rounded-lg bg-gray-600 text-white">
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="h-full self-center rounded-full bg-orange-500 p-1 text-white"
            onClick={scrollNext}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="text-center text-sm font-bold">
          <p>Now Playing</p>
        </div>
      </div>
    </div>
  </>
  )};