export type Currency = 'usd' | 'eur'
export type Month = `${'Jan' | 'Feb' | 'Mar'} 22`

export type SubscriptionResponse = {
	date: string
	subscriptions: Subscription[]
}

export type SubscriptionStatus = 'canceled' | 'active'
export type SubscriptionInterval = 'monthly' | 'yearly'

export type Subscription = {
	id: string
	status: SubscriptionStatus
	items: SubscriptionItem[]
	interval: SubscriptionInterval
	currency: Currency
	percent_off: number
}

export type SubscriptionItem = {
	id: string
	unit_amount: number
	module: string
	quantity: number
}

export type Response = {}
