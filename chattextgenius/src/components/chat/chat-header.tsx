import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ChatHeaderProps {
  onToggleSidebar: () => void;
}

export const ChatHeader = ({ onToggleSidebar }: ChatHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-14 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 md:hidden"
          onClick={onToggleSidebar}
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <div className="flex flex-col space-y-1">
          <span className="font-semibold">Toptech5419AI</span>
        </div>
      </div>
    </header>
  );
};
