import { createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "react-feather";
import type { AccordionProps } from "../types/Types";

const AccordionContext = createContext({
  open: false,
});

export const Accordion = ({
  open,
  children,
  styles,
  aosData = { animType: "", animdelay: 0, animDuration: 0, once: true },
}: AccordionProps) => {
  return (
    <AccordionContext.Provider value={{ open }}>
      <div
        data-aos={aosData.animType}
        data-aos-delay={aosData.animdelay}
        data-aos-duration={aosData.animDuration}
        data-aos-once={aosData.once}
        style={styles}
        className="
        hover:-translate-y-2 transition-transform duration-300 ease-in
        relative rounded-t-2xl z-10
        w-full border border-accent/80 backdrop-blur-md overflow-hidden
        "
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionHeader = ({
  children,
  onClick,
  styles,
}: {
  children: any;
  onClick: any;
  styles: any;
}) => {
  const { open } = useContext(AccordionContext);

  return (
    <button
      onClick={onClick}
      style={styles}
      className={` flex w-full items-center justify-between
                 px-5 h-14
                 text-left font-medium transition-colors duration-300 ${open ? "bg-accent/5" : "hover:bg-accent/5"}`}
    >
      <span className="text-sm md:text-base">{children}</span>

      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center"
      >
        <ChevronDown size={18} />
      </motion.span>
    </button>
  );
};

export const AccordionBody = ({ children }: any) => {
  const { open } = useContext(AccordionContext);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: "auto", 
            opacity: 1,
            transition: {
              height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.25, delay: 0.1 }
            }
          }}
          exit={{ 
            height: 0, 
            opacity: 0,
            transition: {
              height: { duration: 0.3 },
              opacity: { duration: 0.2 }
            }
          }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-6 text-sm border-t border-accent/10 pt-4 mt-2">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
