<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>    
    <p>{{ post.content }}</p>    
  </div>
  <div v-else>載入中...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const post = ref(null)
const route = useRoute()

onMounted(async () => {
  const id = route.params.id
  const res = await axios.get(`http://localhost:3000/api/ratings/${id}`)
  post.value = res.data
})
</script>
