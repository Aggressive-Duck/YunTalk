<template>
  <div v-if="post" class="p-6">
    <h2 class="text-2xl font-bold mb-4">{{ post.title }}</h2>

    <!-- 圖片區塊 -->
    <div class="mb-4">
      <img v-if="post.image_name" :src="`/uploads/ratingImg/${post.image_name}`" :alt="post.title"
        class="w-full rounded-lg object-cover" />
    </div>

    <!-- 內容區塊 -->
    <p class="text-gray-600 mb-4">{{ post.content }}</p>

    <!-- 時間戳記 -->
    <div class="text-sm text-gray-400">
      發布時間：{{ formatDate(post.created_at) }}
    </div>
  </div>

  <!-- 載入中狀態 -->
  <div v-else class="p-6 text-center text-gray-500">
    <span>載入中...</span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({ id: Number })
console.log('📦 RatingDetail 載入, ID:', props.id)

const post = ref(null)

async function fetchDetail() {
  if (!props.id) return
  console.log('📡 正在請求資料 ID:', props.id)
  try {
    const res = await axios.get(`/api/rating/${props.id}`)
    post.value = res.data
    console.log('✅ 資料載入成功:', post.value)
  } catch (err) {
    console.error('❌ 請求失敗:', err)
  }
}

watch(
  () => props.id,
  (id) => {
    if (id != null) {
      console.log('🎯 偵測到 ID 變更:', id)
      fetchDetail()
    }
  },
  { immediate: true }
)

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString()
}
</script>
