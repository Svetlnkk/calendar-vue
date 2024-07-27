<script setup>
import { useField } from "vee-validate";
import { watchEffect, toRaw, computed } from "vue";

import { getRandomId, isFieldRequired } from "@/lib/shared.js";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "radio",
    enum: ["radio", "checkbox"],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number, Array, Boolean],
    default: "",
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: Array,
    default: () => [],
  },
  fieldOptions: {
    type: Object,
    default: () => ({}),
  },
  error: {
    type: String,
    default: "",
  },
});

const { value, errorMessage, validate, setErrors } = useField(
  props.name,
  props.rules,
  {
    initialValue: toRaw(props.modelValue),
    ...toRaw(props.fieldOptions),
  }
);

const isRequired = isFieldRequired(props.rules);
const optionsList = computed(() => {
  return props.options.map((o) => {
    return {
      ...o,
      _id: getRandomId(),
      _label: o?.name ?? o,
      _value: o?.value ?? o,
    };
  });
});

defineExpose({ validate });

watchEffect(() => {
  if (props.error?.length) {
    setErrors(props.error);
  }
});
</script>

<template>
  <div
    :class="{
      'form-input': true,
      'form-input-option': true,
      'form-input-required': isRequired,
    }"
  >
    <slot name="label" :value="label" :required="isRequired">
      <p v-if="label?.length" class="form-input-label">
        <slot name="label-value" :value="label">
          {{ label }}
        </slot>
      </p>
    </slot>

    <ul
      :class="{
        'form-input-item': true,
        'p-invalid': errorMessage?.length,
      }"
    >
      <li v-for="option in optionsList" :key="option._id" class="option-item">
        <PrimeInputRadio
          v-if="type === 'radio'"
          v-model="value"
          :input-id="option._id"
          :disabled="disabled"
          :value="option._value"
        />
        <PrimeInputCheckbox
          v-else
          v-model="value"
          :input-id="option._id"
          :disabled="disabled"
          :value="option._value"
        />
        <label :for="option._id" class="option-item-label">
          <slot name :option="option">{{ option._label }}</slot>
        </label>
      </li>
    </ul>

    <slot name="error" :value="errorMessage">
      <span v-if="errorMessage?.length" class="form-input-error">
        {{ errorMessage }}
      </span>
    </slot>
  </div>
</template>
