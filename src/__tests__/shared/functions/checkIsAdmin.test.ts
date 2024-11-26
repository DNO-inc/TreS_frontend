import { roles } from 'constants/index'
import { checkIsAdmin } from '../../shared/functions'
import { getUser } from '../../shared/functions/manipulateLocalStorage'

jest.mock('../../shared/functions/manipulateLocalStorage', () => ({
  getUser: jest.fn(),
}))

describe('checkIsAdmin', () => {
  it('should return true if user has the ADMIN role', () => {
    ;(getUser as jest.Mock).mockReturnValue({ role: { name: 'ADMIN' } })

    const result = checkIsAdmin()

    expect(result).toBe(true)
  })

  it('should return false if user does not have the ADMIN role', () => {
    ;(getUser as jest.Mock).mockReturnValue({ role: { name: 'USER' } })

    const result = checkIsAdmin()

    expect(result).toBe(false)
  })

  it('should handle case where user is not found (undefined)', () => {
    ;(getUser as jest.Mock).mockReturnValue(undefined)

    const result = checkIsAdmin()

    expect(result).toBe(false)
  })

  it('should handle case where getUser throws an error', () => {
    ;(getUser as jest.Mock).mockImplementation(() => {
      throw new Error('Error fetching user')
    })

    console.error = jest.fn()

    const result = checkIsAdmin()

    expect(result).toBe(false)
    expect(console.error).toHaveBeenCalledWith(new Error('Error fetching user'))
  })

  it('should return false if user has the specified role', () => {
    ;(getUser as jest.Mock).mockReturnValue({ role: { name: 'USER' } })

    const result = checkIsAdmin(roles.USER_ALL)

    expect(result).toBe(false)
  })
})
