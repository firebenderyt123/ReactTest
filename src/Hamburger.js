import { useState } from 'react';
import { Motion, spring, presets }from 'react-motion';
import { motion } from "framer-motion";

import { Sidebar } from "./Sidebar";

export function HamburgerButton() {
  const [isShown, setIsShown] = useState(false);
  
  const handleClick = event => {
    const sidebar = document.getElementById('sidebar');
    setIsShown(current => !current);
    sidebar.classList.toggle('opened');
  };

  const style = {
    overflow: 'visible',
    cursor: 'pointer',
    // disable touch highlighting on devices
    WebkitTapHighlightColor: "rgba(0,0,0,0)"
  };

  return (
    <div id="burger">
      <motion.div
        className="burger btn"
        onClick={ handleClick }
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      >
        <svg 
          viewBox="0 0 96 96"
          height="1em"
          style={style}
        >
          <Motion 
            style={{
              x: spring(isShown ? 1 : 0, presets.wobbly ),
              y: spring(isShown ? 0: 1, presets.wobbly ),
            }}
          >
            {({ x, y }) =>
              <g 
                id="navicon" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="14" 
                strokeLinecap="round" 
                strokeLinejoin="round"
               >
                <line 
                  transform={`translate(${x * 12}, ${x * -7}) rotate(${x * 45}, 7, 26)`} 
                  x1="7" y1="26" x2="89" y2="26" 
                 />
                <line 
                  transform={`translate(${x * 12}, ${x * 7}) rotate(${x * -45}, 7, 70)`} 
                  x1="7" y1="70" x2="89" y2="70" 
                 />
                <line 
                  transform={`translate(${x * -96})`} 
                  opacity={y} 
                  x1="7" y1="48" x2="89" y2="48"
                 />
              </g>
            }
          </Motion>
        </svg>
      </motion.div>
    </div>
  );
}
