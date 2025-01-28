"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMouseMovementDegree = useMouseMovementDegree;
var _core = require("@vueuse/core");
var _vue = require("vue");
function useMouseMovementDegree(options) {
  const interval = options?.interval === void 0 ? 100 : options.interval;
  const threshold = options?.threshold === void 0 ? 20 : options.threshold;
  const {
    x,
    y
  } = (0, _core.useMouse)();
  const latestMouseX = (0, _vue.ref)(x.value);
  const latestMouseY = (0, _vue.ref)(y.value);
  const updateX = (0, _core.useDebounceFn)(x2 => {
    latestMouseX.value = x2;
  }, interval);
  const updateY = (0, _core.useDebounceFn)(y2 => {
    latestMouseY.value = y2;
  }, interval);
  (0, _vue.watch)(x, async val => {
    updateX(val);
  });
  (0, _vue.watch)(y, async val => {
    updateY(val);
  });
  const lastMovementDegree = (0, _vue.ref)(0);
  const movementDegree = (0, _vue.computed)(() => {
    const xDiff = x.value - latestMouseX.value;
    const yDiff = y.value - latestMouseY.value;
    if (Math.abs(xDiff) < threshold && Math.abs(yDiff) < threshold) return lastMovementDegree.value;
    const degree = Math.atan2(yDiff, xDiff);
    lastMovementDegree.value = (360 + Math.round(degree)) % 360;
    return lastMovementDegree.value;
  });
  return {
    movementDegree
  };
}