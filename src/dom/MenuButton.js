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
        <motion.span
          to={href}
          animate={{
            backgroundColor: isHover ? "#ffdd00" : "#4466ff",
            color: isHover ? "#333" : "#fff",
            boxShadow: isHover ? "#fffa00ad 0px 5px 20px 0px, #0000001a 0px 5px 5px 0px" : "#4ba4ff80 -5px 5px 0px 0px"
          }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
        >
        {title}
        </motion.span>
      </Link>
    </motion.div>
  );

};