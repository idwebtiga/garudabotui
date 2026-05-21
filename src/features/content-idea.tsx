import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ideaMd from '../../IDEA.md?raw'

function ContentIdea() {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{ideaMd}</ReactMarkdown>
}

export default ContentIdea
