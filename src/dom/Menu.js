import { useState } from "react";

import { Accordion } from "./Accordion";
import { MenuButton } from "./MenuButton";

export const Menu = () => {
  const [accordionExpanded, setAccordionExpanded] = useState(0);

  return (
    <>
      <div id={"menu"}>
        <MenuButton
          title={"Home Page"}
          className={"home-btn"}
          href={"/"}
        />
        <Accordion
          i={0}
          title={"Scenes"}
          expanded={accordionExpanded}
          setExpanded={setAccordionExpanded}
        >
          <MenuButton
            title={"Scene 1"}
            className={"scene-1-btn"}
            href={"scene_1"}
          />
          <MenuButton
            title={"Scene 2"}
            className={"scene-2-btn"}
            href={"scene_2"}
          />
        </Accordion>
      </div>
    </>
  );
};