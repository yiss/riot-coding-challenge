import { Subscription, SubscriptionResponse } from '../src/types'

export const mockedHttpResponseForFeb22: SubscriptionResponse = {
	date: 'Feb 22',
	subscriptions: [
		{
			id: 'sub-1',
			status: 'canceled',
			items: [
				{
					id: 'sub-1-item-1',
					module: 'awareness',
					unit_amount: 399,
					quantity: 12,
				},
			],
			interval: 'monthly',
			currency: 'usd',
			percent_off: 0,
		},
		{
			id: 'sub-2',
			status: 'active',
			items: [
				{
					id: 'sub-2-item-1',
					module: 'awareness',
					unit_amount: 399,
					quantity: 160,
				},
				{
					id: 'sub-2-item-2',
					module: 'simulation',
					unit_amount: 299,
					quantity: 150,
				},
			],
			interval: 'monthly',
			currency: 'eur',
			percent_off: 10,
		},
		{
			id: 'sub-3',
			status: 'active',
			items: [
				{
					id: 'sub-3-item-1',
					module: 'awareness',
					unit_amount: 3990,
					quantity: 250,
				},
			],
			interval: 'yearly',
			currency: 'eur',
			percent_off: 25,
		},
		{
			id: 'sub-4',
			status: 'active',
			items: [
				{
					id: 'sub-4-item-1',
					module: 'awareness',
					unit_amount: 399,
					quantity: 63,
				},
				{
					id: 'sub-4-item-2',
					module: 'simulation',
					unit_amount: 299,
					quantity: 25,
				},
			],
			interval: 'monthly',
			currency: 'usd',
			percent_off: 12.5,
		},
		{
			id: 'sub-5',
			status: 'active',
			items: [
				{
					id: 'sub-5-item-1',
					module: 'awareness',
					unit_amount: 3990,
					quantity: 100,
				},
				{
					id: 'sub-5-item-2',
					module: 'simulation',
					unit_amount: 2990,
					quantity: 100,
				},
			],
			interval: 'yearly',
			currency: 'eur',
			percent_off: 0,
		},
	],
}

export const mockedHttpResponseForJan22: SubscriptionResponse = {
	date: 'Jan 22',
	subscriptions: [
		{
			id: 'sub-1',
			status: 'active',
			items: [
				{
					id: 'sub-1-item-1',
					module: 'awareness',
					unit_amount: 399,
					quantity: 12,
				},
			],
			interval: 'monthly',
			currency: 'usd',
			percent_off: 0,
		},
		{
			id: 'sub-2',
			status: 'active',
			items: [
				{
					id: 'sub-2-item-1',
					module: 'awareness',
					unit_amount: 399,
					quantity: 150,
				},
				{
					id: 'sub-2-item-2',
					module: 'simulation',
					unit_amount: 299,
					quantity: 150,
				},
			],
			interval: 'monthly',
			currency: 'eur',
			percent_off: 10,
		},
		{
			id: 'sub-3',
			status: 'active',
			items: [
				{
					id: 'sub-3-item-1',
					module: 'awareness',
					unit_amount: 3990,
					quantity: 250,
				},
				{
					id: 'sub-3-item-2',
					module: 'simulation',
					unit_amount: 2990,
					quantity: 200,
				},
			],
			interval: 'yearly',
			currency: 'eur',
			percent_off: 25,
		},
		{
			id: 'sub-4',
			status: 'active',
			items: [
				{
					id: 'sub-4-item-1',
					module: 'awareness',
					unit_amount: 399,
					quantity: 63,
				},
				{
					id: 'sub-4-item-2',
					module: 'simulation',
					unit_amount: 299,
					quantity: 67,
				},
			],
			interval: 'monthly',
			currency: 'usd',
			percent_off: 12.5,
		},
	],
}

export const mockedSubscriptionWithPercentOff: Subscription = {
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

export const mockedSubscriptionWithoutPercentOff: Subscription = {
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
