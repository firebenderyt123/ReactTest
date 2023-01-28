import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Accordion = ({ i, expanded, setExpanded, ...props }) => {
  const isOpen = i === expanded;
  const [isHover, setIsHover] = useState(false);
  const { title, children } = props;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <motion.div
      className={`accordion accordion-${i}`}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      <motion.h3
        initial={false}
        animate={{
          backgroundColor: isOpen ? "#ffdd00" : "#4466ff",
          // backgroundColor: isOpen ? "#ffdd00" : "#0055FF",
          color: isOpen ? "#333" : "#fff",
          boxShadow: isOpen ? "#fffa00ad 0px 5px 20px 0px, #0000001a 0px 5px 5px 0px" : "#00000000 0px 5px 5px 0px",
          // fontSize: isHover ? "1.27em" : "1.17em"
        }}
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
            {[children]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
