import useAsync from "./useAsync"

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
}

export default function useFetch<T>(
  url: string,
  options: RequestInit = {},
  dependencies: any[] = []
): ReturnType<typeof useAsync<T>> {
  return useAsync<T>(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(res => {
      if (res.ok) return res.json() as Promise<T>
      return res.json().then(json => Promise.reject(json))
    })
  }, dependencies)
}
