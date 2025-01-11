'use client'; // Since ReactMarkdown is a client component

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
    return (
        <div className='prose prose-slate max-w-none'>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
