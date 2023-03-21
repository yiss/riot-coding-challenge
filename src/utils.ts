import { Currency, Month } from './types'

const USD_TO_EUR_XRATE = 0.93
const EUR_TO_USD_XRATE = 1.08

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

/**
 * Query Params that contains space are passed with + instead of the white space
 * This helper function helps as get the correct from
 * @param qParam The + seperated query param
 * @returns the query param with space instead of +
 */
export function monthQueryParamParser(qParam: string) {
	return qParam.replace('+', ' ')
}
