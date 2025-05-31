<template>
  <div v-if="post && post.value">
    <h1>{{ post.value.title }}</h1>
    <p>{{ post.value.content }}</p>
    <img v-if="post.value && post.value.image_name" :src="`/uploads/ratingImg/${post.value.image_name}`" />
  </div>
  <div v-else>
    資料載入中...
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
const props = defineProps({ id: Number })
console.log('RatingDetail 組件已載入, ID:', props.id)

const post = ref(null)

async function fetchDetail() {
  if (!props.id) return
  console.log('正在請求資料...', props.id)
  const res = await axios.get(`/api/rating/${props.id}`)
  post.value = res.data
}


watch(
  () => props.id,
  (id) => {
    if (id != null) {
      console.log('正在取得貼文資料，ID:', id)
      fetchDetail()
    }
  },
  { immediate: true }
)



</script>
