import { Tier } from '../types'

const tierCache: { [key: number]: Tier } = {}

async function fetchTiers(): Promise<Tier[]> {
  const response = await fetch('/data/dev-tiers.json')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  data.forEach((tier: Tier) => {
    tierCache[tier.id] = tier
  })

  return data as Tier[]
}

async function fetchTierById(tierId: number): Promise<Tier> {
  if (tierCache[tierId]) {
    return tierCache[tierId]
  }

  const response = await fetch(`/src/data/dev-tiers.json`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  const tier = data.find((tier: Tier) => tier.id === tierId) as Tier

  tierCache[tierId] = tier
  return tier
}

export { fetchTiers, fetchTierById }
