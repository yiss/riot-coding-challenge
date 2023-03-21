import { exchangeCurrency, monthBefore } from './utils'
import { fetchSubscriptions } from './client'
import { Currency, Month, Subscription, SubscriptionResponse } from './types'

// We'll use this cache instead of call the API everytime
// key is the month and value is the SubscriptionResponse received from the API
export const cache = new Map<string, SubscriptionResponse>()

export async function getSubscriptions(): Promise<SubscriptionResponse[]> {
	if (cache.size) {
		return Array.from(cache.values())
	} else {
		const subscriptions = await fetchSubscriptions()

		if (subscriptions) {
			subscriptions.forEach((sub) => cache.set(sub.date, sub))
			return subscriptions
		} else {
			throw new Error(
				`Can't fetch the subscription at the moment! Please try again later`,
			)
		}
	}
}

export async function getSubscriptionsByMonth(month: Month) {
	if (cache.size && cache.has(month)) {
		return cache.get(month)
	}
	const subscriptions = await getSubscriptions()
	console.log({ subscriptions })

	const subscriptionsForMonth = subscriptions.find((sub) => sub.date === month)

	if (subscriptionsForMonth) return subscriptionsForMonth
	else throw Error(`No subscriptions found for month : ${month}`)
}

/**
 * This function computes the MRR for all the subscription for a given month
 * @param month the month for which we want to computes MRR
 * @returns the string reprisentation of the MRR
 */
export async function computeMRR(
	month: Month,
	currency: Currency,
): Promise<string> {
	const subscriptions = await getSubscriptionsByMonth(month)

	const sum = subscriptions?.subscriptions.reduce((acc, currentSub) => {
		if (currentSub.status === 'canceled') return acc
		// First we compute the sum of all the subscription items including the percent_off
		const originSubscipritonSum = computeSubscriptionSumWithDiscount(currentSub)
		// Then we convert the the sum to the desired currency
		const subsciptionSumInCurrency = exchangeCurrency(
			originSubscipritonSum,
			currentSub.currency,
			currency,
		)
		return acc + subsciptionSumInCurrency
	}, 0)
	// Since the sum is in cents we coverted into the either USD or EUR
	if (sum) return (sum / 100).toFixed(2)
	else return '0'
}

/**
 * This function allows us to sum the items of the subsciption
 * It's sum quantity x unit_amount for each item of the
 * The retured sum is in the original currency and in cents
 * @param subscription : The subscription for which we want to compute the sum
 * @returns the sum of the subscription
 */
export function sumSubscriptionItems(subscription?: Subscription): number {
	if (subscription) {
		// allows us to convert from yearly to monthly subscription
		// we basically convert a year into 12 month
		const factor = subscription.interval === 'yearly' ? 12 : 1
		// we sum the items in the subscription
		return subscription.items.reduce((acc, curr) => {
			return acc + (curr.unit_amount * curr.quantity) / factor
		}, 0)
	}
	return 0
}

/**
 * Computes the sum of all the subscription items minus the percent_off
 * @param subscription The subscription for which we want to compute the sum
 * @returns The sum of the subscription minus the percent_off
 */
export function computeSubscriptionSumWithDiscount(
	subscription?: Subscription,
): number {
	if (subscription) {
		const sum = sumSubscriptionItems(subscription)
		return (sum * (100 - subscription.percent_off)) / 100
	}
	return 0
}

/**
 * Computes the difference in the MRR of specifici subscription given subscriptionId
 * between the curren month and previous month
 * @param month The current month
 * @param subscriptionId The subscription id for which we want to get the MRR
 * @param currency the currency of the desired result
 * @returns a string reperesentation of the result in the desired currency
 */
export async function getSubscriptionDiffByMonth(
	month: Month,
	subscriptionId: string,
	currency: Currency,
): Promise<string | undefined> {
	const prevMonth = monthBefore(month)

	if (prevMonth) {
		const currentMonthSubs = await getSubscriptionsByMonth(month)
		const prevMonthSubs = await getSubscriptionsByMonth(prevMonth)
		const prevSub = prevMonthSubs?.subscriptions.find(
			(sub) => sub.id === subscriptionId,
		)
		const currSub = currentMonthSubs?.subscriptions.find(
			(sub) => sub.id === subscriptionId,
		)
		if (prevSub && currSub) {
			// We assuume hee the the subscription does not change the currency
			const sumCurrSub = exchangeCurrency(
				computeSubscriptionSumWithDiscount(currSub),
				currSub.currency,
				currency,
			)
			const sumPrevSub = exchangeCurrency(
				computeSubscriptionSumWithDiscount(prevSub),
				currSub.currency,
				currency,
			)
			const diff = sumCurrSub - sumPrevSub
			if (diff) return (diff / 100).toFixed(2)
			return ''
		} else {
			throw new Error(`The data for the ${subscriptionId} was not found`)
		}
	} else {
		throw new Error(`No data found for the mounth ${month}`)
	}
}
