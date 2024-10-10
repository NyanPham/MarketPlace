import { User } from '../types'

const userCache: { [key: number]: User } = {}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/data/dev-users.json')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  data.forEach((user: User) => {
    userCache[user.id] = user
  })

  return data as User[]
}

async function fetchUserById(userId: number): Promise<User> {
  if (userCache[userId]) {
    return userCache[userId]
  }

  const response = await fetch(`/src/data/dev-users.json`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()

  const user = data.find((user: User) => user.id === userId) as User

  userCache[userId] = user
  return user
}

export { fetchUsers, fetchUserById }
