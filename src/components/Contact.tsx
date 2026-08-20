import { useState } from "react";
import {ImageLoading} from "./ImagesComponents";
import type { ContactProps } from "../types/Types";

export default function Contact({ data, id }: ContactProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10 px-4 sm:px-6" id={id}>
      <h1 className="text-2xl font-bold font-hero sm:text-4xl mb-8 sm:mb-10 text-center">
        Contact Me
      </h1>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 ">
        {data.map((item, i) => (
          <ContactItem key={i} item={item} delay={(i + 5) * 100} />
        ))}
      </div>
    </div>
  );
}

function ContactItem({ item, delay}: {item: any, delay: number}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      data-aos="flip-left"
      data-aos-delay={delay}
      data-aos-once="true"
      className="
  group
  w-30 sm:w-35 md:w-42.5
  flex flex-col items-center gap-2 md:gap-3
  p-4 md:p-5 z-10
  rounded-2xl
  border border-white/10 dark:border-white/10
  bg-card/50
  transition-all duration-300 ease-in-circ
  hover:-translate-y-1.5
  hover:border-accent/80
  hover:bg-card/80
  hover:scale-105
"
    >
      <div
        className="
  relative
  w-14 h-14
  sm:w-16 sm:h-16
  md:w-20 md:h-20
  flex items-center justify-center
  rounded-xl
  overflow-hidden
"
      >
        {!loaded && (
          <div className="absolute inset-0">
            <ImageLoading />
          </div>
        )}

        <img
          src={item.logo}
          alt={item.name}
          className={`
            w-full h-full object-contain
            transition-opacity duration-300
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      <span
        className="
  text-sm sm:text-base
  font-medium
  text-center
  text-text/80
  group-hover:text-contactem
  transition-colors
"
      >
        {item.name.split("—")[0].trim()}
      </span>
      <span
        className="
  text-xs sm:text-sm
  relative -top-3
  text-center
  text-text/60
  group-hover:text-text
  transition-colors
"
      >
        {item.name.split("—")[1].trim()}
      </span>
    </a>
  );
}
