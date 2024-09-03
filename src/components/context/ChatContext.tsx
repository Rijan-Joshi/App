import React, {useState, createContext, useContext, ReactNode} from "react";

interface ChatContextType{
    message: string;
    addMessage: (message:string)=>void;
    isLoading: boolean,
    setIsLoading: (loading: boolean)=> void;
    handleInputChange: (e: React.ChangeEventHandler<HTMLTextAreaElement>) => void
}

export const ChatContext = createContext<ChatContextType>({
    message: "",
    addMessage: () => {},
    isLoading : false,
    setIsLoading: () =>{},
    handleInputChange: () => {}
})

interface ChatProviderProps {
    fileId: string, 
    children: ReactNode
}

export const ChatProvider:  React.FC<ChatProviderProps> =({fileId, children})=>{
    const [message,setMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    

    return ()
}