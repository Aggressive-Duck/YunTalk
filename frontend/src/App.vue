<template>
  <div class="relative">
      <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '/stores/auth'

const auth = useAuthStore()

onMounted(() => {
  auth.loadFromStorage()
})
</script>
