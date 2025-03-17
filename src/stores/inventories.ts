import { fetchInventory, registerItem } from '@/api'
import type { InventoryItem, ItemRegistrationRequest } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<InventoryItem[]>([])
  const isLoading = ref(false)

  const totalItems = computed(() => items.value.length)

  const fetch = async () => {
    isLoading.value = true
    try {
      const res = await fetchInventory()
      items.value = res.data
    } catch (error) {
      console.error('在庫一覧取得', error)
    } finally {
      isLoading.value = false
    }
  }

  const register = async (item: ItemRegistrationRequest) => {
    isLoading.value = true
    try {
      await registerItem(item)
      await fetch()
    } catch (error) {
      console.error('在庫登録失敗', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    items,
    isLoading,
    totalItems,
    fetch,
    register,
  }
})
