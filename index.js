#!/usr/bin/env node

import chokidar from "chokidar";

const debounce = (func, delay = 100) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

chokidar
  .watch(".")
  .on(
    "add",
    debounce(() => {
      console.log("FILE ADDED"), 100;
    })
  )
  .on("change", () => console.log("FILE CHANGED"))
  .on("unlink", () => console.log("FILE UNLINKED"));
