<template>
  <div class="mb-6 flex gap-4 items-center" style="max-width: 600px; width: 100%;">
    <input
      v-model="albumIds"
      type="text"
      placeholder="Введите ID альбомов через пробел"
      class="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
      @keyup.enter="search"
    />
    <button 
      @click="search"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Поиск
    </button>
    <button
      @click="themeStore.toggleTheme"
      class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {{ themeStore.isDark ? '🌞' : '🌙' }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { usePhotoStore } from '../stores/photoStore';
import { useThemeStore } from '../stores/themeStore';
import { debounce } from 'lodash-es';

const photoStore = usePhotoStore();
const albumIds = ref('');
const themeStore = useThemeStore();

const search = () => {
  photoStore.resetPagination();
  photoStore.fetchPhotos(getAlbumIds());
};

const getAlbumIds = () => albumIds.value.split(' ').filter(id => id.trim() !== '').map(Number);

const debouncedSearch = debounce(() => {
  photoStore.resetPagination();
  photoStore.fetchPhotos(getAlbumIds());
}, 500);

watch(albumIds, debouncedSearch);
onMounted(() => search());
</script>