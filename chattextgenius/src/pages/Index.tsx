// Index.tsx
import axios from "axios";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatMessage } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/footer/Footer";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  detectedLanguage?: string;
  isSummary?: boolean;
  timestamp: string;
}

interface Chat {
  id: string;
  messages: Message[];
}

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(uuidv4());
  const [chats, setChats] = useState<{ id: string; messages: Message[] }[]>([{ id: currentChatId, messages: [] }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const processMessage = async (message: string) => {
    try {
      const detectResponse = await axios.post(
        `https://translation.googleapis.com/language/translate/v2/detect?key=${import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY}`,
        { q: message }
      );
      const detectedLanguage = detectResponse.data.data.detections[0][0].language;
      return {
        content: message,
        detectedLanguage: detectedLanguage,
      };
    } catch (error) {
      throw new Error(`Error processing message: ${error.message}`);
    }
  };

  const handleNewChat = () => {
    const newChatId = uuidv4();
    setChats((prev) => [...prev, { id: newChatId, messages: [] }]);
    setCurrentChatId(newChatId);
    setIsSidebarOpen(false);
  };

  const handleClearHistory = () => {
    const newChatId = uuidv4();
    setChats([{ id: newChatId, messages: [] }]);
    setCurrentChatId(newChatId);
    setIsSidebarOpen(false);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return; 
    const messageId = uuidv4();
    setIsProcessing(true);

    try {
      const detection = await processMessage(message);
      const timestamp = new Date().toLocaleTimeString();

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: messageId,
                    type: "user",
                    content: message,
                    detectedLanguage: detection.detectedLanguage,
                    timestamp,
                  },
                ],
              }
            : chat
        )
      );

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: uuidv4(),
                    type: "assistant",
                    content: detection.content,
                    detectedLanguage: detection.detectedLanguage,
                    timestamp,
                  },
                ],
              }
            : chat
        )
      );
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to process message: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranslate = async (messageId: string, targetLanguage: string) => {
    const messageToTranslate = currentChat?.messages.find((msg) => msg.id === messageId);
    if (!messageToTranslate) return;

    setIsProcessing(true);

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY}`,
        {
          q: messageToTranslate.content,
          target: targetLanguage,
          source: messageToTranslate.detectedLanguage,
        }
      );

      const translatedText = response.data.data.translations[0].translatedText;
      const timestamp = new Date().toLocaleTimeString();

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: uuidv4(),
                    type: "assistant",
                    content: translatedText,
                    detectedLanguage: targetLanguage,
                    timestamp,
                  },
                ],
              }
            : chat
        )
      );
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to translate message: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSummarize = async (messageId: string) => {
    const messageToSummarize = currentChat?.messages.find((msg) => msg.id === messageId);
    if (!messageToSummarize) return;

    setIsProcessing(true);

    try {
      const text = messageToSummarize.content;
      if (text.length < 50) {
        throw new Error("Text too short for summarization");
      }

      const response = await axios.post("http://localhost:3000/summarize", {
        text: messageToSummarize.content,
      });

      const summarizedText = response.data.summary;
      const timestamp = new Date().toLocaleTimeString();

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: uuidv4(),
                    type: "assistant",
                    content: summarizedText,
                    detectedLanguage: messageToSummarize.detectedLanguage || "en",
                    isSummary: true,
                    timestamp,
                  },
                ],
              }
            : chat
        )
      );

      toast({
        title: "Summarization Success",
        description: "The message has been summarized.",
      });
    } catch (error) {
      console.error("Summarization Error:", error);
      toast({
        title: "Error",
        description: `Failed to summarize message: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (currentChat?.messages.length) {
      const latestMessageId = currentChat.messages[currentChat.messages.length - 1].id;
      const latestMessageRef = messageRefs.current[latestMessageId];
      if (latestMessageRef) {
        latestMessageRef.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [currentChat?.messages.length]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
        onClearHistory={handleClearHistory}
        chatHistory={chats.map((chat) => ({
          id: chat.id,
          preview: chat.messages[0]?.content || "New Chat",
        }))}
        currentChatId={currentChatId}
        onSelectChat={(id) => {
          setCurrentChatId(id);
          setIsSidebarOpen(false);
        }}
      />
      <div className="flex flex-1 flex-col relative">
        <ChatHeader onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <ScrollArea className="chat-content flex-1" ref={scrollAreaRef}>
          <div className="container space-y-4 py-4">
            {currentChat?.messages.map((message) => (
              <div
                key={message.id}
                ref={(el) => (messageRefs.current[message.id] = el)}
              >
                <ChatMessage
                  message={message.content}
                  type={message.type}
                  detectedLanguage={message.detectedLanguage}
                  showSummarize={message.content.length > 150 && !message.isSummary}
                  onTranslate={(language) => handleTranslate(message.id, language)}
                  onSummarize={() => handleSummarize(message.id)}
                  className={message.isSummary ? "bg-yellow-100" : ""}
                  timestamp={message.timestamp}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-10">
            <div className="flex items-center space-x-2 p-4 bg-white rounded shadow">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-gray-700">Processing...</span>
            </div>
          </div>
        )}
        <ChatInput onSend={handleSendMessage} isProcessing={isProcessing} />
        <Footer /> 
      </div>
    </div>
  );
};

export default Index;