<template>
  <div
    ref="scrollContainer"
    class="overflow-auto border rounded-lg relative"
    style="max-height: 600px; max-width: 600px;"
    @scroll.passive="handleScroll"
  >
    <table class="min-w-full">
      <thead class="sticky top-0 bg-white dark:bg-gray-800 shadow-sm z-10">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            class="px-4 py-3 text-left border-b-2 border-gray-200 dark:border-gray-700"
            @click="sortTable(header.key)"
          >
            <div class="flex items-center justify-between">
              <span>{{ header.title }}</span>
              <span v-if="photoStore.sortBy === header.key">
                {{ photoStore.sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </div>
          </th>
        </tr>
      </thead>
      
      <tbody>
        <tr
          v-for="photo in photoStore.photos"
          :key="photo.id"
          class="hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <td class="px-4 py-2 border">{{ photo.id }}</td>
          <td class="px-4 py-2 border">{{ photo.albumId }}</td>
          <td
            class="px-4 py-2 border max-w-[150px] truncate"
            :title="photo.title"
          >
            {{ photo.title }}
          </td>
          <td
            class="px-4 py-2 border max-w-[120px] truncate"
            :title="photo.url"
          >
            <a
              :href="photo.url"
              target="_blank"
              class="text-blue-600 dark:text-blue-400"
            >
              {{ photo.url }}
            </a>
          </td>
          <td class="px-4 py-2 border">
            <img
              :src="photo.thumbnailUrl"
              alt="Thumbnail"
              class="w-12 h-12 object-cover"
            />
          </td>
        </tr>

        <tr v-if="photoStore.isLoading" v-for="i in 3" :key="`skeleton-${i}`">
          <td :colspan="headers.length" class="px-4 py-2 border">
            <div class="h-4 w-full bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePhotoStore } from '../stores/photoStore'; // скорректируйте путь под ваш проект

const photoStore = usePhotoStore();
const scrollContainer = ref(null);

const headers = [
  { key: 'id', title: 'Ид' },
  { key: 'albumId', title: 'Альбом' },
  { key: 'title', title: 'Название' },
  { key: 'url', title: 'Ссылка' },
  { key: 'thumbnailUrl', title: 'Миниатюра' }
];


const handleScroll = () => {
  const container = scrollContainer.value;
  if (!container) return;

  const { scrollTop, scrollHeight, clientHeight } = container;
  const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;

  if (isNearBottom && !photoStore.isLoading && photoStore.hasMore) {
    photoStore.fetchPhotos();
  }
};


const sortTable = (key) => {
  photoStore.setSort(key);
  photoStore.resetPagination();
  photoStore.fetchPhotos();
};

onMounted(() => {
  // Добавляем обработчик скролла
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll);
  }
  
  // Если данных ещё нет, загружаем начальную страницу
  if (!photoStore.photos.length) {
    photoStore.fetchPhotos();
  }
});

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
thead {
  position: -webkit-sticky; /* Safari */
  position: sticky;         /* Остальные браузеры */
  top: 0;
}
</style>
