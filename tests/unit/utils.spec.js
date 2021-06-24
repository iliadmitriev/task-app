import {dateFormat, filterTruncate} from '@/filters';

describe('Utils', () => {
    it('check date parse filter', () => {
        const res1 = dateFormat('1991-01-01 12:00:00')
        expect(res1).toBe('1991-01-01')

        const res2 = dateFormat('12:00:00 Jan')
        expect(res2).toBe('12:00:00 Jan')
    })

    it('check text truncate filter', () => {
        expect(filterTruncate('', 10)).toBe('')
        expect(filterTruncate('ABC', 10)).toBe('ABC')
        expect(filterTruncate({}, 10)).toStrictEqual({})
        expect(filterTruncate()).toBe(undefined)
        expect(filterTruncate('hello world, long string!', 20, '...'))
            .toBe('hello world, long st...')

    })
})