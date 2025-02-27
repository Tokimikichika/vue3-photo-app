import { defineStore } from 'pinia';
import axios from 'axios';

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    photos: [],
    isLoading: false,
    error: null,
    page: 1,
    hasMore: true,
    sortBy: null,
    sortDirection: 'asc'
  }),

  actions: {
    async fetchPhotos(albumIds = []) {
      if (!this.hasMore && albumIds.length === 0) return;
      
      this.isLoading = true;
      this.error = null;

      try {
        const params = {
          _page: this.page,
          _limit: albumIds.length ? 30 : 20,
          _sort: this.sortBy,
          _order: this.sortDirection,
          albumId: albumIds
        };

        const response = await axios.get('https://jsonplaceholder.typicode.com/photos', { params });
        const newData = response.data;

        if (this.page === 1) {
          this.photos = newData;
        } else {
          this.photos = [...this.photos, ...newData];
        }

        this.hasMore = newData.length > 0;
        
        this.page += 1;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },


    handleError(error) {
      if (error.code === 'ECONNABORTED') {
        this.error = 'Превышено время ожидания сервера';
      } else if (error.response) {
        this.error = `Ошибка сервера: ${error.response.status}`;
      } else {
        this.error = 'Проблема с сетью. Проверьте подключение';
      }
    },


    resetPagination() {
      this.page = 1;
      this.hasMore = true;
      this.photos = [];
    },


    setSort(sortBy) {
      if (this.sortBy === sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = sortBy;
        this.sortDirection = 'asc';
      }
    }
  }
});
