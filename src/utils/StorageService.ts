import CompareRequest from '@/models/CompareRequest'
import CompareResult from '@/models/CompareResult'
import { createClient } from '@vercel/kv'
import { v4 as uuid } from 'uuid'

export default class StorageService {
    private readonly client = createClient({
        url: process.env.KV_REST_API_URL!,
        token: process.env.KV_REST_API_TOKEN!,
    })

    public async persistComparison(
        request: CompareRequest,
        result: CompareResult
    ) {
        const id = uuid()
        await this.client.set(
            id,
            JSON.stringify({
                request,
                result,
            })
        )
        return id
    }

    public async fetchComparison(id: string) {
        const data = await this.client.get(id)
        if (typeof data === undefined) return undefined
        return data as {
            request: CompareRequest
            result: CompareResult
        }
    }
}
