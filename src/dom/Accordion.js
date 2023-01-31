import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Accordion = ({ i, expanded, setExpanded, title, children }) => {
  const isOpen = i === expanded;
  const [isHover, setIsHover] = useState(false);

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <motion.div
      className={`accordion accordion-${i}`}
    >
      <motion.h3
        initial={false}
        animate={{
          backgroundColor: isHover || isOpen ? "#4466ff" : "#ffdd00",
          // backgroundColor: isOpen ? "#ffdd00" : "#0055FF",
          color: isHover || isOpen ? "#fff" : "#333",
          boxShadow: isHover || isOpen ? "#86868640 0px 5px 5px 0px" : "#fffa00ad 0px 5px 20px 0px, #0000001a 0px 5px 5px 0px",
          // fontSize: isHover ? "1.27em" : "1.17em"
        }}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        onClick={() => setExpanded(isOpen ? false : i)}
      >{title}</motion.h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {[...children]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
