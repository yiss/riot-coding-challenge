import { describe, expect, it, vi } from 'vitest'

import { computeMRR, computeSubscriptionSumWithDiscount } from '../src/service'
import { Subscription } from '../src/types'

const testSubscriptionWithPercentOff: Subscription = {
	id: 'sub-1',
	status: 'active',
	items: [
		{
			id: 'sub-1-item-1',
			module: 'awareness',
			unit_amount: 3990,
			quantity: 12,
		},
	],
	interval: 'yearly',
	currency: 'usd',
	percent_off: 0,
}

const testSubscriptionWithoutPercentOff: Subscription = {
	id: 'sub-1',
	status: 'active',
	items: [
		{
			id: 'sub-1-item-1',
			module: 'awareness',
			unit_amount: 399,
			quantity: 100,
		},
	],
	interval: 'monthly',
	currency: 'usd',
	percent_off: 10,
}

describe('service.test', () => {
	it('sould compute sum subscription with percent_off in cents', () => {
		const sum = computeSubscriptionSumWithDiscount(
			testSubscriptionWithPercentOff,
		)
		expect(sum).toEqual(3990)
	})

	it('should compute sum subscription without percent_off', () => {
		const sum = computeSubscriptionSumWithDiscount(
			testSubscriptionWithoutPercentOff,
		)
		expect(sum).toEqual(35910)
	})
	it('compute MRR', () => {
		// todo
	})
})
