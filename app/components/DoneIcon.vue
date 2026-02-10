<template>
  <div
    v-if="done"
    class="flex items-center justify-center"
  >
    <u-icon
      name="line-md:confirm"
      class="size-25 text-success"
    />
  </div>
</template>

<script setup>
const done = ref(false)

const setState = (state, delay) => {
  if (delay > 0) {
    setTimeout(() => {
      done.value = state
    }, delay)
  } else {
    done.value = state
  }
}

defineExpose({ setState, done })
</script>
