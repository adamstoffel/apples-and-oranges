import CompareRequest from '@/models/CompareRequest'
import CompareResult from '@/models/CompareResult'
import { createClient } from '@vercel/kv'
import { v4 as uuid } from 'uuid'

type StoredComparison = {
    request: CompareRequest
    result: CompareResult
}

const RECENT_KEYS_LIST = 'RECENT_KEYS_LIST'
const MAXIMUM_RECENT_KEYS = 100

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
        await this.client.set<StoredComparison>(id, {
            request,
            result,
        })
        await this.client.lpush(RECENT_KEYS_LIST, id)
        await this.client.ltrim(RECENT_KEYS_LIST, 0, MAXIMUM_RECENT_KEYS)
        return id
    }

    public async fetchComparison(id: string) {
        return await this.client.get<StoredComparison>(id)
    }

    public async fetchRecentComparisons(count: number) {
        const keys = await this.client.lrange(
            RECENT_KEYS_LIST,
            0,
            Math.min(count, MAXIMUM_RECENT_KEYS) - 1
        )
        if (keys.length < 1) {
            return []
        }
        const data = await this.client.mget<StoredComparison[]>(...keys)
        const returnVal = [] as Array<StoredComparison & { id: string }>
        for (let i = 0; i < keys.length; i++) {
            returnVal.push({
                id: keys[i],
                ...data[i],
            })
        }
        return returnVal
    }
}
