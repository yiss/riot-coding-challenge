import { Hono } from 'hono'
import { computeMRR } from './service'
import { Month, Currency } from './types'

import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger())

app.get('/', (c) => c.json({ status: 'ok' }))
app.get('/mrr', async (c) => {
	let { month, currency } = c.req.query()
	month = month.replace('+', ' ')

	const result = await computeMRR(month as Month, currency as Currency)
	console.log(result)

	return c.json({ result, currency })
})

app.get('/diff', async (c) => {
	const { month, currency, subscriptionId } = c.req.query()
	const result = await computeMRR(
		decodeUriComponent(month) as Month,
		currency as Currency,
	)
	c.json({ result, currency })
})
export default app
