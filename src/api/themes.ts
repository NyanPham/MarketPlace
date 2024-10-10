import { Theme } from '../types'

const themeCache: { [key: number]: Theme } = {}

async function fetchThemes(): Promise<Theme[]> {
  const response = await fetch('/data/dev-themes.json')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  data.forEach((theme: Theme) => {
    themeCache[theme.id] = theme
  })

  return data as Theme[]
}

async function fetchThemeById(themeId: number): Promise<Theme> {
  if (themeCache[themeId]) {
    return themeCache[themeId]
  }

  const response = await fetch(`/src/data/dev-themes.json`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  const theme = data.find((theme: Theme) => theme.id === themeId) as Theme

  themeCache[themeId] = theme
  return theme
}

export { fetchThemes, fetchThemeById }
