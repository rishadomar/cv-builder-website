import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/lib/type';

interface PostCardProps {
    post: BlogPost;
    onClick: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
    return (
        <Card className='overflow-hidden cursor-pointer transition-all hover:shadow-lg' onClick={onClick}>
            <div className='aspect-video relative overflow-hidden'>
                <img
                    src={`https://blog-dev.cvbuilder.co.za/${post.slug}/header.jpg`}
                    alt={post.title}
                    className='object-cover w-full h-full transition-transform hover:scale-105'
                />
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
                <p className='text-muted-foreground'>{'Some content here'}</p>
            </CardContent>
        </Card>
    );
}
