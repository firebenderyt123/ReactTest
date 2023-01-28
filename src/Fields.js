import { useState } from "react";

import { rebuildScene } from "./scenes/Scene";
import { useParams } from "./Parameters";

import { Accordion } from "./form/Accordion";
import { ColoredLine } from "./form/Line";
import { InlineGroup } from "./form/Group";
import { IntInput } from "./form/IntInput";
import { Button } from "./form/Button";

export const Fields = () => {

  const [params, setParams] = useParams();
  const [isHover, setIsHover] = useState(false);
  const [min, setMin] = useState({
    objectCount: 1,
    mass: 1,

    gravityX: -100,
    gravityY: -100,
    gravityZ: -100
  });
  const [max, setMax] = useState({
    objectCount: 100,
    mass: 99,

    gravityX: 100,
    gravityY: 100,
    gravityZ: 100
  });
  const [step, setStep] = useState({
    objectCount: 1,
    mass: 1,
    
    gravityX: 1,
    gravityY: 1,
    gravityZ: 1
  });
  const [length, setLength] = useState({
    objectCount: 3,
    mass: 2,
    
    gravityX: 4,
    gravityY: 4,
    gravityZ: 4
  });
  const [val, setVal] = useState({
    objectCount: params.objectCount,
    mass: params.mass,
    
    gravityX: params.gravityX,
    gravityY: params.gravityY,
    gravityZ: params.gravityZ
  });
  const [onKeyDownEvent, setOnKeyDownEvent] = useState({
    keyCode: -1
  });

  const [isNeedUnmount, setIsNeedUnmount] = useState(false);
  const [accordionExpanded, setAccordionExpanded] = useState(0);

  const setValue = (name, value) => {
    setVal({
      ...val,
      [name]: parseInt(value)
    });
    setParams({
      ...val,
      [name]: parseInt(value)
    });
    if (name == "objectCount") {
      setIsNeedUnmount(true);
    } else {
      setIsNeedUnmount(false);
    }
  };

  const handleOnChange = (event) => {

    if (onKeyDownEvent.keyCode === 107 ||
      onKeyDownEvent.keyCode === 109) {
      setOnKeyDownEvent(-1);
      return;
    }

    const { name, value } = event.target;

    let newVal = value;

    if (value === "")
        newVal = 0;

    if (value <= max[name] &&
      value >= min[name] &&
      value.length <= length[name]) {
      setValue(name, newVal);
    }

  };

  const handleKeyDown = (event) => {

    setOnKeyDownEvent(event);

    const { name, value } = event.target;

    if (event.keyCode === 107) {
      // plus
      if (value < max[name]) {
        let newVal = parseInt(value) + 1;
        setValue(name, newVal);
      }
    } else if (event.keyCode === 109) {
      // minus
      if (value > min[name]) {
        let newVal = parseInt(value) - 1;
        setValue(name, newVal);
      }
    }

  };

  return (
    <>
      <Accordion
        i={1}
        title={"Object Params"}
        expanded={accordionExpanded}
        setExpanded={setAccordionExpanded}
        children={[
          <div className="fields">
            <IntInput
              label="Objects Count"
              name="objectCount"
              min={ min.objectCount }
              max={ max.objectCount }
              step={ step.objectCount }
              maxLength={ length.objectCount }
              value={ val.objectCount }
              onChange={ handleOnChange }
              onKeyDown={ handleKeyDown }
            />
            <IntInput
              label="Mass"
              name="mass"
              min={ min.mass }
              max={ max.mass }
              step={ step.mass }
              maxLength={ length.mass }
              value={ val.mass }
              onChange={ handleOnChange }
              onKeyDown={ handleKeyDown }
            />
          </div>
        ]}
      />
      <ColoredLine height={2} />
      <Accordion
        i={0}
        title={"Physics Params"}
        expanded={accordionExpanded}
        setExpanded={setAccordionExpanded}
        children={[
          <div className="fields">
            <InlineGroup
              className="gravity"
              children={[
                <IntInput
                  label="X"
                  name="gravityX"
                  min={ min.gravityX }
                  max={ max.gravityX }
                  step={ step.gravityX }
                  maxLength={ length.gravityX }
                  value={ val.gravityX }
                  onChange={ handleOnChange }
                  onKeyDown={ handleKeyDown }
                />,
                <IntInput
                  label="Y"
                  name="gravityY"
                  min={ min.gravityY }
                  max={ max.gravityY }
                  step={ step.gravityY }
                  maxLength={ length.gravityY }
                  value={ val.gravityY }
                  onChange={ handleOnChange }
                  onKeyDown={ handleKeyDown }
                />,
                <IntInput
                  label="Z"
                  name="gravityZ"
                  min={ min.gravityZ }
                  max={ max.gravityZ }
                  step={ step.gravityZ }
                  maxLength={ length.gravityZ }
                  value={ val.gravityZ }
                  onChange={ handleOnChange }
                  onKeyDown={ handleKeyDown }
                />
              ]}
            />
          </div>
        ]}
      />
      <Button
        name="submit"
        href="#"
        text="Apply"
        motions={{
          animate: {
            backgroundColor: isHover ? "#3cd458" : "#ffffff00",
            color: isHover ? "#fff" : "#3cd458"
          },
          transition: {duration: 0},
          onHoverStart: () => setIsHover(true),
          onHoverEnd: () => setIsHover(false),
          whileTap: { scale: 0.8 },
          onClick: () => {
            rebuildScene(isNeedUnmount);
            setIsNeedUnmount(false);
          }
        }}
      />
    </>
  );
};