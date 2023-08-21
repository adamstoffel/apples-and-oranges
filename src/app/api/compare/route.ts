import { createApiError } from '@/models/ApiError'
import {
    isCompareRequest,
    validateCompareRequest,
} from '@/models/CompareRequest'
import CompareRequestResponse from '@/models/CompareRequestResponse'
import ComparisonService from '@/utils/ComparisonService'
import StorageService from '@/utils/StorageService'
import { NextResponse, type NextRequest } from 'next/server'

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

    try {
        const comparisonService = new ComparisonService(data)
        const compareResult = await comparisonService.getResponse()

        const storageService = new StorageService()
        const resultId = await storageService.persistComparison(
            data,
            compareResult
        )

        return NextResponse.json({ resultId } satisfies CompareRequestResponse)
    } catch (err) {
        return NextResponse.json(
            createApiError(err?.toString() ?? 'An unknown error occurred.'),
            {
                status: 500,
            }
        )
    }
}
