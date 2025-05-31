<template>
  <div class="p-4 min-h-[200px] bg-white text-black">
    <div v-if="post && post.value">
      <h1>這裡是詳細內容彈窗</h1> <!-- 加這行測試 -->
      <h1 class="text-xl font-bold mb-2">{{ post.value.title }}</h1>
      <p class="text-gray-700 mb-4">{{ post.value.content }}</p>
      <img
        v-if="post.value.image_name"
        :src="`/uploads/ratingImg/${post.value.image_name}`"
        class="w-full max-w-md rounded border"
        alt="貼文圖片"
      />
    </div>
    <div v-else>
      <p class="text-gray-500">資料載入中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  id: Number
})

const post = ref(null)

async function fetchDetail() {
  if (!props.id) return
  console.log('🔍 正在請求資料 ID:', props.id)
  const res = await axios.get(`/api/rating/${props.id}`)
  post.value = res.data
}

watch(
  () => props.id,
  (id) => {
    if (id != null) {
      console.log('📥 開始抓取資料:', id)
      fetchDetail()
    }
  },
  { immediate: true }
)
</script>
