"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInIframe = useInIframe;
var _vue = require("vue");
function useInIframe() {
  return {
    livesInIframe: (0, _vue.computed)(() => {
      try {
        return window.self !== window.top && window.top !== void 0 && window.top !== null && "location" in window.top;
      } catch {
        return false;
      }
    })
  };
}