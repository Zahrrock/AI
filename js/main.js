const KEY_CODE_SPACE = 32;
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_TOP_ARROW = 38;
const KEY_CODE_BOTTOM_ARROW = 40;

ENV = {};
AI = {};

startENV(); // CF ENVIRONMENT/start.js
startAI(); // CF AI/start.js
window.addEventListener("keydown", onKeyDown);
// window.setInterval(generateRandomMoove, 1000);