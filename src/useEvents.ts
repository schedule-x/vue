import { useQuery } from '@tanstack/vue-query'
import { Ref } from 'vue'
import { DateRange } from './types'

import getRandomEvents from './getRandomEvents.ts'

export default function useEvents(
  startDate: Ref<DateRange['start']>,
  endDate: Ref<DateRange['end']>
) {
  const results = useQuery({
    queryKey: ['events', startDate, endDate],
    queryFn: async () => {
      return await getRandomEvents({
        start: startDate.value,
        end: endDate.value,
      })
    },
  })
  return results
}
