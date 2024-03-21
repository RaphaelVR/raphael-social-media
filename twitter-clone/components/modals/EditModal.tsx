import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { set } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import Modal from "../layout/Modal";
import axios from "axios";

const EditModal = () => {
        const { data: currentUser } = useCurrentUser();
        const { mutate: mutateFetchedUser } = useUser(currentUser?.id as string);
        const editModal = useEditModal();

        
        const [profileImage, setProfileImage] = useState('')
        const [coverImage, setCoverImage] = useState('')
        const [name, setName] = useState('')
        const [username, setUsername] = useState('')
        const [bio, setBio] = useState('')

        useEffect(() => {
            setProfileImage(currentUser?.profileImage)
            setCoverImage(currentUser?.coverImage)
            setName(currentUser?.name)
            setUsername(currentUser?.username)
            setBio(currentUser?.bio)
        }, [
                currentUser?.name,
                currentUser?.username,
                currentUser?.bio,
                currentUser?.coverImage,
                currentUser?.profileImage
        ]);

        const [isLoading, setIsLoading] = useState(false);

        const onSubmit = useCallback(async () => {
                try {
                        setIsLoading(true);

                        await axios.patch('/api/edit', {
                                name,
                                username,
                                bio,
                                profileImage,
                                coverImage,            
                        });
                        mutateFetchedUser();

                        toast.success('Profile updated');

                        editModal.onClose();
                } catch (error) {
                        toast.error('Something went wrong');
                } finally {
                        setIsLoading(false);
                }
            },
            [bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser]);

        const bodyContent = (
                <div className="flex ">
    
                </div>
        );
        
        

    return (
        <Modal 
                disabled={isLoading}
                isOpen={editModal.isOpen}
                title="Edit your profile"
                actionLabel="Save"
                onClose={editModal.onClose}
                onSubmit={onSubmit}
        />
    )
}

export default EditModal