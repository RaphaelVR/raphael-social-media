import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { set } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import Modal from "../layout/Modal";
import axios from "axios";
import Input from "../layout/Input";
import ImageUpload from "../ImageUpload";

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
                <div className="flex flex-col gap-4 ">
                    <ImageUpload
                        value={profileImage}
                        disabled={isLoading}
                        onChange={(image) => setProfileImage(image)}
                        label="Upload profile image"
                    />
                    <ImageUpload
                        value={coverImage}
                        disabled={isLoading}
                        onChange={(image) => setCoverImage(image)}
                        label="Upload cover image"
                    />
                    <Input 
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    disabled={isLoading} type={""}                    />
                    <Input 
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    disabled={isLoading} type={""}                    />
                    <Input 
                    placeholder="Bio"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    disabled={isLoading} type={""}                    />
    
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
                body={bodyContent}
        />
    )
}

export default EditModal