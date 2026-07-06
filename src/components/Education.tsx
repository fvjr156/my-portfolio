import { useState } from "react";
import ImageLoading from "./ImageLoading";
import type { EducationItemProps, TypeEducationItem } from "../types/Types";

export default function Education({
  data,
  id,
}: {
  data: TypeEducationItem[];
  id: string;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-16 px-4 sm:px-6" id={id}>
      <h1 className="text-2xl sm:text-4xl font-bold font-hero mb-10 text-center">
        Education
      </h1>

      <div
        className="
          relative bg-background default-transition
          after:content-['']
          after:absolute
          after:top-0
          after:bottom-0
          after:left-8
          after:w-1
          after:bg-accent
          md:after:left-1/2
          md:after:-translate-x-1/2
        "
      >
        {data.map((ei, k) => (
          <EducationItem key={k} data={ei} index={k} />
        ))}
      </div>
    </div>
  );
}

function EducationItem({ data, index }: EducationItemProps) {
  const [loaded, setLoaded] = useState(false);
  const left = index % 2 === 0;

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="true"
      data-aos-delay={(index + 1) * 250}
      className={`
        relative mb-12 flex flex-col
        md:w-1/2
        ${left ? "md:pr-14 md:mr-auto" : "md:pl-14 md:ml-auto"}
        pl-20 md:pl-0
      `}
    >
      <div
        className={`
    absolute top-6 left-6
    w-5 h-5 rounded-full
    bg-accent border-4 border-background
    z-10
    ${left ? "md:-right-2.5 md:left-auto" : "md:-left-2.5"}
  `}
      />

      <div
        className="
          rounded-2xl border border-accent/80 hover:-translate-y-1 hover:drop-shadow-accent/50 hover:drop-shadow-lg transition-all duration-300 ease-in-circ
          bg-card/60 backdrop-blur-sm
          shadow-sm
          p-5 sm:p-6
        "
      >
        <div className="flex items-start gap-4">
          <div
            className="
              w-18.75 h-18.75
              min-w-18.75
              rounded-xl
              overflow-hidden
              relative
              border border-border
              bg-muted
            "
          >
            {!loaded && <ImageLoading />}

            <img
              src={data.image}
              alt={data.school}
              className={`
                w-full h-full
                object-cover
                transition-opacity duration-300
                ${loaded ? "opacity-100" : "opacity-0"}
              `}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(false)}
            />
          </div>

          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold">{data.school}</h2>

            <p className="text-sm opacity-80">{data.location}</p>

            <p className="mt-2 font-medium">{data.course}</p>

            <p className="text-sm mt-1 text-accent">
              {data.from} — {data.to}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
