#!/usr/bin/env node

import CHOKIDAR from "chokidar";
import PROGRAM from "caporal";
import FS from "fs";

const debounce = (func, delay = 100) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

PROGRAM.version("0.0.1")
  .argument("[filename]", "Name of a file to execute")
  .action(async ({ filename }) => {
    const name = filename || "index.js";

    try {
      await FS.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    const start = debounce(() => {
      console.log("STARTING USERS PROGRAM"), 100;
    });

    CHOKIDAR.watch(".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

PROGRAM.parse(process.argv);
