import CompareRequest from '@/models/CompareRequest'
import Autocomplete from '@mui/joy/Autocomplete'
import Box from '@mui/joy/Box'
import Grid from '@mui/joy/Grid'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemContent from '@mui/joy/ListItemContent'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import clone from 'clone'

export default function TopicsEntry({
    topics,
    readonly,
    onChange = () => {},
}: Pick<CompareRequest, 'topics'> & {
    readonly?: boolean
    onChange?: (newTopics: typeof topics) => void
}) {
    return (
        <Box>
            <Typography level="h3">Topics</Typography>
            <Grid container spacing={1}>
                {topics.map((topic, index) => (
                    <Grid key={topic.id} sm={6} xs={12}>
                        <Sheet variant="soft" sx={{ padding: 1 }}>
                            {readonly ? (
                                <Typography level="body-lg">
                                    {topic.name}
                                </Typography>
                            ) : (
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
                            )}
                            <Typography
                                level="title-sm"
                                textTransform="uppercase"
                                sx={{ mt: 1 }}
                            >
                                Sources
                            </Typography>
                            {readonly ? (
                                <List size="sm">
                                    {topic.sources.map((source, index) => (
                                        <ListItem key={index}>
                                            <ListItemContent>
                                                <Typography
                                                    level="body-sm"
                                                    noWrap
                                                >
                                                    {source}
                                                </Typography>
                                            </ListItemContent>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
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
                                        inputValue
                                            ? [`Add "${inputValue}"`]
                                            : []
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
                            )}
                        </Sheet>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
