<template>
  <button
    @click="themeStore.toggleTheme"
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
  >
    <span v-if="themeStore.isDark">🌞</span>
    <span v-else>🌙</span>
  </button>
</template>

<script setup>
import { useThemeStore } from '../stores/themeStore';

const themeStore = useThemeStore();
</script>