<template>
  <div class="min-h-screen flex flex-col font-[System] bg-white">
    <!-- 上半部（橘色背景區，包含 navbar） -->
    <div class="h-[400px] m-2 bg-[#042A2B] text-white flex flex-col rounded-2xl relative overflow-hidden">

        <img
        src="/img/big_cat.png"
        alt="Decorative Cat"
        class="absolute -right-20 top-10 w-[700px] opacity-50 pointer-events-none"
        />

      <!-- navbar 置於最上方 -->
      <nav class="w-full flex justify-between items-center px-6  bg-transparent shadow-none ps-50 pe-50">
        <img src="/img/logo.png" alt="Logo" class="w-27 h-27" />
        <div class="space-x-4">
          <a href="#" class="hover:underline"></a>
          <a href="#" class="hover:underline"></a>
        </div>
      </nav>    

      <!-- 中央文字（橘色背景區域內部置中） -->
        <div class="flex-1 flex flex-col items-center justify-center -mt-10 text-center">
            <div class="relative inline-block">
            <h1 class="text-5xl font-[bb]">
                在這裡 評分一切 找到所有你喜歡的
            </h1>
            <sparkles class="absolute -top-3 -right-7 w-6 h-6 text-white" />
            </div>

            <p class="mt-4 text-l text-white">探索、評論、分享你的觀點</p>
        </div>
    </div>

    <!-- 下半部（純白背景） -->
    <div class="h-1/2 w-full bg-white">
        <div class="flex w-[1000px] mt-8  mx-auto">
            <!-- 輸入欄 -->
            <input
            type="text"
            placeholder="搜尋評分項目"
            class="flex-1 px-4 py-2 bg-gray-100 border transition-all ease-in-out border-gray-100 text-gray-600 rounded-lg focus:outline-none h-[50px] text-[14px] focus:border-[#042A2B] focus:ring-1"
            />

            <!-- 搜尋按鈕 -->
            <button @click="openModal" class="group px-4 ms-2 bg-[#042A2B] cursor-pointer transition-all ease-in-out  hover:bg-[#031b1c] text-white rounded-lg flex items-center justify-center">
                <Plus class="w-4 h-4 transition-all duration-500 group-hover:mr-2" />
                <span class="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500 ease-in-out">新增評分</span>
            </button>

            <!-- 新增評分 Modal -->
             <dialog id="my_modal_1" class="modal" ref="modalRef">
                <div class="modal-box w-[800px] h-100 max-w-full p-0 rounded-lg overflow-hidden flex bg-[transparent] shadow-none">

                    <!-- 左側動畫區塊 -->
                     
                    <!-- ⛱ 空間始終存在 -->
                    <div class="w-2/5">
                    <transition name="slide-in">
                        <div v-if="showLeft" class="bg-[#042A2B] h-full p-6 text-white">
                        <h3 class="text-2xl font-[bb]">新增評分項目</h3>
                        <p class="mt-3">新增一個新的評分項目，讓別人評分!</p>
                        </div>
                    </transition>
                    </div>

                    <!-- 右側表單區塊 -->
                    <div class="w-3/5 p-6 text-black bg-white z-10">
                    <form @submit.prevent="submitForm" enctype="multipart/form-data">
                        <div class="mb-4">
                            <label class="block text-xs mb-2">評分標題</label>
                            <input
                                v-model="title"
                                type="text"
                                placeholder=""
                                class="flex-1 px-4 py-2 bg-gray-100 border transition-all ease-in-out border-gray-100 text-gray-600 rounded-lg focus:outline-none w-[400px] h-[40px] text-[12px] focus:border-[#042A2B] focus:ring-1"
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-xs">評分項目簡介</label>
                            <textarea 
                                v-model="content"
                                type="text"
                                placeholder=""
                                class="flex-1 px-4 py-2 bg-gray-100 border transition-all ease-in-out border-gray-100 text-gray-600 rounded-lg focus:outline-none w-[400px] h-[80px] text-[12px] focus:border-[#042A2B] focus:ring-1"
                                rows="5"
                            ></textarea>
                        </div>
                        <div class="mb-4">
                            <label class="block mb-1 text-xs">評分項目圖片</label>
                            <input type="file" @change="onFileChange"  class=" transition-all ease-in-out file-input file-input-[#042A2B] bg-gray-100  rounded-lg  hover:border-[#042A2B] hover:ring-1"  accept="image/*"  />
                        </div>
                        <div class="flex justify-end">
                            <button type="submit" class="bg-[#042A2B] cursor-pointer transition-all ease-in-out text-white rounded-lg text-[14px] mt-9 w-[100px] px-4 py-2 rounded">新增</button>
                        </div>
                    </form>
                    </div>

                </div>
            </dialog>

            
        </div>

        <div class="w-[1000px] mx-auto mt-6 flex gap-6 text-black">
            <!-- 左側分類 -->
            <div class="w-1/4">
                <ul class="space-y-2 ">
                    <li>
                        <a href="#" class="flex items-center gap-3 px-3 py-2 transition-all ease-in-out text-[14px] bg-gray-200 rounded hover:bg-gray-200"><ChartPie class="w-4 h-4" />最新</a>
                    </li>
                <li><a href="#" class="flex items-center gap-3 px-3 py-2 transition-all ease-in-out text-[14px] rounded hover:bg-gray-100"><GraduationCap class="w-4 h-4" />老師</a></li>
                <li><a href="#" class="flex items-center gap-3 px-3 py-2 transition-all ease-in-out text-[14px] rounded hover:bg-gray-100"><BookOpen class="w-4 h-4" />課程</a></li>
                <li><a href="#" class="flex items-center gap-3 px-3 py-2 transition-all ease-in-out text-[14px] rounded hover:bg-gray-100"><Toilet class="w-4 h-4" />廁所</a></li>
                <li><a href="#" class="flex items-center gap-3 px-3 py-2 transition-all ease-in-out text-[14px] rounded hover:bg-gray-100"><Speech class="w-4 h-4" />八卦</a></li>
                </ul>
            </div>

            <!-- 右側評分貼文 -->
            <div class="flex-1 space-y-4">
                <h2 class="text-l font-bold text-gray-800">一共有 {{ totalRatings }} 個評分</h2>
                
                <!-- 可點擊的評分卡片 -->
                <div v-for="rating in ratings" :key="rating.id" 
                     @click="openRatingDetail(rating.id)"
                     class="bg-white rounded-lg p-2 flex gap-4 hover:bg-gray-200 cursor-pointer transition-all ease-in-out">
                    <!-- 左邊圖片 -->
                    <img :src="`/uploads/ratingImg/${rating.image_name}`" class="w-[250px] h-[150px] object-cover rounded-md" />
                    
                    <!-- 右側文字與評分 -->
                    <div class="flex flex-col justify-between flex-1">
                    <!-- 上方文字區塊 -->
                    <div>
                        <h2 class="text-lg font-bold text-gray-800">{{ rating.title }}</h2>
                        <p class="text-sm text-gray-500 mt-3 line-clamp-2">{{ rating.content }}</p>
                        <p class="text-[12px] text-gray-400 mt-3">{{ rating.comment_count || 0 }}則留言 ． 1243熱度</p>
                    </div>
                    
                    <!-- 下方星星評分 -->
                    <div class="flex items-center gap-2 mt-4">
                        <!-- 分數數字 -->
                        <span class="text-[15px] text-yellow-400 font-medium">{{ rating.score || 0.0 }}</span>
                        
                        <!-- 星星圖示 -->
                        <div class="flex text-yellow-400">
                        <Star 
                          v-for="star in 5" 
                          :key="star"
                          :class="[
                            'w-3 h-3',
                            (rating.score || 0) >= star 
                              ? 'fill-yellow-400 stroke-yellow-400' 
                              : 'stroke-yellow-400'
                          ]"
                        />
                        </div>
                    </div>
                </div>
                </div>

                <!-- 載入中指示器 -->
                <div v-if="loading" class="flex justify-center py-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A2B]"></div>
                </div>
                
                <!-- 沒有更多資料提示 -->
                <div v-if="!hasMore && ratings.length > 0" class="text-center text-[13px] py-5 text-gray-400">
                    沒有更多評分了...（＞人＜；）
                </div>
            </div>
        </div>
    </div>

    <!-- Rating Detail Component -->
    <RatingDetail 
    ref="ratingDetailRef" 
    @commentAdded="handleCommentAdded" 
    @scoreUpdated="handleScoreUpdated"
    />
  </div>
