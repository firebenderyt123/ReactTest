import { useState } from "react";

import { Accordion } from "./Accordion";
import { MenuButton } from "./MenuButton";

export const Menu = () => {
  const [accordionExpanded, setAccordionExpanded] = useState(0);

  return (
    <>
      <div id={"menu"}>
        <MenuButton
          title={"Home"}
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
            title={"Balls"}
            className={"scene-1-btn"}
            href={"balls"}
          />
          <MenuButton
            title={"Heart"}
            className={"scene-2-btn"}
            href={"heart"}
          />
          <MenuButton
            title={"Robot"}
            className={"scene-3-btn"}
            href={"robot"}
          />
        </Accordion>
      </div>
    </>
  );
};