import Vue from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $formatCurrency: (value: number) => string
  }
}
