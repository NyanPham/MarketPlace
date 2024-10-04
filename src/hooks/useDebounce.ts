import { useEffect } from "react"
import useTimeout from "./useTimeout"

export default function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  dependencies: Parameters<T>[0][]
) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}