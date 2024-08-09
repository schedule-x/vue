import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { CalendarEvent } from '@schedule-x/calendar'

export default function (range: { start: string; end: string }) {
  return new Promise<CalendarEvent[]>((resolve) => {
    setTimeout(() => {
      const events = faker.helpers.arrayElements(
        Array.from({ length: 10 }, (_, index) => getItem(range, index === 0)),
        {
          min: 2,
          max: 8,
        }
      )
      resolve(events)
    }, 300)
  })
}

function getItem(
  range: { start: string; end: string },
  repeat: boolean
): CalendarEvent {
  const start = faker.date.between({ from: range.start, to: range.end })
  const end = dayjs(start).add(1, 'hour')
  return {
    id: faker.string.alpha(),
    title: faker.music.songName(),
    start: dayjs(start).format('YYYY-MM-DD HH:mm'),
    end: dayjs(end).format('YYYY-MM-DD HH:mm'),
    rrule: repeat
      ? `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;UNTIL=${dayjs(range.end).format(
          'YYYYMMDDTHHmmss'
        )}`
      : undefined,
  }
}
