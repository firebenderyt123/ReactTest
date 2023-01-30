import Stats from 'stats.js';
import { useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export class CustomStats extends Stats {
  
  static isStats = true;
  static count = 0;

  constructor(title = "", num = 0) {
    super();
    this.#clearDom();
    if (CustomStats.isStats) {
      this.showPanel(num); // 0: fps, 1: ms, 2: mb, 3+: custom
      this.dom.style.left = CustomStats.count * 82 + "px";
      this.dom.classList.add("stats");
      this.#addTitle(title);
      CustomStats.count++;
      console.log(CustomStats.count);
      document.body.appendChild(this.dom);
    }
  }

  #addTitle(title) {
    var elem = document.createElement("p");
    elem.innerHTML = title;
    this.dom.append(elem);
  }

  #clearDom() {
    if (CustomStats.count == 0 || !CustomStats.isStats) {
      const statsElems = document.getElementsByClassName("stats");
      while (statsElems.length > 0) {
        statsElems[0].remove();
      }
    }
  }

};

export const useStats = (num = 0, isEnabled = true) => {
  const stats = useMemo(() => new Stats(), []);
  useEffect(() => {
    if (isEnabled) {
      stats.showPanel(num);
      stats.dom.style.left = "auto";
      stats.dom.style.right = 0;
      document.body.appendChild(stats.dom);
    }
  });

  useFrame(() => {
    stats.begin();
    stats.end();
  });
};