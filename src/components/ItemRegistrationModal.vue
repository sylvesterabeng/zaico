<template>
  <div v-if="isOpen" class="container" @click.self="handleCloseModal">
    <div class="contents">
      <form>
        <div class="image-upload-zone">
          <img
            :src="data.item_image || fallbackImage"
            class="uploading-image"
          />
          <input type="file" accept="image/jpeg" @change="uploadImage" />
        </div>
        <div class="text-input-wrapper">
          <label>
            <span class="label-text"
              >商品名 <span class="required">*</span></span
            >
            <input type="text" v-model="data.title"
          /></label>
          <label>
            <span class="label-text">数量</span>
            <input type="text" v-model="data.quantity"
          /></label>
          <label>
            <span class="label-text">単位</span>
            <input type="text" v-model="data.unit"
          /></label>
          <label>
            <span class="label-text">カテゴリー</span>
            <input type="text" v-model="data.category"
          /></label>
        </div>
      </form>
      <div class="button-wrapper">
        <button
          @click="handleCloseModal"
          :disabled="isLoading"
          class="cancel-button"
        >
          キャンセル
        </button>
        <button
          @click="handleSubmit"
          :disabled="isLoading"
          class="submit-button"
        >
          登録
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fallbackImage } from '@/assets'
import type { ItemRegistrationRequest } from '@/types'
import { ref, watch } from 'vue'
import type { PropType } from 'vue'

const emit = defineEmits(['close', 'submit'])

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  isLoading: {
    type: Boolean,
  },
  formData: {
    type: Object as PropType<ItemRegistrationRequest>,
    required: true,
  },
})

const data = ref({ ...props.formData })
const previewImage = ref('')

watch(
  () => props.formData,
  (newFormData) => {
    data.value = { ...newFormData }
  },
  { deep: true }
)

const handleSubmit = async () => {
  emit('submit', data.value)
}

const handleCloseModal = () => {
  emit('close')
}

const uploadImage = (e: Event) => {
  const el = e.target as HTMLInputElement
  const image = el.files?.[0]

  if (!image) {
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(image)

  // set image using base64
  reader.onload = (e) => {
    const base64Image = e.target?.result

    if (typeof base64Image !== 'string') {
      return
    }
    previewImage.value = base64Image
    data.value.item_image = base64Image
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  background-color: var(--color-border-hover);
  display: flex;
  align-items: center;
  justify-content: center;

  .contents {
    height: fit-content;
    padding: 32px 40px;
    margin: 0 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--color-background);
    border-radius: 8px;
    gap: 40px;

    form {
      display: flex;
      gap: 20px;

      .image-upload-zone {
        display: flex;
        flex-direction: column;
        gap: 8px;

        img {
          width: 240px;
          border-radius: 8px;
        }
      }

      .text-input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;

        label {
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        input {
          padding: 4px 8px;
          border-radius: 2px;
          border: none;
          outline: none;
          width: 240px;
        }
      }

      .label-text {
        display: block;
        width: 100px;
      }

      .required {
        color: #ff474c;
      }
    }

    .button-wrapper {
      display: flex;
      gap: 16px;

      button {
        cursor: pointer;
        font-size: 14px;
      }

      .cancel-button {
        background: none;
        border: none;
        color: var(--color-text);

        &:hover {
          opacity: 0.8;
        }
      }

      .submit-button {
        padding: 4px 16px;
        border-radius: 2px;
        border: none;

        &:hover {
          opacity: 0.95;
        }
      }
    }
  }
}
</style>
