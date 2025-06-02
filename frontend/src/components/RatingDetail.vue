<template>
  <dialog ref="detailModal" class="modal" @click="closeOnBackdrop">
    <div class="modal-box  min-w-[100vw] h-[100vh] overflow-hidden bg-white flex items-center justify-center" @click.stop  v-if="rating">
      <div class="flex w-full min-h-screen p-6 gap-6">
        <!-- ✅ 左側：7/10 -->
        <div class="w-[70%] bg-white rounded-xl  p-6 space-y-6 ">
          <div class="flex gap-10">
            <!-- 左邊圖片 -->
              <img 
                :src="`/uploads/ratingImg/${rating.image_name}`" 
                :alt="rating.title"
                class="w-[500px] h-[300px] object-cover rounded-lg mb-4"
              />
            <!-- 右邊評分總覽 -->
            <div class="flex-1 mt-1">
              <h2 class="text-[22px] font-bold text-black">{{ rating.title }}</h2>
              <h2 class="text-[12px]  text-gray-400">2115 則熱度</h2>
              <div class="text-4xl font-bold mt-6  text-yellow-500">{{ rating.score || 0 }} <span class="text-base text-gray-500">/ 5 分</span></div>

              <!-- 條狀評分 -->
              <div class="space-y-1 mt-4 text-yellow-500">
                <div class="flex items-center gap-2 text-sm">
                  <span class="w-4">5★</span>
                  <progress class="progress progress-warning w-56 h-2 ms-2" value="1985" max="2115"></progress>
                  <span class="w-10 text-right">1985</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span class="w-4">4★</span>
                  <progress class="progress progress-warning w-56 h-2 ms-2" value="356" max="2115"></progress>
                  <span class="w-10 text-right">356</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span class="w-4">3★</span>
                  <progress class="progress progress-warning w-56 h-2 ms-2" value="130" max="2115"></progress>
                  <span class="w-10 text-right">130</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span class="w-4">2★</span>
                  <progress class="progress progress-warning w-56 h-2 ms-2" value="90" max="2115"></progress>
                  <span class="w-10 text-right">90</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span class="w-4">1★</span>
                  <progress class="progress progress-warning w-56 h-2 ms-2" value="33" max="2115"></progress>
                  <span class="w-10 text-right">33</span>
                </div>
              </div>
              <!-- 互動式星星評分 -->
              <div class="flex items-center gap-2 mt-6">
                <span class="text-sm text-gray-600 mr-2">給個評分：</span>
                <div class="flex text-yellow-400">
                  <Star 
                    v-for="star in 5" 
                    :key="star"
                    @click="updateScore(star)"
                    @mouseenter="hoverScore = star"
                    @mouseleave="hoverScore = 0"
                    :class="[
                      'w-6 h-6 cursor-pointer transition-all duration-200',
                      (hoverScore >= star || currentScore >= star) 
                        ? 'fill-yellow-400 stroke-yellow-400' 
                        : 'stroke-yellow-400 hover:fill-yellow-300'
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        <div class="w-[100%] h-[50px] bg-[#fef1cc] rounded-lg flex items-center ps-5">
          <BotMessageSquare class="w-4 h-4 stroke-yellow-600"/>
          <p class="text-sm ms-2 text-yellow-600 text-[16px]">天啊 ! 這隻貓咪簡直比我聰明100倍</p>
        </div>
        <div class="border-t pt-5 text-gray-200">
              <h3 class="text-[16px] font-bold text-gray-800">介紹</h3>
              <p class="text-sm mt-3 text-gray-500 text-[15px]">{{ rating.content }}</p>

              <h3 class="text-[16px] mt-10 font-bold text-gray-800">創建日期</h3>
              <p class="text-sm mt-3 text-gray-500 text-[15px]">{{ formatDate(rating.created_at) }}</p>
        </div>

        </div>
        

        <!-- ✅ 右側：3/10（你可以自行放內容） -->
      <!-- 固定高度容器，使用 flex 垂直排列 -->
      <div class="w-[30%] bg-gray-100 rounded-xl p-6 flex flex-col justify-between">

        <!-- 上方內容（可放留言列表）-->
        <div class="overflow-y-auto text-sm text-gray-500">
          <h3 class="text-[14px] font-bold text-gray-800 mb-4">{{ comments.length }} 則留言</h3>
          <!-- 將來可以在這裡放留言列表 -->
          <div v-if="comments.length === 0" class="flex flex-col items-center justify-center  text-gray-400 text-center">
            <img
              src="/img/boring_cat.png"
              alt="Decorative Cat"
              class="w-[300px] opacity-40 pointer-events-none pb-6 -ms-12"
            />
            <p class="text-sm">！還沒有留言，成為第一個留言的人吧！</p>
          </div>
          <div v-else class=" mt-5 space-y-4 h-[65vh] overflow-y-auto scrollbar-hide">
            <div 
              v-for="comment in comments" 
              :key="comment.id" 
              class="flex gap-4 items-start"
            >
              <!-- 頭像 -->
              <div class="w-10 h-10 bg-[#042A2B] text-white rounded-lg mt-1 flex items-center justify-center text-sm font-medium shrink-0">
                {{ comment.user_name.charAt(0).toUpperCase() }}
              </div>

              <!-- 右側內容 -->
              <div class="flex-1">
                <!-- 使用者名稱 -->
                <div class=" mt-1 font-medium text-gray-500 text-[12px]">
                  {{ comment.user_name }}
                </div>

                <!-- 留言內容 -->
                <p class="text-sm text-gray-700 mt-1 text-[16px]">
                  {{ comment.content }}
                </p>

                <!-- 時間與按讚 -->
                <div class="flex items-center justify-between mt-2 text-[10px] text-gray-500">
                  <!-- 留言時間 -->
                  <span>{{ formatDate(comment.create_at) }}</span>

                  <!-- 按讚按鈕 -->
                  <button 
                    @click="likeComment(comment.id)"
                    :disabled="likingComments.has(comment.id)"
                    :class="[
                      'flex items-center gap-1 transition-colors',
                      likingComments.has(comment.id)
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-500 hover:text-red-500'
                    ]"
                  >
                    <Heart 
                      :class="[
                        'w-4 h-4',
                        likingComments.has(comment.id) ? 'animate-pulse text-gray-400' : ''
                      ]"
                    />
                    <span>{{ comment.like_count || 0 }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 下方留言輸入區 -->
        <div class="mt-4">
          <textarea 
            v-model="userComment"
            placeholder="寫下你的留言"
            class="w-full px-3 py-3 bg-white border transition-all ease-in-out border-gray-200 rounded-lg focus:outline-none focus:border-[#042A2B] focus:ring-1 resize-none text-sm text-gray-800"
            rows="3"
          ></textarea>

          <!-- ✅ 按鈕靠右 -->
          <div class="flex justify-end">
            <button 
              @click="submitComment"
              :disabled="userComment.trim() === ''"
              class="mt-3 bg-[#042A2B] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#031b1c] w-[100px] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
            >
              發送
            </button>
          </div>
        </div>
      </div>

      </div>


    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import { X, Star, Heart, BotMessageSquare  } from 'lucide-vue-next'
import { useAuthStore } from '/stores/auth'

const auth = useAuthStore()

// Props and emits - fix duplicate declarations
defineExpose({ openModal })
const emit = defineEmits(['commentAdded', 'scoreUpdated'])

// Reactive data
const detailModal = ref(null)
const rating = ref(null)
const comments = ref([])
const loading = ref(false)
const error = ref('')
const userComment = ref('')
const likingComments = ref(new Set())

// Star rating related
const currentScore = ref(0)
const hoverScore = ref(0)
const updatingScore = ref(false)

// Update score function
async function updateScore(score) {
  if (updatingScore.value) return
  
  updatingScore.value = true
  
  try {
    const res = await fetch(`/api/rating/${rating.value.id}/score`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score })
    })
    
    if (res.ok) {
      currentScore.value = score
      rating.value.score = score
      // Emit event to parent to update the ratings list
      emit('scoreUpdated', rating.value.id, score)
    } else {
      alert('評分失敗，請稍後再試')
    }
  } catch (err) {
    alert('評分失敗，請稍後再試')
  } finally {
    updatingScore.value = false
  }
}

// Open modal and load data
async function openModal(ratingId) {
  loading.value = true
  error.value = ''
  rating.value = null
  comments.value = []
  userComment.value = ''
  currentScore.value = 0
  hoverScore.value = 0
  
  detailModal.value.showModal()
  
  try {
    const res = await fetch(`/api/rating/${ratingId}`)
    
    if (res.ok) {
      const data = await res.json()
      rating.value = data.rating
      comments.value = data.comments || []
      currentScore.value = data.rating.score || 0
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

<style>
.scrollbar-hide {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>