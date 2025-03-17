<template>
  <div v-if="isOpen" class="container">
    <div class="contents">
      <form>
        <label>
          <span class="label-text"
            >商品名 <small class="required">必須</small></span
          >
          <input type="text" v-model="data.title"
        /></label>
        <label>
          <span class="label-text">カテゴリー</span>
          <input type="text" v-model="data.category"
        /></label>
      </form>
      <div class="button-wrapper">
        <button @click="handleCloseModal">キャンセル</button>
        <button @click="handleSubmit">登録</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemRegistrationRequest } from '@/types'
import { ref } from 'vue'
import type { PropType } from 'vue'

const emit = defineEmits(['close', 'submit'])

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  formData: {
    type: Object as PropType<ItemRegistrationRequest>,
    required: true,
  },
})

const data = ref({ ...props.formData })

const handleSubmit = async () => {
  emit('submit', data.value)
}

const handleCloseModal = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--color-border-hover);
  display: flex;
  align-items: center;
  justify-content: center;

  .contents {
    height: fit-content;
    padding: 24px 40px;
    width: 500px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--color-background);
    border-radius: 4px;

    form {
      margin-bottom: 24px;
      display: flex;
      gap: 8px;
      flex-direction: column;

      .label-text {
        display: inline-block;
        width: 100px;
      }

      .required {
        color: firebrick;
      }
    }

    .button-wrapper {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
