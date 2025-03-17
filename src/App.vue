<template>
  <LayoutHeader />
  <RouterView />
</template>

<script setup lang="ts">
import LayoutHeader from '@/components/layouts/LayoutHeader.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
