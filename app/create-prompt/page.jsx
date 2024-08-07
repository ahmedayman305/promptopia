"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@components/Form";
import axios from "axios";

const CreatePrompt = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: " ",
        tag: "",
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = {
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag,
            };
            const res = await axios.post("/api/prompt/new", data);

            if (res.status === 201) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePrompt;