</template>

<style>
/* 加上進場動畫樣式 */
.slide-in-enter-from {
  transform: translateX(100%);
}
.slide-in-enter-active {
  transition: transform 0.5s ease;
}
.slide-in-enter-to {
  transform: translateX(0%);
}
</style>

<script setup>
import { Sparkles, ChartPie, BookOpen, GraduationCap, Toilet, Speech, Star, Plus } from 'lucide-vue-next'
import { useAuthStore } from '/stores/auth'
import { ref, onMounted, onUnmounted } from 'vue'
import RatingDetail from '../components/RatingDetail.vue'

const auth = useAuthStore()

const title = ref('')
const content = ref('')
const submitted = ref(false)
const imageFile = ref(null)
const imageUrl = ref('')

// 懶加載相關變數
const ratings = ref([])
const loading = ref(false)
const hasMore = ref(true)
const currentPage = ref(0)
const totalRatings = ref(0)

// Rating detail component reference
const ratingDetailRef = ref(null)

// 開啟評分詳細頁面
function openRatingDetail(ratingId) {
  ratingDetailRef.value.openModal(ratingId)
}

// 載入評分資料
async function loadRatings() {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const res = await fetch(`/api/rating?page=${currentPage.value}`)
    if (res.ok) {
      const data = await res.json()
      ratings.value.push(...data.ratings)
      hasMore.value = data.hasMore
      totalRatings.value = data.total
      currentPage.value++
    }
  } catch (error) {
    console.error('載入評分失敗:', error)
  } finally {
    loading.value = false
  }
}

