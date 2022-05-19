<template>
  <h3>Test View</h3>
  <MousePosition />
</template>

<script setup>
import MousePosition from "../components/MousePosition/index.vue";
import { getCurrentInstance, onMounted } from "vue";

console.log("this", this);

onMounted(() => {
  console.log("this in mounted", this);
});

const instance = getCurrentInstance();
console.log("instance", instance);
</script>

<style lang="scss" scoped></style>
