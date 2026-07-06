import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import ImageLoading from "./ImageLoading";
import { ArrowDown, FileText } from "react-feather";
import ShinyText from "./ShinyText";
import type { HeroProps } from "../types/Types";
import { scrollTo } from "./Toolbar";

export default function Hero({ data, isScrolled, theme, id }: HeroProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const easeOut = [0.16, 1, 0.3, 1] as const;

  const avatar: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const nameContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.08,
      },
    },
  };

  const letter: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const description: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const scrollHint: Variants = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 0.8,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      id={id}
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen p-10 flex flex-col justify-center items-center text-center"
    >
      <motion.div variants={avatar}>
        <motion.div
          whileHover={{
            x: [-1, 1, -1, 1, 0],
            transition: {
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div className="w-43 h-43 border-2 border-accent rounded-xl">
            {!imgLoaded && <ImageLoading />}

            <img
              src={data.heroavatar}
              alt="avatar"
              draggable={false}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(false)}
              onMouseDown={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              className={`${
                imgLoaded ? "opacity-100" : "opacity-0"
              } rounded-lg w-full h-full object-cover transition-opacity duration-300`}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.h1
        variants={nameContainer}
        className="font-hero font-bold mt-6 text-[2.7rem] text-text"
      >
        <ShinyText
          color={theme === "light" ? "#000000" : "#b5b5b5"}
          shineColor={theme === "light" ? "#646464" : "#ffffff"}
        >
          {[...data.name].map((c, i) => (
            <motion.span key={i} variants={letter}>
              {c}
            </motion.span>
          ))}
        </ShinyText>
      </motion.h1>

      <motion.p
        variants={description}
        className="font-display font-normal text-xl p-0"
      >
        {data.herodesc}
      </motion.p>

      <div className="h-10" />
      <a
      target="_blank"
      href="https://fvjr156.github.io/my-portfolio/certpreview/2026_resume.pdf"
      rel="noopener noreferrer"
        className="text-text flex flex-row gap-3 
      bg-transparent backdrop-blur-lg p-3 
      rounded-xl border border-accent/80
      hover:-translate-y-1
      hover:drop-shadow-accent/50 hover:drop-shadow-lg
      transition-all duration-300 ease-out-quint
      "
      >
        <FileText className="size-6 stroke-3" /> View my Resume
      </a>
      <div className="h-10" />

      <motion.div
        variants={scrollHint}
        animate={isScrolled ? "hidden" : "show"}
        className="text-xs text-text flex flex-col items-center gap-2"
        onClick={() => scrollTo("projects")}
      >
        <motion.div
          animate={isScrolled ? { y: 0 } : { y: [0, 8, 0] }}
          transition={
            isScrolled
              ? { duration: 0.2 }
              : {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: [
                    [0.25, 0.1, 0.25, 1],
                    [0.4, 0, 0.2, 1],
                  ],
                }
          }
        >
          <ArrowDown key={theme} className="text-text size-6 stroke-3" />
        </motion.div>

        <p className="mt-3">Scroll To Explore</p>
      </motion.div>
    </motion.div>
  );
}
