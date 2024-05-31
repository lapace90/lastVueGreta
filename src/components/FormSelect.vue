<script setup>
import { defineProps, defineEmits } from 'vue';

 defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  itemKey: {
    type: String,
    default: 'name'
  }
});

const emits = defineEmits(['update:modelValue']);

function updateModelValue(event) {
  const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
  emits('update:modelValue', selectedOptions);
}
</script>

<template>
  <div>
    <label :for="label" class="form-label">{{ label }}</label>
    <select class="form-select" :id="label" multiple @change="updateModelValue">
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option[itemKey] }}
      </option>
    </select>
  </div>
</template>
