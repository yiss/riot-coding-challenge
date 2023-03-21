import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
	MockedFunction,
	afterEach,
} from 'vitest'
import { fetchSubscription, fetchSubscriptions } from '../src/client'
import { mockedHttpResponseForJan22 } from './data.mock'

import fetch, { Response } from 'node-fetch'
vi.mock('node-fetch')

describe('client.test', () => {
	let mockFetch: MockedFunction<typeof fetch>

	beforeEach(() => {
		mockFetch = fetch as MockedFunction<typeof fetch>
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	it('should retrun mocked response', async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockedHttpResponseForJan22),
		} as Response)
		const response = await fetchSubscription()
		expect(response).toBeDefined()
		expect(response?.date).toBe('Jan 22')
	})

	it('should retrun http error response', async () => {
		mockFetch.mockRejectedValue('Generic Error')
		await expect(() => fetchSubscription()).rejects.toThrowError(
			'Generic Error',
		)
	})

	it('should call fetch 3 times', async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockedHttpResponseForJan22),
		} as Response)
		const response = await fetchSubscriptions()
		expect(mockFetch).toBeCalledTimes(3)
		expect(response).toBeDefined()
		expect(response.length).toBe(3)
	})
})
