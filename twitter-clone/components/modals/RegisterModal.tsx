import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from "axios";

import Modal from "../layout/Modal";
import Input from "../layout/Input";


const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const onToogle = useCallback(() => {
      if (isLoading) {
        return;
      }
    
      registerModal.onClose();
      loginModal.onOpen();
    }, [isLoading, registerModal, loginModal])
    

    const onSubmit = useCallback(async () => {
      try {
        setIsLoading(true);

      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      });

      toast.success('Account created');

       registerModal.onClose();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, [registerModal, email, password, username, name]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading} 
                type={""}            
                />
                <Input 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading} 
                type={""}            
                />
                <Input 
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading} 
                type={""}            
                />
            <Input 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading} 
                type={""}            
                />
        </div>
    )

    const footerContent = (
      <div className="text-neutral-400 text-center mt-4">
        <p>Already have an account?
          <span 
          onClick={onToogle}
          className="text-white cursor-pointer hover:underline"> Sign in
          </span>
        </p>
      </div>
    )
    

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Create an account'
        actionLabel='Register'
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}    
    />
  );
}

export default RegisterModal