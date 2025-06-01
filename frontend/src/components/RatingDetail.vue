<template>
  <dialog ref="detailModal" class="modal" @click="closeOnBackdrop">
    <div class="modal-box w-[900px] max-w-[90vw] h-[80vh] p-0 rounded-2xl overflow-hidden bg-white" @click.stop>
      <!-- 載入中狀態 -->
      <div v-if="loading" class="flex justify-center items-center h-full">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#042A2B]"></div>
      </div>

      <!-- 錯誤狀態 -->
      <div v-else-if="error" class="flex flex-col justify-center items-center h-full p-8">
        <p class="text-red-500 text-lg mb-4">{{ error }}</p>
        <button @click="closeModal" class="bg-[#042A2B] text-white px-6 py-3 rounded-lg hover:bg-[#031b1c]">
          關閉
        </button>
      </div>

      <!-- 評分詳細內容 -->
      <div v-else-if="rating" class="h-full flex flex-col">
        <!-- Header with close button -->
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold text-gray-800">評分詳情</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <X class="w-6 h-6" />
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto">
          <!-- 圖片和基本資訊 -->
          <div class="p-6">
            <!-- Poster ID, Title and Rating above image -->
            <div class="mb-4">
              <p class="text-sm text-gray-500 mb-2">發布者 ID: {{ rating.user_id }}</p>
              <h1 class="text-3xl font-bold text-gray-800 mb-3">{{ rating.title }}</h1>
              
              <!-- Rating display -->
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl text-yellow-400 font-bold">0.0</span>
                <div class="flex text-yellow-400">
                  <Star v-for="i in 5" :key="i" class="w-5 h-5 stroke-yellow-400" />
                </div>
                <span class="text-gray-500 ml-2">{{ comments.length }} 則評論</span>
              </div>
            </div>

            <img 
              :src="`/uploads/ratingImg/${rating.image_name}`" 
              :alt="rating.title"
              class="w-full h-[300px] object-cover rounded-lg mb-4"
            />
            <p class="text-gray-600 leading-relaxed mb-4">{{ rating.content }}</p>
            
            <!-- Publication date -->
            <div class="border-t pt-4 mb-6">
              <p class="text-sm text-gray-400">
                發布於 {{ formatDate(rating.created_at) }}
              </p>
            </div>
          </div>

          <!-- 評論區域 -->
          <div class="px-6 pb-4">
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 class="text-lg font-bold text-gray-800 mb-3">寫個評論吧！</h3>
              <textarea 
                v-model="userComment"
                placeholder="寫下你的評論..."
                class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#042A2B] focus:ring-1 resize-none text-sm text-gray-800"
                rows="3"
              ></textarea>
              <button 
                @click="submitComment"
                :disabled="userComment.trim() === ''"
                class="mt-3 bg-[#042A2B] text-white px-4 py-2 rounded-lg hover:bg-[#031b1c] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
              >
                提交評論
              </button>
            </div>
          </div>

          <!-- 評論列表 -->
          <div class="px-6 pb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">評論 ({{ comments.length }})</h3>
            
            <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
              還沒有評論，成為第一個評論的人吧！
            </div>
            
            <div v-else class="space-y-4 max-h-[300px] overflow-y-auto">
              <div v-for="comment in comments" :key="comment.id" 
                class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-[#042A2B] text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {{ comment.user_name.charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-medium text-gray-800">{{ comment.user_name }}</span>
                  </div>
                  <span class="text-sm text-gray-400">{{ formatDate(comment.create_at) }}</span>
                </div>
                <p class="text-gray-600 ml-11 mb-3">{{ comment.content }}</p>
                
                <!-- Like section -->
                <div class="flex items-center justify-between ml-11">
                  <button 
                    @click="likeComment(comment.id)"
                    :disabled="likingComments.has(comment.id)"
                    :class="[
                      'flex items-center gap-2 transition-colors text-sm',
                      likingComments.has(comment.id) 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-500 hover:text-red-500 cursor-pointer'
                    ]"
                  >
                    <Heart 
                      :class="[
                        'w-4 h-4', 
                        likingComments.has(comment.id) ? 'animate-pulse text-gray-400' : ''
                      ]" 
                    />
                    <span>{{ comment.like_count || 0 }}</span>
                    <span v-if="likingComments.has(comment.id)" class="text-xs text-gray-400"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import { X, Star, Heart } from 'lucide-vue-next'
import { useAuthStore } from '/stores/auth'

const auth = useAuthStore()

// Props and emits
defineExpose({ openModal })
const emit = defineEmits(['commentAdded'])

// Reactive data
const detailModal = ref(null)
const rating = ref(null)
const comments = ref([])
const loading = ref(false)
const error = ref('')
const userComment = ref('')
const likingComments = ref(new Set())

// Open modal and load data
async function openModal(ratingId) {
  loading.value = true
  error.value = ''
  rating.value = null
  comments.value = []
  userComment.value = ''
  
  detailModal.value.showModal()
  
  try {
    const res = await fetch(`/api/rating/${ratingId}`)
    
    if (res.ok) {
      const data = await res.json()
      rating.value = data.rating
      comments.value = data.comments || []
    } else {
      error.value = '找不到該評分項目'
    }
  } catch (err) {
    error.value = '載入失敗，請稍後再試'
  } finally {
    loading.value = false
  }
}

// Close modal
function closeModal() {
  detailModal.value.close()
}

// Close on backdrop click
function closeOnBackdrop(event) {
  if (event.target === detailModal.value) {
    closeModal()
  }
}

// Submit comment
async function submitComment() {
  if (userComment.value.trim() === '') return
  
  try {
    const res = await fetch(`/api/rating/${rating.value.id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: auth.user.id,
        comment: userComment.value
      })
    })
    
    if (res.ok) {
      // Reload the modal data
      await openModal(rating.value.id)
      // Emit event to parent to refresh the ratings list
      emit('commentAdded', rating.value.id)
    } else {
      alert('提交失敗，請稍後再試')
    }
  } catch (err) {
    alert('提交失敗，請稍後再試')
  }
}

// Like comment function
async function likeComment(commentId) {
  
  
  try {
    const res = await fetch(`/api/rating/comment/${commentId}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (res.ok) {
      const data = await res.json()
      // Update the like count in the local comments array
      const commentIndex = comments.value.findIndex(c => c.id === commentId)
      if (commentIndex !== -1) {
        comments.value[commentIndex].like_count = data.newLikeCount
      }
    } else {
      alert('按讚失敗，請稍後再試')
    }
  } catch (err) {
    console.error('Like error:', err)
    alert('按讚失敗，請稍後再試')
  } finally {
    // Remove from liking set after a short delay to show feedback
    setTimeout(() => {
      likingComments.value.delete(commentId)
    }, 10) // Increased delay to show the loading state better
  }
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
