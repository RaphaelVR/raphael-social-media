import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";

const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;

    const { data: fetchedUser, isLoading } = useUser(userId as string);
    
     
  return (
    <>
        <Header showBackArrow label="User Profile"/>
    </>
  )
}

export default UserView;