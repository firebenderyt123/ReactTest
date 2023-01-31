import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const MenuButton = ({title="Page", className="page", href="#"}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      className={`menu-btn ${className}`}
    >
      <Link to={href}>
        <motion.h3
          to={href}
          animate={{
            backgroundColor: isHover ? "#4466ff" : "#ffdd00",
            color: isHover ? "#fff" : "#333",
            boxShadow: isHover ? "#4ba4ff80 -5px 5px 0px 0px" : "#fffa00ad 0px 5px 20px 0px, #0000001a 0px 5px 5px 0px",
          }}
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
        >
        {title}
        </motion.h3>
      </Link>
    </motion.div>
  );

};