<template>
  <template v-if="isLoading">
    <div class="loading">データを読み込み中...</div>
  </template>

  <template v-else>
    <div class="table-wrapper">
      <template v-if="items.length">
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
          <tbody>
            <tr v-for="inventory in items" :key="inventory.id">
              <td>
                <img :src="inventory.item_image.url || fallbackImage" alt="" />
              </td>
              <td class="inventory-table__title">
                <router-link :to="`/inventory/${inventory.id}`">{{
                  inventory.title
                }}</router-link>
              </td>
              <td class="inventory-table__quantity">
                {{ inventory.quantity || '0.0' }} {{ inventory.unit }}
              </td>
              <td class="inventory-table__category">
                {{ inventory.category }}
              </td>
              <td class="inventory-table__link">
                <router-link :to="`/inventory/${inventory.id}`"
                  >詳細</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-else
        ><div class="inventory-empty">
          在庫データを登録してください
        </div></template
      >
    </div>

    <!-- TODO: Pagination -->
    <div class="pagination">全{{ items.length }}件</div>
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
  padding: var(--table-padding-top) 16px 0;
  height: calc(100vh - var(--header-height) - var(--pagination-height));
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .inventory-empty {
    text-align: center;
  }

  .inventory-table {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    // fill available space
    height: calc(
      100vh - var(--header-height) -
        (var(--table-padding-top) * 1) - var(--pagination-height)
    );
    overflow: auto;

    thead {
      position: sticky;
      top: 0;
      background-color: var(--color-background);

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
      border: 1px solid var(--color-border);
    }

    &__img {
      width: 100px;
    }
    &__title {
      width: 50%;
      min-width: 200px;
      white-space: break-spaces;
      word-break: break-all;
      max-width: 50%;

      a {
        color: unset;
        text-decoration: underline;

        @media (hover: hover) {
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
    &__quantity {
      width: 240px;
      min-width: 200px;
      white-space: break-spaces;
      word-break: break-all;
    }
    &__category {
      width: 240px;
      min-width: 200px;
      white-space: break-spaces;
      word-break: break-all;
    }
    &__more {
      min-width: 60px;
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

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--pagination-height);
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
