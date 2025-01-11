import fs from 'fs/promises';
import path from 'path';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { BackButton } from '@/components/BackButton';

// For server components in Next.js 13+
async function getContent() {
    const filePath = path.join(process.cwd(), 'content/pages/about-us.md');
    const content = await fs.readFile(filePath, 'utf8');
    return content;
}

export default async function AboutUsPage() {
    const content = await getContent();

    return (
        <div className='container mx-auto px-4 py-8 mt-20'>
            <MarkdownRenderer content={content} />
            <BackButton />
        </div>
    );
}
