import { useState, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectsProps } from "../types/Types";
import { ExternalLink, MoreHorizontal } from "react-feather";
import { Link } from "react-router-dom";

export function Projects({
  data,
  header,
  id,
  projectIconBarShowTriggerRef,
  selectedIndex,
}: ProjectsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10 px-4 sm:px-6" id={id}>
      <h1 className="text-2xl font-bold font-hero sm:text-4xl mb-8 sm:mb-10 text-center">
        {header}
      </h1>

      <div ref={projectIconBarShowTriggerRef} className="w-full h-1" />

      <ProjectsFrameView project={data[selectedIndex]} />
    </div>
  );
}

type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  image: string;
  github: string;
};

export function ProjectsFrameView({ project }: { project: ProjectItem }) {
  return (
    <div
      className="
        w-full h-full rounded-2xl p-5 overflow-hidden
        border border-accent/80
        backdrop-blur-md bg-transparent
        flex flex-col align-middle justify-center
        hover:-translate-y-1 hover:drop-shadow-accent/50 hover:drop-shadow-lg transition-all duration-300 ease-in-circ
    "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 object-contain"
          />

          <div className="p-5 flex flex-col gap-3">
            <h2 className="text-xl font-bold font-hero">{project.title}</h2>

            <p className="text-sm text-muted">{project.description}</p>

            <Link to={`/my-portfolio/projects?showcase=${project._id}`}>
              {/* <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer" */}
              <div
                className="
            inline-flex items-center gap-2
            w-fit px-4 py-2 rounded-lg
            border border-accent
            hover:bg-accent/30
            bg-transparent backdrop-blur-md
            transition-colors duration-150
          "
              >
                View Project
                <ExternalLink size={16} />
                {/* </a> */}
              </div>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ProjectsIconBar({
  data,
  visible,
  selectedIndex,
  onSelect,
}: {
  data: any[];
  visible: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 100,
      }}
      transition={{ duration: 0.35 }}
      className="
        fixed bottom-5 left-1/2 -translate-x-1/2
        px-4 py-2
        bg-transparent backdrop-blur-md
        border border-accent
        flex gap-3 flex-row
        rounded-2xl z-50
        overflow-auto 
      "
    >
      {data.map((item, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={
            selectedIndex === i ? "ring-2 ring-accent/50 rounded-md" : ""
          }
        >
          <LogoComponent logo={item.logo} fallback={item.title} />
        </button>
      ))}
      <button>
        <LogoComponent logo={<MoreHorizontal stroke="currentColor" className="text-text" />} fallback={"..."} />
      </button>
    </motion.div>
  );
}

export function LogoComponent({
  logo,
  fallback,
}: {
  logo: string | JSX.Element;
  fallback: string;
}) {
  const [imgError, setImgError] = useState(false);
  const firstLetter = fallback.slice(0, 1).toUpperCase();

  return (
    <div
      className={`
      w-12 h-12 
      flex items-center justify-center 
      ${typeof logo === "string" ? "bg-linear-to-br from-slate-400 to-slate-600" : "bg-background/0"} 
      text-white rounded-md shadow-lg 
      overflow-hidden
      hover:scale-105 hover:-translate-y-1 transition-transform duration-150 hover:border-accent hover:border
      `}
    >
      {imgError ? (
        <span className="font-bold font-hero text-lg leading-none">
          {firstLetter}
        </span>
      ) : typeof logo === "string" ? (
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-cover pointer-events-none"
          onError={() => setImgError(true)}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      ) : (
        <Link to={`/my-portfolio/projects`}>{logo}</Link>
      )}
    </div>
  );
}
