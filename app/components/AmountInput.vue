<template>
  <u-form-field
    label="Amount:"
    orientation="horizontal"
    class="justify-start"
  >
    <u-field-group>
      <u-input-number
        v-model="transactionValue"
        :min="0"
        :increment="false"
        :decrement="false"
        placeholder="Enter a value"
        orientation="vertical"
        required
      />
      <u-button
        color="neutral"
        icon="i-lucide-x"
        variant="outline"
        @click="transactionValue = 0"
      />
    </u-field-group>
  </u-form-field>
  <div class="flex flex-wrap gap-1">
    <u-button
      v-for="preset in transactionValuePresets"
      :key="preset.value"
      color="neutral"
      variant="outline"
      class="justify-center"
      :label="preset.label"
      @click="transactionValue = preset.value"
    />
  </div>
</template>

<script setup lang="ts">
const transactionValue = defineModel<number>()

const transactionValuePresets = [
  { label: '1K', value: 1_000 },
  { label: '5K', value: 5_000 },
  { label: '10K', value: 10_000 },
  { label: '20K', value: 20_000 },
  { label: '50K', value: 50_000 },
  { label: '100K', value: 100_000 },
  { label: '500K', value: 500_000 },
  { label: '1M', value: 1_000_000 },
  { label: '2M', value: 2_000_000 }
] as const
</script>
