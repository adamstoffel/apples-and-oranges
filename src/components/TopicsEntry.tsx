import CompareRequest from '@/models/CompareRequest'
import Autocomplete from '@mui/joy/Autocomplete'
import Grid from '@mui/joy/Grid'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import clone from 'clone'

export default function TopicsEntry({
    topics,
    onChange = () => {},
}: Pick<CompareRequest, 'topics'> & {
    onChange?: (newTopics: typeof topics) => void
}) {
    return (
        <>
            <Typography level="h3">Topics</Typography>
            <Grid container spacing={1}>
                {topics.map((topic, index) => (
                    <Grid key={topic.id} sm={6}>
                        <Sheet variant="soft" sx={{ padding: 1 }}>
                            <Input
                                data-testid="topic-name-input"
                                placeholder={`Topic Name ${index + 1}`}
                                value={topic.name}
                                size="lg"
                                variant="soft"
                                onChange={({ target }) => {
                                    const newTopics = clone(topics)
                                    newTopics[index].name = target.value
                                    onChange(newTopics)
                                }}
                            />
                            <Typography level="title-md" sx={{ mt: 1 }}>
                                URL Sources
                            </Typography>
                            <Autocomplete
                                data-testid="topic-sources-input"
                                placeholder={
                                    topic.sources.length
                                        ? ''
                                        : 'Paste one or more URLs'
                                }
                                multiple
                                value={topic.sources}
                                options={[] as string[]}
                                freeSolo
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                filterOptions={(_, { inputValue }) =>
                                    inputValue ? [`Add "${inputValue}"`] : []
                                }
                                onChange={(_, newValue) => {
                                    const newTopics = clone(topics)
                                    newTopics[index].sources = newValue.map(
                                        (value) =>
                                            /^Add ".*"$/.test(value)
                                                ? value.substring(
                                                      5,
                                                      value.length - 1
                                                  )
                                                : value
                                    )
                                    onChange(newTopics)
                                }}
                            />
                        </Sheet>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
