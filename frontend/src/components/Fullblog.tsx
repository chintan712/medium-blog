import { useName, type post } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./PostCard"

export const FullBlog = ({ post }: {post: post}) => {
    const { name } = useName();
    return <div>
        <Appbar name={name} />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {post.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on {new Date().toDateString()}
                    </div>
                    <div className="pt-4">
                        {post.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full pt-4">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={post.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {post.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}