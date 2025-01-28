export const InjectionKey = Symbol("VPNolebaseInlineLinkPreview");
export const ComponentName = "VPNolebaseInlineLinkPreview";
export const defaultLinkPreviewPopupOptions = {
  popupWidth: 600,
  popupHeight: 480,
  previewLocalHostName: true,
  selectorsToBeHided: [".VPNav", ".VPFooter", ".VPLocalNav", ".VPSidebar", ".VPDocFooter > .prev-next"],
  popupTeleportTargetSelector: "body",
  popupDelay: 500
};
