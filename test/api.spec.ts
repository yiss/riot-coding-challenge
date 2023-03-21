import { describe, expect, it } from 'vitest'
import { serve } from '@hono/node-server'
import app from '../src/app'

import request from 'supertest'

describe('api.test', () => {
	const server = serve(app)
	it('GET /mrr should return 200', async () => {
		const res = await request(server).get('/mrr?currency=usd&month=Jan+22')
		expect(res.status).toBe(200)
	})
	it('GET /diff should return 200', async () => {
		const res = await request(server).get(
			'/diff?currency=usd&month=Feb+22&subscriptionId=sub-2',
		)
		expect(res.status).toBe(200)
	})
})
