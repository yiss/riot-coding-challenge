import fetch, { Response } from 'node-fetch'
import { SubscriptionResponse } from './types'

export const SUBSCRIPTIONS_URL =
	'https://fake-subscriptions-api.fly.dev/api/subscriptions'

export class HTTPError extends Error {
	constructor(response: Response) {
		super(`Received an error with status : ${response.status}`)
	}
}

/**
 * Call the Subscription API one time and hanles the error from the API
 * @returns SubscriptionResponse when the response statuus is ok or throws an error
 */
export async function fetchSubscription(): Promise<
	SubscriptionResponse | undefined
> {
	
	const response = await fetch(SUBSCRIPTIONS_URL)
	
	if (response.ok) {
		return (await response.json()) as SubscriptionResponse
	}
	throw new HTTPError(response)
}
/**
 * In this function we call the Subscriptions API
 * Since the Subscriptions API cycles between Jan 22, Feb 22 and Mar 22
 * we can call the API 3 times and get all the subscriptions for those months at the same time
 */
export async function fetchSubscriptions(): Promise<SubscriptionResponse[]> {
	console.log('calling you');
	
	let subscriptions: SubscriptionResponse[] = []
	try {
		// We make 3 request in sequence to the API
		// The reason for this that we want to collect the changes of the API
		for (let i = 0; i < 3; i++) {
			const res = await fetchSubscription()
			if (res) subscriptions.push(res)
			else
				throw new Error(
					'Failed to fetch one of the subscription months. Please try again later!',
				)
		}
	} catch (err) {
		console.log(`There was an error while calling the subscription API ${err}`)
	}
	return subscriptions
}
