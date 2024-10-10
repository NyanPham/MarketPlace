import { useState, useEffect } from 'react'

function useFetch<T>(fetchFunction: () => Promise<T>, dependencies: any[] = []) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [value, setValue] = useState<T | null>(null)

  useEffect(() => {
    let isMounted = true

    setLoading(true)
    setError(null)

    const fetchData = () => {
      fetchFunction()
        .then((result) => {
          if (isMounted) {
            setValue(result)
            setLoading(false)
          }
        })
        .catch((error) => {
          if (isMounted) {
            setError(error)
            setLoading(false)
          }
        })
    }

    // Simulate delay of fetching data
    new Promise(() =>
      setTimeout(() => {
        fetchData()
      }, 3000),
    )

    return () => {
      isMounted = false
    }
  }, dependencies)

  return { loading, error, value }
}

export default useFetch
