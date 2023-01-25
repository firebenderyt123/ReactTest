import { Component } from 'react';
import { motion } from "framer-motion";

import { rebuildScene } from "./Scene";
import { getParams } from "./Parameters";

export class Fields extends Component {
  state = {
    isHover: false,
    mins: {
      objectCount: 1,
      mass: 1
    },
    maxs: {
      objectCount: 100,
      mass: 99
    },
    steps: {
      objectCount: 1,
      mass: 1
    },
    lengths: {
      objectCount: 3,
      mass: 2
    },
    values: {
      objectCount: 1,
      mass: 1
    },
  };

  // componentDidMount() {
  //   this.setState({
  //     values: () => getParams()
  //   });
  //   console.log(this.state.values);
  // }

  onKeyDownEvent = {
    keyCode: -1
  };

  handleOnChange = event => {
    
    if (this.onKeyDownEvent.keyCode === 107 ||
      this.onKeyDownEvent.keyCode === 109) {
      this.onKeyDownEvent.keyCode = -1;
      return;
    }

    const { name, value } = event.target;
    const { mins, maxs, lengths } = this.state;

    let newVal = value;

    if (value === "")
        newVal = 0;

    if (value <= maxs[name] &&
      value >= mins[name] &&
      value.length <= lengths[name]) {
      this.setState({
        values: {
          ...this.state.values,
          [name]: newVal
        }
      });
      this.setValue(name, newVal);
    }
  };

  handleKeyDown = event => {
    this.onKeyDownEvent = event;

    const { name, value } = event.target;
    const { mins, maxs, lengths } = this.state;

    if (event.keyCode === 107) {
      // plus
      if (value < maxs[name]) {
        let newVal = parseInt(value) + 1;
        this.setState({
          values: {
            ...this.state.values,
            [name]: newVal
          }
        });
        this.setValue(name, newVal);
      }
    } else if (event.keyCode === 109) {
      // minus
      if (value > mins[name]) {
        let newVal = parseInt(value) - 1;
        this.setState({
          values: {
            ...this.state.values,
            [name]: newVal
          }
        });
        this.setValue(name, newVal);
      }
    }
  };

  setValue(name, val) {
    setParam(name, val);
  }

  render() {
    const { mins, maxs, steps, lengths, values } = this.state;
    return (
      <div className="fields">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="field object-count-field"
        >
          <label>Objects Count</label>
          <input
            type="number"
            name="objectCount"
            className={
              "object-count form-input"
            }
            min={ mins.objectCount }
            max={ maxs.objectCount }
            step={ steps.objectCount }
            maxLength={ lengths.objectCount }
            value={ values.objectCount }
            onChange={ this.handleOnChange }
            onKeyDown={ this.handleKeyDown }
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="field mass-field"
        >
          <label>Mass</label>
          <input
            type="number"
            name="mass"
            className={
              "mass form-input"
            }
            min={ mins.mass }
            max={ maxs.mass }
            step={ steps.mass }
            maxLength={ lengths.mass }
            value={ values.mass }
            onChange={ this.handleOnChange }
            onKeyDown={ this.handleKeyDown }
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="field mass-field"
        >
          <motion.div
            className="submit btn"
            onHoverStart={() => this.setState({isHover: true})}
            onHoverEnd={() => this.setState({isHover: false})}
            whileTap={{ scale: 0.8 }}
          >
            <motion.a 
              href="#"
              animate={{
                backgroundColor: this.state.isHover ? "#3cd458" : "#ffffff00",
                color: this.state.isHover ? "#fff" : "#3cd458"
              }}
              transition={{duration: 0}}
              onClick={() => rebuildScene() }
            >
              Apply
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    );
  }
};