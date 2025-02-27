<template>
  <div class="min-h-screen p-8 transition-colors duration-300 bg-white dark:bg-gray-900">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold dark:text-white">Фотоальбом</h1>
    </div>
    <PhotoFilter />
    <PhotoTable />
    
    <div 
      v-if="photoStore.error"
      class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg"
    >
      Ошибка: {{ photoStore.error }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PhotoFilter from './components/PhotoFilter.vue';
import PhotoTable from './components/PhotoTable.vue';
import { usePhotoStore } from './stores/photoStore';
import ThemeToggle from './components/ThemeToggle.vue';

const photoStore = usePhotoStore();

onMounted(() => {
  photoStore.fetchPhotos();
});
</script>