import { motion } from "framer-motion";
import navbar_elements from "../data/navbar_elements.json";
import BtnThemeToggle from "./BtnThemeToggle";
import type { ToolbarProps } from "../types/Types";
// import BtnAudioPlayer from "./BtnAudioPlayer";
// import bgm from "../assets/bgm.mp3";

export const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

export default function Toolbar({ visible, theme, setTheme }: ToolbarProps) {
  return (
    <motion.header
      initial={false}
      animate={visible ? "visible" : "hidden"}
      variants={{
        hidden: { y: -80, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        md:flex
        fixed w-full md:w-[97vw]
        font-display text-sm
        bgcol-transition
        text-text 
        flex-row justify-between
        p-3 px-10 z-50
        md:m-2 md:mx-5 
        md:backdrop-blur-md md:bg-transparent
        backdrop-blur-none bg-background
        border-accent border-b 
        md:border md:rounded-xl
      "
    >
      <nav className="flex flex-row gap-5">
        {navbar_elements.map((el, i) => (
          <button
            key={i}
            className="
              hidden md:block
              relative cursor-pointer 
              after:content-[''] after:absolute after:bottom-0 after:left-0
              after:w-full after:h-0.5 after:bg-accent
              after:scale-x-0 hover:after:scale-x-100 
              after:transition-transform after:duration-200 after:ease-in-out
              after:origin-left
            "
            onClick={() => scrollTo(el.pointTo)}
          >
            {el.label}
          </button>
        ))}
      </nav>
      <div>
        {/* <BtnAudioPlayer src={bgm} /> */}
        <BtnThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </motion.header>
  );
}
