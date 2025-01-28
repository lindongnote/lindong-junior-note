import { useDebounceFn, useMouse } from "@vueuse/core";
import { computed, ref, watch } from "vue";
export function useMouseMovementDegree(options) {
  const interval = options?.interval === void 0 ? 100 : options.interval;
  const threshold = options?.threshold === void 0 ? 20 : options.threshold;
  const { x, y } = useMouse();
  const latestMouseX = ref(x.value);
  const latestMouseY = ref(y.value);
  const updateX = useDebounceFn((x2) => {
    latestMouseX.value = x2;
  }, interval);
  const updateY = useDebounceFn((y2) => {
    latestMouseY.value = y2;
  }, interval);
  watch(x, async (val) => {
    updateX(val);
  });
  watch(y, async (val) => {
    updateY(val);
  });
  const lastMovementDegree = ref(0);
  const movementDegree = computed(() => {
    const xDiff = x.value - latestMouseX.value;
    const yDiff = y.value - latestMouseY.value;
    if (Math.abs(xDiff) < threshold && Math.abs(yDiff) < threshold)
      return lastMovementDegree.value;
    const degree = Math.atan2(yDiff, xDiff);
    lastMovementDegree.value = (360 + Math.round(degree)) % 360;
    return lastMovementDegree.value;
  });
  return {
    movementDegree
  };
}
