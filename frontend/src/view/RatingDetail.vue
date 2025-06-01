<template>
  <div v-if="post" class="p-6 flex flex-col h-[80vh]"> <!-- 設定固定高度 -->
    <!-- 固定在上方的標題區域 -->
    <div class="flex-none"> <!-- flex-none 確保這部分不會縮放 -->
      <!-- 標題和文章編號 -->
      <div class="flex items-center gap-2 mb-4">
        <h2 class="text-2xl font-bold text-gray-900">{{ post.title }}</h2> <!-- 加深標題顏色 -->
        <span class="text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">#{{ post.id }}</span>
      </div>

      <!-- 評分與上傳者資訊 -->
      <div class="flex items-center gap-4 mb-4">
        <div class="flex items-center">
          <Star class="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span class="ml-1 font-medium text-gray-900">{{ post.score || 0 }}</span>
        </div>
        <div class="text-sm text-gray-700">
          上傳者 ID：{{ post.user_id }}
        </div>
      </div>
    </div>

    <!-- 可滾動的內容區域 -->
    <div class="flex-1 overflow-y-auto"> <!-- 添加滾動功能 -->
      <!-- 圖片區塊 -->
      <div class="mb-4">
        <img v-if="post.image_name" :src="`/uploads/ratingImg/${post.image_name}`" :alt="post.title"
          class="w-full rounded-lg object-cover max-h-[500px]" />
      </div>

      <!-- 內容區塊 -->
      <p class="text-gray-700 mb-4 whitespace-pre-wrap">{{ post.content }}</p>

      <!-- 時間戳記 -->
      <div class="text-sm text-gray-500">
        發布時間：{{ formatDate(post.created_at) }}
      </div>
    </div>
  </div>

  <!-- 載入中狀態 -->
  <div v-else class="p-6 text-center text-gray-500">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A2B] mx-auto mb-2"></div>
    <span>載入中...</span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { Star } from 'lucide-vue-next'

const props = defineProps({ id: Number })
console.log('📦 RatingDetail 載入, ID:', props.id)

const post = ref(null)

async function fetchDetail() {
  if (!props.id) return
  console.log('📡 正在請求資料 ID:', props.id)
  try {
    const res = await axios.get(`/api/rating/${props.id}`)
    post.value = res.data
    console.log('資料載入成功:', post.value)
  } catch (err) {
    console.error('請求失敗:', err)
  }
}

watch(
  () => props.id,
  (id) => {
    if (id != null) {
      console.log('偵測到 ID 變更:', id)
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
