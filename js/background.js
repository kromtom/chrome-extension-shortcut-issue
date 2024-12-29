//background.js
"use strict";

//onCommand event
chrome.commands.onCommand.addListener(async function (command) {
  console.log(command);
  if (command === "newTab") {
    chrome.tabs.create({ url: "https://www.google.com/" });
  }
});
