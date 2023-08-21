import CompareRequest from '@/models/CompareRequest'
import CompareResult from '@/models/CompareResult'
import OpenAI from 'openai'

const SYSTEM_TOPIC_COMPLETION_INSTRUCTION =
    'You will be provided with a list of source URLs (delimited with XML tags) about the same topic. Thoroughly review the information on these webpages and use only the information on these webpages to respond to the prompt.'

export class ComparisonService {
    private readonly openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
    })

    private readonly topicCompletions = new Map<
        string,
        Promise<OpenAI.Chat.ChatCompletion>
    >()

    constructor(private readonly request: CompareRequest) {
        for (const topic of request.topics) {
            this.topicCompletions.set(
                topic.id,
                this.getTopicChatCompletion(topic.sources, request.prompt)
            )
        }
    }

    public async getResponse() {
        const responses = [] as CompareResult['responses']

        for (const topic of this.request.topics) {
            const completion = await this.topicCompletions.get(topic.id)
            const completionChoice = completion?.choices.find(
                (c) => c.message.role === 'assistant'
            )

            if (!completionChoice?.message.content) {
                throw new Error(
                    `Failed to get a chat completion result for topic ${topic.name}`
                )
            }

            responses.push({
                topicId: topic.id,
                topicName: topic.name,
                narrative: completionChoice.message.content,
            })
        }

        return {
            responses,
        } as CompareResult
    }

    private async getTopicChatCompletion(sources: string[], prompt: string) {
        let promptContent = sources
            .map((s) => `<sourceUrl>${s}</sourceUrl>`)
            .join('\n')
        promptContent += `\n\nPrompt: ${prompt}`

        return this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_TOPIC_COMPLETION_INSTRUCTION,
                },
                { role: 'user', content: promptContent },
            ],
        })
    }
}
