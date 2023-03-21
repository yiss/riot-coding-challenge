import { Hono } from 'hono'
import { computeMRR, getSubscriptionDiffByMonth } from './service'
import { Month, Currency } from './types'

import { logger } from 'hono/logger'
import { monthQueryParamParser } from './utils'

const app = new Hono()

app.use('*', logger())

app.get('/', (c) => c.json({ status: 'ok' }))

app.get('/mrr', async (c) => {
	let { month, currency } = c.req.query()
	month = monthQueryParamParser(month) as Month
	const result = await computeMRR(month as Month, currency as Currency)
	return c.json({ result, currency })
})

app.get('/diff', async (c) => {
	let { month, currency, subscriptionId } = c.req.query()
	month = monthQueryParamParser(month)
	const result = await getSubscriptionDiffByMonth(month as Month, subscriptionId, currency as Currency)
	return c.json({ result, currency })
})


export default app
