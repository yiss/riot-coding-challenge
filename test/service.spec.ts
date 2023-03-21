import { afterEach, beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest'

import { cache, computeMRR, computeSubscriptionSumWithDiscount, getSubscriptionDiffByMonth } from '../src/service'

import { Subscription } from '../src/types'
import { mockedHttpResponseForJan22, mockedSubscriptionWithPercentOff, mockedSubscriptionWithoutPercentOff, mockedHttpResponseForFeb22 } from './data.mock'


vi.mock('../src/client')

import { fetchSubscriptions } from '../src/client'

describe('service.test', () => {
	afterEach(() => {
		vi.resetAllMocks()
		vi.clearAllMocks()
		// clear cache after every test
		cache.clear()
	})

	it('sould compute sum subscription with percent_off in cents', () => {
		const sum = computeSubscriptionSumWithDiscount(
			mockedSubscriptionWithPercentOff,
		)
		expect(sum).toEqual(3990)
	})

	it('should compute sum subscription without percent_off', () => {
		const sum = computeSubscriptionSumWithDiscount(
			mockedSubscriptionWithoutPercentOff,
		)
		expect(sum).toEqual(35910)
	})
	it('computeMRR for Jan 22 should return 2537.76 USD', async () => {
		vi.mocked(fetchSubscriptions).mockResolvedValueOnce([mockedHttpResponseForJan22])
		const mrr = await computeMRR('Jan 22', 'usd')
		expect(mrr).toEqual('2537.76')
	})

	it('computeMRR for Jan 22 should return 2351.59 EUR', async () => {
		vi.mocked(fetchSubscriptions).mockResolvedValueOnce([mockedHttpResponseForJan22])
		const mrr = await computeMRR('Jan 22', 'eur')
		expect(mrr).toEqual('2351.59')
	})

	it('computeMRR for Mar 22 should return 2413.62 EUR', async () => {
		vi.mocked(fetchSubscriptions).mockResolvedValueOnce([mockedHttpResponseForJan22])
		await expect(() => computeMRR('Mar 22', 'eur')).rejects.toThrowError('No subscriptions found for month : Mar 22')
	})

	it('getSubscriptionDiffByMonth shoudl return', async () => {
		
		vi.mocked(fetchSubscriptions).mockResolvedValueOnce([mockedHttpResponseForFeb22, mockedHttpResponseForJan22])
		const diffInUsd = await getSubscriptionDiffByMonth('Feb 22', 'sub-3', 'usd')
		const diffInEur = await getSubscriptionDiffByMonth('Feb 22', 'sub-3', 'eur')
		expect(diffInUsd).toEqual('-403.65')
		expect(diffInEur).toEqual('-373.75')
	})
})
