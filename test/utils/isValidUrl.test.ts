import { isValidUrl } from '@/utils/isValidUrl'

describe('isValidUrl', () => {
    it.each([
        ['http://testUrl'],
        ['https://testUrl'],
        ['http://www.google.com'],
        ['https://www.google.com'],
    ])('should return true for valid url: %s', (input) => {
        expect(isValidUrl(input)).toBeTruthy()
    })

    it.each([[''], ['not a valid url'], ['ftp://testUrl'], ['www.google.com']])(
        'should return false for invalid url: %s',
        (input) => {
            expect(isValidUrl(input)).toBeFalsy()
        }
    )
})
