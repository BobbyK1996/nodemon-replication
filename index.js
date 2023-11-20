#!/usr/bin/env node

import CHOKIDAR from "chokidar";
import PROGRAM from "caporal";

const debounce = (func, delay = 100) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

CHOKIDAR.watch(".")
  .on(
    "add",
    debounce(() => {
      console.log("FILE ADDED"), 100;
    })
  )
  .on("change", () => console.log("FILE CHANGED"))
  .on("unlink", () => console.log("FILE UNLINKED"));
