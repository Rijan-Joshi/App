import React, {
  createContext,
  ReactNode,
  useContext,
  ChangeEvent,
} from "react";
import { useChatMessages } from "@/hooks/useChatMessages";

interface ChatContextProps {
  message: string;
  isLoading: boolean;
  addMessage: () => void;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const chatContext = createContext<ChatContextProps>({
  message: "",
  isLoading: false,
  addMessage: () => {},
  handleInputChange: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
  fileId: string;
}

export const ChatContextProvider = ({
  children,
  fileId,
}: ContextProviderProps) => {
  const { isLoading, message, addMessage, handleInputChange } =
    useChatMessages(fileId);

  return (
    <chatContext.Provider
      value={{
        isLoading,
        message,
        addMessage,
        handleInputChange,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(chatContext);
  if (!context) {
    throw new Error("Context must be used withing a ContextProvider");
  }
  return context;
};
