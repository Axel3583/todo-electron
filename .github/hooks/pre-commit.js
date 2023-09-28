#!/usr/bin/env node

const { execSync } = require("child_process");

try {
  let branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  if (branch === "main" || branch === "develop" || branch.includes("release")) {
    console.error("Tu ne peux pas commit sur la branche directement");
    process.exit(2);
  }
  process.exit(0);
} catch (e) {
  process.exit(1);
}
