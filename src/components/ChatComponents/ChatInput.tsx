import { ArrowUp as Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useRef, useEffect } from "react";
import { useToast } from "../ui/use-toast";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { toast } = useToast();

  const handleMessageSend = () => {
    toast({
      title: "Okay, the message is sent.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessageSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-white dark:to-gray-800 font-sans">
      <div className="max-w-3xl mx-auto p-4">
        <div
          className="flex items-end border rounded-lg bg-white dark:bg-gray-700 shadow-lg transition-colors duration-200 ${
          isFocused ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600"
        >
          <Textarea
            ref={textareaRef}
            value={message}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Message Your Pdf..."
            disabled={isDisabled}
            className="min-h-[20px] max-h-[200px] w-full resize-none bg-transparent py-3 px-4 focus:outline-none focus:border-none border-none dark:bg-transparent dark:text-white focus:ring-0 font-sans text-base font-semibold "
            rows={1}
          />
          <Button
            onClick={handleMessageSend}
            disabled={isDisabled}
            className="mb-[2.5] mr-1.5 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
          >
            <Send className="h-6 w-6 font-semibold" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
<div className="absolute bottom-0 left-0 w-full">
  <div className="flex flex-row "></div>
</div>;
