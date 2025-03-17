<template>
  <header>
    <h1>在庫管理</h1>
    <div class="nav-wrapper">
      <nav>
        <RouterLink to="/">在庫一覧</RouterLink>
      </nav>
      <nav @click="handleOpenModal">在庫データ登録</nav>
    </div>
  </header>
  <ItemRegistrationModal
    :form-data="formData"
    :is-open="isModalOpen"
    @close="handleCloseModal"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { registerItem } from '@/api'
import { RouterLink } from 'vue-router'
import ItemRegistrationModal from '@/components/ItemRegistrationModal.vue'
import { ref, type Ref } from 'vue'
import type { ItemRegistrationRequest } from '@/types'

const isModalOpen: Ref<boolean> = ref(false)
const formData: Ref<ItemRegistrationRequest> = ref({ title: '', category: '' })

// TODO: Add validation
const handleSubmit = async () => {
  try {
    const response = await registerItem(formData.value)
  } catch (error) {
    console.error(error)
  } finally {
    handleCloseModal()
  }
}

const handleOpenModal = () => {
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
}
</script>

<style scoped lang="scss">
header {
  width: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid var(--color-border);

  h1 {
    font-size: 1.6rem;
  }
}

.nav-wrapper {
  display: flex;
  gap: 16px;
}

nav {
  font-size: 1rem;
  text-align: center;
  cursor: pointer;

  a {
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
}
</style>
