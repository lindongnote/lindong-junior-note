import InlineLinkPreview from "./components/InlineLinkPreview.vue";
import PopupIframe from "./components/PopupIframe.vue";
import { InjectionKey } from "./constants.mjs";
export {
  InjectionKey,
  InlineLinkPreview as NolebaseInlineLinkPreview,
  PopupIframe
};
const components = {
  VPNolebaseInlineLinkPreview: InlineLinkPreview
};
export const NolebaseInlineLinkPreviewPlugin = {
  install(app, options) {
    if (typeof options !== "undefined" && typeof options === "object")
      app.provide(InjectionKey, options);
    for (const key of Object.keys(components))
      app.component(key, components[key]);
  }
};
