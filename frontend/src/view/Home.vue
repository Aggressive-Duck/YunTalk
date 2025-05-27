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
          <a href="#" class="hover:underline">你媽</a>
          <a href="#" class="hover:underline">爆炸</a>
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
            <button  onclick="my_modal_1.showModal()" class="group px-4 ms-2 bg-[#042A2B] cursor-pointer transition-all ease-in-out  hover:bg-[#031b1c] text-white rounded-lg flex items-center justify-center">
                <Plus class="w-4 h-4 transition-all duration-500 group-hover:mr-2" />
                <span class="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500 ease-in-out">新增評分</span>
            </button>
            <dialog id="my_modal_1" class="modal">
                <div class="modal-box w-[800px] h-100 max-w-full p-0 rounded-lg overflow-hidden flex">

                    <!-- 左側區塊（2/6，背景色） -->
                    <div class="w-2/5 bg-[#042A2B] p-6">
                        <h3 class="text-2xl  text-white font-[bb]">新增評分項目</h3>
                        <p class="mt-3">新增一個新的評分項目，讓別人評分!</p>
                        
                    </div>

                    <!-- 右側內容區塊（4/6） -->    
                    <div class="w-3/5 p-6 text-black bg-white">
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
                    <h2 class="text-l font-bold text-gray-800">一共有 40,325 個評分</h2>
                        <div class="bg-white rounded-lg p-2 flex gap-4 hover:bg-gray-100 cursor-pointer transition-all ease-in-out">
                            <!-- 左邊圖片 -->
                            <img src="/img/1.jpg" class="min-w-[250px] h-[150px] object-cover rounded-md" />

                            <!-- 右側文字與評分 -->
                            <div class="flex flex-col justify-between flex-1">
                            <!-- 上方文字區塊 -->
                            <div>
                                <h2 class="text-lg font-bold text-gray-800">胖貓咪</h2>
                                <p class="text-sm text-gray-500 mt-3">他只是一隻聰明到靠北的貓咪。</p>
                                <p class="text-[12px] text-gray-400 mt-3">7則留言．5000則評分</p>

                            </div>

                            <!-- 下方星星評分 -->
                            <div class="flex items-center gap-2 mt-4 ">
                                <!-- 分數數字 -->
                                <span class="text-[15px] text-yellow-400 font-medium">4.8</span>

                                <!-- 星星圖示 -->
                                <div class="flex text-yellow-400">
                                <Star class="w-3 h-3 fill-yellow-400" />
                                <Star class="w-3 h-3 fill-yellow-400" />
                                <Star class="w-3 h-3 fill-yellow-400" />
                                <Star class="w-3 h-3 fill-yellow-400" />
                                <Star class="w-3 h-3 stroke-yellow-400" /> <!-- 空心星星 -->
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg p-2 flex gap-4 hover:bg-gray-100 cursor-pointer transition-all ease-in-out">
                            <!-- 左邊圖片 -->
                            <img src="/img/2.jpg" class="min-w-[250px] h-[150px] object-cover rounded-md" />

                            <!-- 右側文字與評分 -->
                            <div class="flex flex-col justify-between flex-1">
                            <!-- 上方文字區塊 -->
                            <div>
                                <h2 class="text-lg font-bold text-gray-800">有錢的貓咪</h2>
                                <p class="text-sm text-gray-500 mt-3">這是一個有錢到靠北的貓咪，但她不會給你錢。</p>
                                <p class="text-[12px] text-gray-400 mt-3">72則留言．120則評分</p>

                            </div>

                            <!-- 下方星星評分 -->
                            <div class="flex items-center gap-2 mt-4 ">
                                <!-- 分數數字 -->
                                <span class="text-[15px] text-yellow-400 font-medium">2.1</span>

                                <!-- 星星圖示 -->
                                <div class="flex text-yellow-400">
                                <Star class="w-3 h-3 fill-yellow-400" />
                                <Star class="w-3 h-3 fill-yellow-400" />
                                <StarHalf class="w-3 h-3 stroke-yellow-400 fill-yellow-400" />
                                <Star class="w-3 h-3 stroke-yellow-400" />
                                <Star class="w-3 h-3 stroke-yellow-400" /> <!-- 空心星星 -->
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg p-2 flex gap-4 hover:bg-gray-100 cursor-pointer transition-all ease-in-out">
                            <!-- 左邊圖片 -->
                            <img src="/img/3.jpg" class="min-w-[250px] h-[150px] object-cover rounded-md" />

                            <!-- 右側文字與評分 -->
                            <div class="flex flex-col justify-between flex-1">
                            <!-- 上方文字區塊 -->
                            <div>
                                <h2 class="text-lg font-bold text-gray-800">被腰斬的貓咪</h2>
                                <p class="text-sm text-gray-500 mt-3">被貸款王腰斬的貓咪，他很可憐。</p>
                                <p class="text-[12px] text-gray-400 mt-3">2則留言．10則評分</p>

                            </div>

                            <!-- 下方星星評分 -->
                            <div class="flex items-center gap-2 mt-4 ">
                                <!-- 分數數字 -->
                                <span class="text-[15px] text-yellow-400 font-medium">2</span>

                                <!-- 星星圖示 -->
                                <div class="flex text-yellow-400">
                                <Star class="w-3 h-3 fill-yellow-400" />
                                <Star class="w-3 h-3 fill-yellow-400" />
                                <StarHalf class="w-3 h-3 stroke-yellow-400 fill-yellow-400" />
                                <Star class="w-3 h-3 stroke-yellow-400" />
                                <Star class="w-3 h-3 stroke-yellow-400" /> <!-- 空心星星 -->
                                </div>
                            </div>
                            </div>
                        </div>
                        
                    <!-- 更多卡片... -->
                </div>
            </div>
    </div>
  </div>
</template>

<script setup>
import { Sparkles,Search,LoaderPinwheel,ChartPie,BookOpen,GraduationCap,Toilet,Speech,Star, StarHalf,Plus} from 'lucide-vue-next'
import { useAuthStore } from '/stores/auth'
import { ref } from 'vue'
const auth = useAuthStore()

const title = ref('')
const content = ref('')
const submitted = ref(false)
const imageFile = ref(null)
const imageUrl = ref('')

function onFileChange(e) {
  imageFile.value = e.target.files[0]
}

async function submitForm() {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('content', content.value)
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
    imageUrl.value = data.imageUrl // URL to the uploaded image
  }
}
</script>