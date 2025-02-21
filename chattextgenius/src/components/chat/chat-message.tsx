import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, MoreVerticalIcon } from "lucide-react";

interface ChatMessageProps {
  message: string;
  type: "user" | "assistant";
  isProcessing?: boolean;
  detectedLanguage?: string;
  onTranslate?: (language: string) => void;
  onSummarize?: () => void;
  showSummarize?: boolean;
  className?: string;
  timestamp?: string; 
}

export const ChatMessage = ({
  message,
  type,
  isProcessing,
  detectedLanguage,
  onTranslate,
  onSummarize,
  showSummarize,
  className,
  timestamp,
}: ChatMessageProps) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Portuguese" },
    { code: "es", name: "Spanish" },
    { code: "ru", name: "Russian" },
    { code: "tr", name: "Turkish" },
    { code: "fr", name: "French" },
  ];

  return (
    <div
      className={cn(
        "group relative mb-4 flex items-start gap-4 rounded-lg p-4",
        type === "user" ? "bg-chat-user" : "bg-chat-assistant",
        className 
      )}
    >
      <div className="flex-1 space-y-2">
        <div className="prose prose-sm break-words">
          {message}
          {isProcessing && (
            <Loader2 className="ml-2 inline h-4 w-4 animate-spin" />
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {timestamp && <span>{timestamp}</span>}
          {detectedLanguage && (
            <span>
              {timestamp ? " | " : ""}Detected language: {detectedLanguage}
            </span>
          )}
        </div>
      </div>
      <div className="opacity-0 transition-opacity group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {showSummarize && onSummarize && (
              <DropdownMenuItem onClick={onSummarize}>
                Summarize
              </DropdownMenuItem>
            )}
            {onTranslate &&
              languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => onTranslate(lang.code)}
                >
                  Translate to {lang.name}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};