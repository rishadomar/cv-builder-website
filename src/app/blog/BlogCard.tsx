'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/lib/type';
import { BlogPostImage } from './BlogPostImage';
import { useRouter } from 'next/navigation';

interface PostCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: PostCardProps) {
    const router = useRouter();
    return (
        <Card
            className='overflow-hidden cursor-pointer transition-all hover:shadow-lg'
            onClick={() => {
                router.push(`/blog/${post.slug}`);
            }}
        >
            <div className='aspect-video relative overflow-hidden'>
                <BlogPostImage post={post} hoverEffect={true} />
            </div>
            <CardHeader className='space-y-4'>
                <div className='flex items-center space-x-4'>
                    <div className='space-y-1'>
                        <h4 className='text-sm font-semibold'>{post.author}</h4>
                        <p className='text-sm text-muted-foreground'>{formatDate(new Date(post.timestamp))}</p>
                    </div>
                </div>
                <h3 className='text-2xl font-bold leading-tight'>{post.title}</h3>
            </CardHeader>
            <CardContent>
                <p className='text-muted-foreground'>{post.description}</p>
            </CardContent>
        </Card>
    );
}
