import { motion } from "framer-motion";

export const IntInput = (props) => {

    const {
      label, name,
      min, max, step, maxLength,
      value, onChange, onKeyDown
    } = props;

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`field ${name}-field`}
      >
        <label>{label}</label>
        <input
          type="number"
          name={name}
          className={
            `${name} form-input`
          }
          min={ min }
          max={ max }
          step={ step }
          maxLength={ maxLength }
          value={ value }
          onChange={ onChange }
          onKeyDown={ onKeyDown }
        />
      </motion.div>
    );

};