// 滾動事件處理
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // 當滾動到接近底部時載入更多資料
  if (scrollTop + windowHeight >= documentHeight - 100) {
    loadRatings()
  }
}

function onFileChange(e) {
  imageFile.value = e.target.files[0]
}

async function submitForm() {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('content', content.value)
  formData.append('user_id', auth.user.id)
  if (imageFile.value) {
    formData.append('image', imageFile.value)
  }

  const res = await fetch('/api/rating', {
    method: 'POST',
    body: formData
  })

  if (res.ok) {
    const data = await res.json()
    submitted.value = true
    imageUrl.value = data.imageUrl
    // 重新載入第一頁資料
    ratings.value = []
    currentPage.value = 0
    hasMore.value = true
    loadRatings()
  }
}

// Handle comment added event
async function handleCommentAdded(ratingId) {
  // Find and update the specific rating in the list
  const ratingIndex = ratings.value.findIndex(r => r.id === ratingId)
  if (ratingIndex !== -1) {
    // Fetch updated rating data
    try {
      const res = await fetch(`/api/rating/${ratingId}`)
      if (res.ok) {
        const data = await res.json()
        // Update the comment count in the ratings list
        ratings.value[ratingIndex].comment_count = data.comments.length
      }
    } catch (error) {
      console.error('Failed to update comment count:', error)
    }
  }
}

function handleScoreUpdated(ratingId, newScore) {
  // Find and update the specific rating in the list
  const ratingIndex = ratings.value.findIndex(r => r.id === ratingId)
  if (ratingIndex !== -1) {
    ratings.value[ratingIndex].score = newScore
  }
}

onMounted(() => {
  loadRatings()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const modalRef = ref(null)
const showLeft = ref(false)

function openModal() {
  modalRef.value.showModal()
  showLeft.value = false
  setTimeout(() => {
    showLeft.value = true // 控制左側區塊出現（會觸發動畫）
  }, 300) // 可視右側內容完成時間調整延遲（單位毫秒）
}

function closeModal() {
  showLeft.value = false
  modalRef.value.close()
}
</script>