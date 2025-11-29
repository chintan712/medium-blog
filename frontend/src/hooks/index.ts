import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface post {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}


export const usePost = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<post>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setPost(response.data.post);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        post
    }

}
export const usePosts = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<post[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setPosts(response.data.posts);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        posts
    }
}

export const useName = () => {
    const [name, setName] = useState<string>("");
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
                Authorization: localStorage.getItem("token") || ""
            }
        }).then(response => {
                setName(response.data.name);
            })
    }, [])

    return {
        name
    }
}