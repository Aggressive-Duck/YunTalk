<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 text-black">
    <form @submit.prevent="login" class="bg-white p-8 rounded shadow-md">
      <div>
        <label>Username:</label>
        <input v-model="username" class="border p-1" />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" class="border p-1" />
      </div>
      <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
  if (res.ok) {
    const data = await res.json()
    localStorage.setItem('token', data.token)
    router.push('/home')
  } else {
    const err = await res.json()
    error.value = err.error || 'Login failed'
  }
}
</script>