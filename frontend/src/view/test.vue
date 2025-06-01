<template>
  <div class="min-h-screen flex flex-col font-[System] bg-white">
    <!-- Top Section -->
    <div class="h-[400px] m-2 bg-[#042A2B] text-white flex flex-col rounded-2xl relative overflow-hidden">
      <img src="/img/big_cat.png" alt="Decorative Cat"
        class="absolute -right-20 top-10 w-[700px] opacity-50 pointer-events-none" />
      <nav class="w-full flex justify-between items-center px-6">
        <img src="/img/logo.png" alt="Logo" class="w-27 h-27" />
        <div class="space-x-4">
          <a href="#" class="hover:underline">{{ auth.user.id }}</a>
          <a href="#" class="hover:underline">爆炸</a>
        </div>
      </nav>
      <div class="flex-1 flex flex-col items-center justify-center -mt-10 text-center">
        <h1 class="text-5xl font-[bb]">在這裡 評分一切 找到所有你喜歡的</h1>
        <p class="mt-4 text-l text-white">探索、評論、分享你的觀點</p>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="w-full bg-white">
      <div class="flex w-[1000px] mt-8 mx-auto">
        <input type="text" placeholder="搜尋評分項目"
          class="flex-1 px-4 py-2 bg-gray-100 border text-gray-600 rounded-lg focus:border-[#042A2B] focus:ring-1 h-[50px] text-[14px]" />
        <button onclick="my_modal_1.showModal()"
          class="group px-4 ms-2 bg-[#042A2B] text-white rounded-lg flex items-center justify-center">
          <Plus class="w-4 h-4" />
          <span class="ml-2">新增評分</span>
        </button>
      </div>

      <div class="w-[1000px] mx-auto mt-6 flex gap-6 text-black">
        <div class="w-1/4">
          <ul class="space-y-2">
            <li v-for="item in menu" :key="item.label">
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
                <component :is="item.icon" class="w-4 h-4" />{{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Rating List -->
        <div class="flex-1 space-y-4">
          <h2 class="text-l font-bold text-gray-800">一共有 {{ totalRatings }} 個評分</h2>

          <div v-for="rating in ratings" :key="rating.id" @click="openDetail(rating.id)"
            class="bg-white rounded-lg p-2 flex gap-4 hover:bg-gray-100 cursor-pointer">
            <img :src="`/uploads/ratingImg/${rating.image_name}`"
              class="min-w-[250px] h-[150px] object-cover rounded-md" />
            <div class="flex flex-col justify-between flex-1">
              <h2 class="text-lg font-bold text-gray-800">{{ rating.title }}</h2>
              <p class="text-sm text-gray-500 mt-3">{{ rating.content }}</p>
              <p class="text-xs text-gray-400 mt-3">0則留言．0則評分</p>
              <div class="flex items-center gap-2 mt-4 text-yellow-400">
                <span class="text-sm font-medium">0</span>
                <Star v-for="n in 5" :key="n" class="w-3 h-3" />
              </div>
            </div>
          </div>

          <div v-if="loading" class="flex justify-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A2B]"></div>
          </div>

          <div v-if="!hasMore && ratings.length > 0" class="text-center py-4 text-gray-500">
            沒有更多評分了
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Detail Modal -->
  <div v-if="showDetail" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- 半透明黑色背景 -->
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeDetail"></div>

    <!-- 白色內容區塊 -->
    <div class="relative z-10 bg-white rounded-lg max-w-2xl w-full mx-4">
      <button @click="closeDetail" class="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
        ✕
      </button>
      <RatingDetail v-if="selectedId" :id="selectedId" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Plus, ChartPie, BookOpen, GraduationCap, Toilet, Speech, Star } from 'lucide-vue-next';
import { useAuthStore } from '/stores/auth';
import RatingDetail from './RatingDetail.vue';

const auth = useAuthStore();
const title = ref('');
const content = ref('');
const imageFile = ref(null);
const ratings = ref([]);
const loading = ref(false);
const hasMore = ref(true);
const currentPage = ref(0);
const totalRatings = ref(0);
const showDetail = ref(false);
const selectedId = ref(null);

const menu = [
  { label: '最新', icon: ChartPie },
  { label: '老師', icon: GraduationCap },
  { label: '課程', icon: BookOpen },
  { label: '廁所', icon: Toilet },
  { label: '八卦', icon: Speech },
];

function openDetail(id) {
  console.log('點擊了貼文，ID 是:', id);
  selectedId.value = id;
  showDetail.value = true;
}

function closeDetail() {
  showDetail.value = false;
  selectedId.value = null;
}

async function loadRatings() {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    const res = await fetch(`/api/rating?page=${currentPage.value}`);
    if (res.ok) {
      const data = await res.json();
      ratings.value.push(...data.ratings);
      hasMore.value = data.hasMore;
      totalRatings.value = data.total;
      currentPage.value++;
    }
  } catch (err) {
    console.error('載入評分失敗:', err);
  } finally {
    loading.value = false;
  }
}

function onFileChange(e) {
  imageFile.value = e.target.files[0];
}

onMounted(() => {
  loadRatings();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  if (scrollTop + windowHeight >= documentHeight - 100) {
    loadRatings();
  }
}
</script>
