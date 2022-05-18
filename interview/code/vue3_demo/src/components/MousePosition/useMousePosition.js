import { reactive, toRefs, onMounted, onUnmounted } from "vue";
export const useMousePosition = () => {
  const position = reactive({
    x: 0,
    y: 0,
  });

  function update(e) {
    position.x = e.pageX;
    position.y = e.pageY;
  }

  onMounted(() => {
    console.log("useMousePosition mounted");
    window.addEventListener("mousemove", update);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });

  return toRefs(position);
};
