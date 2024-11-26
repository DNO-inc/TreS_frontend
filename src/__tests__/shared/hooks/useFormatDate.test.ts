import { renderHook } from '@testing-library/react'
import { useFormatDate } from '../../shared/hooks/useFormatDate'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn((key: string) => {
      const translations: Record<string, string> = {
        'month.01': 'January',
        'month.02': 'February',
        'month.03': 'March',
        'month.04': 'April',
        'month.05': 'May',
        'month.06': 'June',
        'month.07': 'July',
        'month.08': 'August',
        'month.09': 'September',
        'month.10': 'October',
        'month.11': 'November',
        'month.12': 'December',
      }
      return translations[key] || key
    }),
  }),
}))

describe('useFormatDate', () => {
  it("should return 'date' if no date is provided", () => {
    const { result } = renderHook(() => useFormatDate(''))
    expect(result.current).toBe('date')
  })

  it("should return 'date' if dateFormat is not provided", () => {
    const { result } = renderHook(() => useFormatDate('2024-11-25T14:35:00Z'))
    expect(result.current).toBe('25 November 2024')
  })

  it("should return 'time' format when dateFormat is 'time'", () => {
    const { result } = renderHook(() =>
      useFormatDate('2024-11-25T14:35:00Z', 'time')
    )
    expect(result.current).toBe('14:35')
  })

  it("should return 'date' format when dateFormat is 'date'", () => {
    const { result } = renderHook(() =>
      useFormatDate('2024-11-25T14:35:00Z', 'date')
    )
    expect(result.current).toBe('25 November 2024')
  })

  it("should return 'full' format when dateFormat is 'full'", () => {
    const { result } = renderHook(() =>
      useFormatDate('2024-11-25T14:35:00Z', 'full')
    )
    expect(result.current).toBe('25 November 2024 14:35')
  })

  it('should return correct month translation for different months', () => {
    const months = [
      { date: '2024-01-25T14:35:00Z', expected: '25 January 2024' },
      { date: '2024-02-25T14:35:00Z', expected: '25 February 2024' },
      { date: '2024-03-25T14:35:00Z', expected: '25 March 2024' },
      { date: '2024-04-25T14:35:00Z', expected: '25 April 2024' },
      { date: '2024-05-25T14:35:00Z', expected: '25 May 2024' },
      { date: '2024-06-25T14:35:00Z', expected: '25 June 2024' },
      { date: '2024-07-25T14:35:00Z', expected: '25 July 2024' },
      { date: '2024-08-25T14:35:00Z', expected: '25 August 2024' },
      { date: '2024-09-25T14:35:00Z', expected: '25 September 2024' },
      { date: '2024-10-25T14:35:00Z', expected: '25 October 2024' },
      { date: '2024-11-25T14:35:00Z', expected: '25 November 2024' },
      { date: '2024-12-25T14:35:00Z', expected: '25 December 2024' },
    ]

    months.forEach(({ date, expected }) => {
      const { result } = renderHook(() => useFormatDate(date, 'date'))
      expect(result.current).toBe(expected)
    })
  })

  it('should handle edge case where date is null', () => {
    const { result } = renderHook(() =>
      useFormatDate(null as unknown as string, 'date')
    )
    expect(result.current).toBe('date')
  })

  it('should handle edge case where dateFormat is null', () => {
    const { result } = renderHook(() =>
      useFormatDate('2024-11-25T14:35:00Z', null as unknown as 'date')
    )
    expect(result.current).toBe('date')
  })
})
