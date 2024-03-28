import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";

const PostView = () => {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if (isLoading || fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader />
            </div>
        )
    }

return (
    <>
            <Header label='Tweet' showBackArrow />
            <PostItem data={fetchedPost} userId={fetchedPost.user.id} />
            <Form
                    postId = {postId as string}
                    isComment
                    placeholder="Tweet your reply"
            />
    </>
);
}

export default PostView;