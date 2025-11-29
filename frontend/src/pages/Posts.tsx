import React from 'react'
import { PostCard } from '../components/PostCard'
import { Appbar } from '../components/Appbar'
import { useName, usePosts } from '../hooks'
import { PostSkeleton } from '../components/PostSkeleton'

export const Posts = () => {
    const { loading, posts } = usePosts();
    const { name } = useName();

    if (loading) {
        return <div>
            <Appbar name={name}  /> 
            <div  className="flex justify-center">
                <div>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            </div>
        </div>
    }
    return <div>
        <Appbar name={name}/>
        <div  className="flex justify-center">
            <div>
                {posts.map(post => <PostCard
                    id={post.id}
                    authorName={post.author.name || "Anonymous"}
                    title={post.title}
                    content={post.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}
