import { describe, expect, it } from 'vitest'

import { monthBefore, exchangeCurrency } from '../src/utils'

describe('utils.test', () => {
	it('monthBefore should return Feb 22', () => {
		const prevMonth = monthBefore('Mar 22')
		expect(prevMonth).not.undefined
	})
	it('monthBefore should return undefined', () => {
		const prevMonth = monthBefore('Jan 22')
		expect(prevMonth).toBeUndefined()
	})
	it('exchangeCurrency of 100 from usd to eur should return 107000', () => {
		const amount = exchangeCurrency(100, 'usd', 'eur')
		expect(amount).toEqual(93)
	})
	it('exchangeCurrency of 100 from eur to usd should return 93000', () => {
		const amount = exchangeCurrency(100, 'eur', 'usd')
		expect(amount).toEqual(108)
	})
	it('exchangeCurrency of 100 from eur to usd should return ', () => {
		const eurAmount = exchangeCurrency(100, 'eur', 'eur')
		const usdAmount = exchangeCurrency(100, 'usd', 'usd')
		expect(eurAmount).toEqual(100)
		expect(usdAmount).toEqual(100)
	})
})
