"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "InjectionKey", {
  enumerable: true,
  get: function () {
    return _constants.InjectionKey;
  }
});
Object.defineProperty(exports, "NolebaseInlineLinkPreview", {
  enumerable: true,
  get: function () {
    return _InlineLinkPreview.default;
  }
});
exports.NolebaseInlineLinkPreviewPlugin = void 0;
Object.defineProperty(exports, "PopupIframe", {
  enumerable: true,
  get: function () {
    return _PopupIframe.default;
  }
});
var _InlineLinkPreview = _interopRequireDefault(require("./components/InlineLinkPreview.vue"));
var _PopupIframe = _interopRequireDefault(require("./components/PopupIframe.vue"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const components = {
  VPNolebaseInlineLinkPreview: _InlineLinkPreview.default
};
const NolebaseInlineLinkPreviewPlugin = exports.NolebaseInlineLinkPreviewPlugin = {
  install(app, options) {
    if (typeof options !== "undefined" && typeof options === "object") app.provide(_constants.InjectionKey, options);
    for (const key of Object.keys(components)) app.component(key, components[key]);
  }
};