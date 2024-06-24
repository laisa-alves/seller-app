import type { Ref } from 'vue'

export function previewImg(event: Event, imageSrc: Ref<string>) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = () => {
      imageSrc.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}
