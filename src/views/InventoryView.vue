<template>
  <template v-if="isLoading">
    <div class="loading">データを読み込み中...</div>
  </template>

  <template v-else>
    <div class="table-wrapper">
      <table class="inventory-table">
        <thead>
          <tr>
            <th class="inventory-table__img">写真</th>
            <th class="inventory-table__title">商品名</th>
            <th>在庫数</th>
            <th>カテゴリ</th>
            <th class="inventory-table__more"></th>
          </tr>
        </thead>
        <tbody v-if="items.length">
          <tr v-for="inventory in items" :key="inventory.id">
            <td>
              <img :src="inventory.item_image.url || fallbackImage" alt="" />
            </td>
            <td>{{ inventory.title }}</td>
            <td>{{ inventory.quantity || '0.0' }} {{ inventory.unit }}</td>
            <td>{{ inventory.category }}</td>
            <td class="inventory-table__link">
              <router-link :to="`/inventory/${inventory.id}`">詳細</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>

<script setup lang="ts">
import { fallbackImage } from '@/assets'
import { useInventoryStore } from '@/stores/inventories'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const inventoryStore = useInventoryStore()
const { items, isLoading } = storeToRefs(inventoryStore)
const { fetch } = inventoryStore

const getInventory = async () => {
  await fetch()
}

onMounted(() => {
  getInventory()
})
</script>

<style scoped lang="scss">
.table-wrapper {
  padding: 40px 0;

  .inventory-table {
    max-width: 1000px;
    margin: 0 auto;

    thead {
      tr {
        border-bottom: 1px solid var(--color-border);
      }
    }

    th {
      padding: 8px 12px;
      text-align: start;
    }

    td {
      padding: 8px 12px;
    }

    img {
      border-radius: 8px;
      min-height: 48px;
      min-width: 48px;
    }

    &__img {
      width: 100px;
    }

    &__title {
      width: 50%;
    }
    &__more {
      width: 60px;
    }
    &__link {
      a,
      .green {
        color: hsla(160, 100%, 37%, 1);
        transition: 0.4s;
        padding: 3px;
      }

      @media (hover: hover) {
        a:hover {
          background-color: hsla(160, 100%, 37%, 0.2);
        }
      }
    }
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: var(--color-text);
}
</style>
