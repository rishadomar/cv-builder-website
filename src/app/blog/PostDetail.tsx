import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/lib/type';

interface PostDetailProps {
    post: BlogPost;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PostDetail({ post, open, onOpenChange }: PostDetailProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-3xl h-[80vh]'>
                <ScrollArea className='h-full pr-4'>
                    <div className='space-y-6'>
                        <div className='aspect-[2/1] relative overflow-hidden rounded-lg'>
                            {/* <img src={post.coverImage} alt='' className='object-cover w-full h-full' /> */}
                        </div>

                        <div className='space-y-4'>
                            <div className='flex items-center space-x-4'>
                                <div className='space-y-1'>
                                    <h4 className='text-sm font-semibold'>{post.author}</h4>
                                    <p className='text-sm text-muted-foreground'>
                                        {formatDate(new Date(post.timestamp))}
                                    </p>
                                </div>
                            </div>

                            <h1 className='text-3xl font-bold leading-tight'>{post.title}</h1>

                            <div className='prose prose-neutral dark:prose-invert max-w-none'>
                                <p>Content here</p>
                                {/* {post.content.split('\n').map((paragraph, index) => (
                                    <p key={index} className='mb-4'>
                                        {paragraph.trim()}
                                    </p>
                                ))} */}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
