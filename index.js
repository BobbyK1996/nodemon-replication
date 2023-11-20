#!/usr/bin/env node

import CHOKIDAR from "chokidar";
import PROGRAM from "caporal";

PROGRAM.version("0.0.1")
  .argument("[filename]", "Name of a file to execute")
  .action((args) => {
    console.log(args);
  });

PROGRAM.parse(process.argv);

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
      console.log("FILE ADDED"), 1000;
    })
  )
  .on("change", () => console.log("FILE CHANGED"))
  .on("unlink", () => console.log("FILE UNLINKED"));
