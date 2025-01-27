import { defineStore } from 'pinia';

export const useTelegramStore = defineStore('telegramStore', {
  // arrow function recommended for full type inference
  state: () => ({
    botToken: '',
    chartId: '',
  }),
  actions: {
    setBotToken(_botToken: string) {
      this.botToken = _botToken;
      localStorage.setItem('botToken', this.botToken);
    },
    setChartId(_chartId: string) {
      this.chartId = _chartId
      localStorage.setItem('chartId', this.chartId);
    },
    loadTokenAndChartId() {
      const botToken = localStorage.getItem('botToken');
      const chartId = localStorage.getItem('chartId');
      if(botToken) {
        this.setBotToken(botToken)
      }
      if(chartId) {
        this.setChartId(chartId)
      }
    }
  }
})