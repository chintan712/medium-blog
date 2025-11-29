import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/Fullblog";
// import { Spinner } from "../components/Spinner";
import { useName, usePost } from "../hooks";
import {useParams} from "react-router-dom";
import { PostSkeleton } from "../components/PostSkeleton";


export const Post = () => {
    const { id } = useParams();
    const {loading, post} = usePost({
        id: id || ""
    });
    const { name } = useName();

    if (loading || !post) {
        return <div>
            <Appbar name={name}/>
            <div className="h-screen flex flex-col justify-center">

                <div className="flex justify-center">
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog post={post} />
    </div>
}