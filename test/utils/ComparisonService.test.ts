import ComparisonService from '@/utils/ComparisonService'
import OpenAI from 'openai'

jest.mock('openai', () => {
    return jest.fn().mockImplementation(() => {
        return {
            chat: {
                completions: {
                    create: mockedChatCompletionsCreate,
                },
            },
        }
    })
})

const chatCompletionResponse = {
    id: 'chatcmpl-123',
    object: 'chat.completion',
    created: 1677652288,
    model: 'gpt-3.5-turbo-0613',
    choices: [
        {
            index: 0,
            message: {
                role: 'assistant' as const,
                content: 'Test response',
            },
            finish_reason: 'stop' as const,
        },
    ],
    usage: {
        prompt_tokens: 1,
        completion_tokens: 1,
        total_tokens: 2,
    },
}

const mockedChatCompletionsCreate = jest
    .fn<
        Promise<OpenAI.Chat.Completions.ChatCompletion>,
        [OpenAI.Chat.Completions.CompletionCreateParams]
    >()
    .mockResolvedValue(chatCompletionResponse)

function getComparisonService() {
    return new ComparisonService({
        topics: [
            {
                id: '1',
                name: 'Topic 1',
                sources: ['http://source1', 'http://source2'],
            },
            {
                id: '2',
                name: 'Topic 2',
                sources: ['http://source3', 'http://source4'],
            },
        ],
        prompt: 'My request',
    })
}

beforeEach(() => {
    mockedChatCompletionsCreate.mockClear()
})

describe('getResponse()', () => {
    it('should properly format request and result', async () => {
        const response = await getComparisonService().getResponse()

        expect(mockedChatCompletionsCreate).toBeCalledTimes(2)

        // Check both chat messages
        for (let i = 0; i < 2; i++) {
            expect(mockedChatCompletionsCreate.mock.calls[i][0].model).toMatch(
                /^gpt-3\.5/
            )
            expect(
                mockedChatCompletionsCreate.mock.calls[i][0].messages[0].role
            ).toBe('system')
            expect(
                mockedChatCompletionsCreate.mock.calls[i][0].messages[1].role
            ).toBe('user')
        }

        expect(
            mockedChatCompletionsCreate.mock.calls[0][0].messages[1].content
        ).toMatch(
            /^.*http:\/\/source1.*http:\/\/source2.*Prompt: My request.*$/s
        )

        expect(
            mockedChatCompletionsCreate.mock.calls[1][0].messages[1].content
        ).toMatch(
            /^.*http:\/\/source3.*http:\/\/source4.*Prompt: My request.*$/s
        )

        expect(response.responses).toHaveLength(2)

        expect(response.responses[0].topicId).toBe('1')
        expect(response.responses[0].topicName).toBe('Topic 1')
        expect(response.responses[0].narrative).toBe('Test response')

        expect(response.responses[1].topicId).toBe('2')
        expect(response.responses[1].topicName).toBe('Topic 2')
        expect(response.responses[1].narrative).toBe('Test response')
    })

    it('should throw if there is no response', async () => {
        const emptyResponse = {
            ...chatCompletionResponse,
            choices: [],
        }
        mockedChatCompletionsCreate.mockResolvedValue(emptyResponse)

        await expect(getComparisonService().getResponse()).rejects.toThrow()
    })
})
