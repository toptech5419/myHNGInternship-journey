
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onClearHistory: () => void;
  chatHistory: Array<{ id: string; preview: string }>;
  currentChatId: string | null;
  onSelectChat: (id: string) => void;
}

export const ChatSidebar = ({
  isOpen,
  onClose,
  onNewChat,
  onClearHistory,
  chatHistory,
  currentChatId,
  onSelectChat,
}: ChatSidebarProps) => {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-card transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Button
          onClick={onNewChat}
          variant="outline"
          className="flex w-full items-center justify-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {chatHistory.map((chat) => (
            <Button
              key={chat.id}
              variant={currentChatId === chat.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => onSelectChat(chat.id)}
            >
              <span className="truncate">{chat.preview}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Button
          onClick={onClearHistory}
          variant="destructive"
          className="flex w-full items-center justify-center gap-2"
        >
          <Trash2Icon className="h-4 w-4" />
          Clear History
        </Button>
      </div>
    </div>
  );
};
