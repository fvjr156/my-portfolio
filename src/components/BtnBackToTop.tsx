import { motion } from "framer-motion";
import { ArrowUp } from "react-feather";

export default function BtnBackToTop({ visible }: {visible: boolean}) {
  return (
    <motion.button
      aria-label="back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={false}
      animate={visible ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40, pointerEvents: "none" },
        visible: { opacity: 1, y: 0, pointerEvents: "auto" }
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ scale: 1.05 }}
      className="
        fixed right-5 bottom-5 z-50
        flex items-center justify-center
        w-11 h-11 rounded-full border-0 
        bg-accent text-white
      "
    >
      <ArrowUp size={20} strokeWidth={2} />
    </motion.button>
  );
}