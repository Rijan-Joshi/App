import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

//Send the message and return the ReadableStream
const sendMessageAPI = async (message: string, fileId: string) => {
  const response = await fetch("api/chatMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileId, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.body;
};

export const useChatMessages = (fileId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  //Handling the POST method
  const sendMessage = useMutation({
    //Using the mutationFunction to send the message to the server side
    mutationFn: (message: string) => sendMessageAPI(message, fileId),
    //onMutate is solely for optimistic updates
    onMutate: () => {},
    //response.body is returned while posting, which gives back the stream of pdf. We will process the response stream
    //Streaming Logic Below
    onSuccess: async (stream) => {},
    //Error Handling
    onError: () => {},
  });

  //Handling the change in the Input
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  //Adding the message
  const addMessage = () => sendMessage.mutate(message);

  return {
    message,
    addMessage,
    isLoading,
    handleInputChange,
  };
};
