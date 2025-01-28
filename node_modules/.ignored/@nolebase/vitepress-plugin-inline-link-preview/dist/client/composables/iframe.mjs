import { computed } from "vue";
export function useInIframe() {
  return {
    livesInIframe: computed(() => {
      try {
        return window.self !== window.top && window.top !== void 0 && window.top !== null && "location" in window.top;
      } catch {
        return false;
      }
    })
  };
}
