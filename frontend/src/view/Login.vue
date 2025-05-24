<template>
<div class="min-h-screen flex items-center justify-center bg-[#0E1013]">
  <div class="relative w-full max-w-md">
    
    <!-- 🔺這裡是 Logo -->
    <div class="flex justify-center -mt-20 mb-4">
      <img src="/img/logo.png" alt="Logo" class="w-27 h-27" />
    </div>

    <!-- ⬇️這是登入卡片 -->
    <div class="bg-white py-12 px-8 rounded-2xl shadow-md w-[500px] max-w-md font-[System]">
      <h2 class="text-[20px]  text-black text-center">歡迎回來 !</h2>
      <p v-if="error":class="[
          'text-[13px] text-center mb-6 mt-2',
          loginFailed ? 'text-[#fd3957] font-medium animate-shake' : 'text-gray-400'
          ]">{{ error }}</p>

      <form @submit.prevent="login" class="space-y-3">
        <div>
          <label class="label">
            <span class="label-text text-black text-[12px] ps-1">帳號</span>
          </label>
          <input v-model="username"  placeholder="" :class="['input input-bordered w-full bg-white  text-black outline-none focus:ring-0  rounded-lg  focus:outline-none focus:ring-0	',loginFailed ? 'border-red-500 focus:border-red-500 animate-shake' : 'border border-gray-300 focus:border-[#161511]']" />
        </div>

        <div>
          <label class="label mt-2">
            <span class="label-text text-black text-[12px] ps-1">密碼</span>
          </label>
          <input v-model="password" type="password" placeholder="" :class="['input input-bordered w-full bg-white  text-black outline-none focus:ring-0 rounded-lg  focus:outline-none focus:ring-0	',loginFailed ? 'border-red-500 focus:border-red-500 animate-shake' : 'border border-gray-300 focus:border-[#161511]']" />
        </div>

        <button  class="btn btn-primary bg-[#161511] hover:bg-[#1e1d18] text-white shadow-none  rounded-lg border-none w-full mt-5">登入</button>

      </form>

      <p class="text-center text-sm mt-6  text-gray-400">
        還沒有帳號?
        <a href="#" class="text-blue-600 pt-2 ps-1 hover:underline">不給你註冊</a>
      </p>
    </div>
    </div>
  </div>
  <p class="fixed bottom-2 left-1/2 -translate-x-1/2 text-[12px] text-gray-500 font-[System]">
    © 2025 YUNTALK. 第忘記幾組製作
  </p>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const username = ref('')
const password = ref('')
const error = ref('輸入帳號密碼即可登入')
const router = useRouter()
const loginFailed = ref(false)


async function login() {
  loginFailed.value = false
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
  if (res.ok) {
    const data = await res.json()
    auth.setAuthData(data) // 儲存 token 和 user
    router.push('/home')
  } else {
    const err = await res.json()
    error.value ='帳號或密碼錯誤 !'
    loginFailed.value = true
    await nextTick()
    loginFailed.value = true

  }
}
</script>
<style>
@keyframes shake {
  0% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
  100% { transform: translateX(0); }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>