<template>
  <header>
    <h1><RouterLink to="/">在庫管理</RouterLink></h1>
    <div class="nav-wrapper">
      <nav>
        <RouterLink to="/">在庫一覧</RouterLink>
      </nav>
      <nav @click="handleOpenModal">在庫データ登録</nav>
    </div>
  </header>
  <main>
    <slot></slot>
  </main>
  <ItemRegistrationModal
    :error="error"
    :form-data="formData"
    :is-open="isModalOpen"
    :is-loading="isLoading"
    @close="handleCloseModal"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import ItemRegistrationModal from '@/components/ItemRegistrationModal.vue'
import { useInventoryStore } from '@/stores/inventories'
import type { ItemRegistrationRequest } from '@/types'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const NO_TITLE_ERROR = '商品名を入力してください'

const inventoryStore = useInventoryStore()
const { isLoading } = storeToRefs(inventoryStore)
const { register } = inventoryStore

const isModalOpen = ref<boolean>(false)
const formData = ref<ItemRegistrationRequest>({ title: '' })
const error = ref<string>('')

const resetForm = () => (formData.value = { title: '' })

const validate = (data: ItemRegistrationRequest) => {
  if (data.title === '') {
    throw new Error(NO_TITLE_ERROR)
  }
}

const handleSubmit = async (data: ItemRegistrationRequest) => {
  try {
    error.value = ''
    formData.value = data

    validate(data)
    await register(data)
    handleCloseModal()
    resetForm()
  } catch (err) {
    error.value = (err as Error).message
  }
}

const handleOpenModal = () => {
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  error.value = ''
}
</script>

<style scoped lang="scss">
header {
  top: 0;
  position: fixed;
  width: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background);

  h1 {
    font-size: 1.6rem;

    a {
      color: unset;
    }
  }
}

main {
  padding-top: var(--header-height);
}

.nav-wrapper {
  display: flex;
  gap: 16px;

  nav {
    font-size: 1rem;
    text-align: center;
    cursor: pointer;

    a {
      color: unset;
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);
    }

    a.router-link-exact-active {
      color: var(--color-text);
    }

    a.router-link-exact-active:hover {
      background-color: transparent;
    }

    a:first-of-type {
      border: 0;
    }

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
