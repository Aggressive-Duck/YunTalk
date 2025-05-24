<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-black">
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="mb-4">
        <label class="block mb-1">Title</label>
        <input v-model="title" class="w-full border rounded px-2 py-1" placeholder="Enter title" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Content</label>
        <textarea v-model="content" class="w-full border rounded px-2 py-1" rows="5" placeholder="Enter content"></textarea>
      </div>
      <div class="mb-4">
        <label class="block mb-1">Image</label>
        <input type="file" @change="onFileChange" accept="image/*" class="w-full" />
      </div>
      <button type="submit" class="bg-blue-500 text-black px-4 py-2 rounded">Submit</button>
    </form>
    <div v-if="submitted" class="mt-4 text-green-600">
      Post submitted!<br />
      <strong>Title:</strong> {{ title }}<br />
      <strong>Content:</strong> {{ content }}<br />
      <div v-if="imageUrl">
        <img :src="imageUrl" alt="Uploaded" class="mt-2 max-w-xs" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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