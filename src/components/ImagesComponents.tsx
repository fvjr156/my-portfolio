import { useState } from "react";

export interface GalleryImagesProps {
  src: string;
  alt: string;
  className?: string;
  index?: number;
}

export const GalleryImage = ({ src, alt, className = "", index = 0 }: GalleryImagesProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl border border-border bg-muted
        aspect-video w-full max-w-xs sm:max-w-sm md:max-w-md
        transition-all duration-300
        ${className}
        ${index !== 0 ? "-mt-8" : ""}
        hover:scale-101
      `}
    >
      {!loaded && <ImageLoading />}
      <img
        src={src}
        alt={alt}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        onMouseDown={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        className={`w-full h-full object-cover transition-opacity duration-300 
          ${loaded ? "opacity-100" : "opacity-0"}
          `}
      />
    </div>
  );
};

export function ImageLoading() {
  return (
    <div className="w-full h-full rounded-xl bg-size-[200%_100%] bg-linear-to-r from-background via-gradient1 via-65% to-gradient2 animate-gradientShift" />
  );
}