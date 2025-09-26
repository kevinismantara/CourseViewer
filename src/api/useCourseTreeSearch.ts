import { useQuery, keepPreviousData } from '@tanstack/react-query'
import type { CourseItem } from '../components/CourseTreeViewer'

const BASE_URL = 'https://coursetreesearch-service-sandbox.dev.tophat.com/'

export type CourseTreeSearchResponse = CourseItem[]

export function useCourseTreeSearch(search?: string) {
  const trimmedQuery = (search ?? '').trim()

  const url = trimmedQuery
    ? `${BASE_URL}?query=${trimmedQuery}`
    : BASE_URL

  return useQuery<CourseTreeSearchResponse>({
    queryKey: ['courseTreeSearch', trimmedQuery],
    retry: (failCount, error) => {
      if (error.message.includes('server')) {
        return failCount < 3
      }
      return false
    },
    retryDelay: (attemptedRetries) => Math.min(1000 * 2 ** attemptedRetries, 5000),
    queryFn: async () => {
      const response = await fetch(url, { method: 'GET' })
      if (response.status >= 400 && response.status <= 405) {
        throw new Error(`Unable to retrieve courses. Please try again`)
      } else if (response.status >= 500 && response.status < 505 ) {
        throw new Error(`We're experiencing server troubles. Please try again later`)
      }
      return response.json() as Promise<CourseTreeSearchResponse>
    },
    enabled: trimmedQuery.length > 0,
    placeholderData: keepPreviousData,
  })
} 