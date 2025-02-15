import { BlogPost } from '@/lib/type';
import Image from 'next/image';

type BlogPostImageProps = {
    post: BlogPost;
    hoverEffect?: boolean;
};

export const BlogPostImage = ({ post, hoverEffect }: BlogPostImageProps) => {
    return (
        <Image
            src={`${process.env.NEXT_PUBLIC_BLOG_URL}/${post.slug}/header.jpg`}
            alt={post.title}
            layout='responsive'
            width={1920}
            height={1080}
            className={`object-cover w-full h-full ${hoverEffect ? 'transition-transform  hover:scale-105' : ''}`}
        />
    );
};
