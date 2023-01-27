import { motion } from "framer-motion";

export const Button = (props) => {

    const { name, href, text, motions } = props;

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`field ${name}`}
      >
        <motion.div
          className={`${name} btn`}
        >
          <motion.a 
            href={`${href}`}
            {...motions}
          >
            {text}
          </motion.a>
        </motion.div>
      </motion.div>
    );

};