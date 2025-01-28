"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultLinkPreviewPopupOptions = exports.InjectionKey = exports.ComponentName = void 0;
const InjectionKey = exports.InjectionKey = Symbol("VPNolebaseInlineLinkPreview");
const ComponentName = exports.ComponentName = "VPNolebaseInlineLinkPreview";
const defaultLinkPreviewPopupOptions = exports.defaultLinkPreviewPopupOptions = {
  popupWidth: 600,
  popupHeight: 480,
  previewLocalHostName: true,
  selectorsToBeHided: [".VPNav", ".VPFooter", ".VPLocalNav", ".VPSidebar", ".VPDocFooter > .prev-next"],
  popupTeleportTargetSelector: "body",
  popupDelay: 500
};