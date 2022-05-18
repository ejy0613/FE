<template>
  <div>mouse position {{ x }} {{ y }}</div>
</template>

<script>
import { useMousePosition } from "./useMousePosition";
export default {
  setup() {
    const { x, y } = useMousePosition();
    console.log(x.value, y.value);
    return {
      x,
      y,
    };
  },
};
</script>

<style lang="scss" scoped></style>
