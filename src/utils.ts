import { Currency, Month } from './types'

const USD_TO_EUR_XRATE = 1.07
const EUR_TO_USD_XRATE = 0.93

/**
 * Gets the previous month of a given month
 * @param month | The month for which we want to get the orevious mont
 * @returns The previous month
 */
export function monthBefore(month: Month): Month | undefined {
	switch (month) {
		case 'Feb 22':
			return 'Jan 22'
		case 'Mar 22':
			return 'Feb 22'
	}
}

/**
 * Exchanges an amounut of currency to the other amount of the other currecy
 * For example if the input currency is usd the result woukd be in eur
 * @param amount The amount in cents
 * @param currency The current currency
 */
export function exchangeCurrency(
	amount: number,
	from: Currency,
	to: Currency,
): number {
	if (from === to) return amount
	if (from === 'usd') return amount * USD_TO_EUR_XRATE
	else return amount * EUR_TO_USD_XRATE
}
