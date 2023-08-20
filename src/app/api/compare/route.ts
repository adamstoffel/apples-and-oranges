import { createApiError } from '@/models/ApiError'
import {
    isCompareRequest,
    validateCompareRequest,
} from '@/models/CompareRequest'
import CompareRequestResponse from '@/models/CompareRequestResponse'
import { NextResponse, type NextRequest } from 'next/server'
import { v4 as uuid } from 'uuid'

export async function POST(request: NextRequest) {
    const data = await request.json()
    if (!isCompareRequest(data)) {
        return NextResponse.json(createApiError('Invalid request'), {
            status: 400,
        })
    }

    const { errors } = validateCompareRequest(data)
    if (errors.length > 0) {
        return NextResponse.json(createApiError(errors.join('\n')), {
            status: 400,
        })
    }

    // TODO: Generate the actual LLM response
    const response = {
        resultId: uuid(),
    } satisfies CompareRequestResponse

    return NextResponse.json(response)
}
