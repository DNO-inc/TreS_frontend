import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { useToggleAction } from '../../shared/hooks/useToggleAction'

describe('useToggleAction', () => {
  const mockToggleMutation = jest.fn()
  const mockSetState = jest.fn()
  const mockCallback = jest.fn()
  const ticketId = 123
  const option = 'testOption'
  const dependencies = [option]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call toggleMutation with correct arguments', () => {
    const { result } = renderHook(() =>
      useToggleAction({
        toggleMutation: mockToggleMutation,
        option,
        setState: mockSetState,
        ticketId,
        dependencies,
      })
    )

    act(() => {
      result.current()
    })

    expect(mockToggleMutation).toHaveBeenCalledWith({
      option: 'testOption',
      body: JSON.stringify({ ticket_id: 123 }),
    })
  })

  it('should toggle state using setState', () => {
    const { result } = renderHook(() =>
      useToggleAction({
        toggleMutation: mockToggleMutation,
        option,
        setState: mockSetState,
        ticketId,
        dependencies,
      })
    )

    act(() => {
      result.current()
    })

    expect(mockSetState).toHaveBeenCalledWith(expect.any(Function))

    const stateUpdater = mockSetState.mock.calls[0][0]
    expect(stateUpdater(true)).toBe(false)
    expect(stateUpdater(false)).toBe(true)
  })

  it('should call callback function after toggleMutation and setState', () => {
    const { result } = renderHook(() =>
      useToggleAction({
        toggleMutation: mockToggleMutation,
        option,
        setState: mockSetState,
        ticketId,
        dependencies,
        callback: mockCallback,
      })
    )

    act(() => {
      result.current()
    })

    expect(mockCallback).toHaveBeenCalled()
  })
})
