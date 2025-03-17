<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
