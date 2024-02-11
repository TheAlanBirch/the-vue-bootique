import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    darkMode: false
  }),
  actions: {
    toggleDarkMode () {
      this.darkMode = !this.darkMode
    }
  }
})
