"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Copy, MessageSquareShare, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "sonner";

// ShareButtons component allows users to copy the current URL or share it on social media platforms
export default function ShareButtons({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false); // State to track if the URL has been copied
  const pathname = usePathname(); // Get the current pathname from Next.js routing

  // Function to copy the current URL to the clipboard
  const copyToClipboard = () => {
    const url = `${window.location.origin}${pathname}`;

    if (navigator.clipboard.writeText) {
      // Use Clipboard API if available
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setIsCopied(true);
          toast.success("Tautan disalin!", {
            description: "Tautan telah disalin ke clipboard Anda.",
          });
          // Reset the copied state after 2 seconds
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((error) => {
          // Show error toast if copying fails
          toast.error("Gagal menyalin tautan.", {
            description: error instanceof Error ? error.message : undefined,
          });
        });
    } else {
      // Fallback method for browsers that do not support Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setIsCopied(true);
          toast.success("Tautan disalin!", {
            description: "Tautan telah disalin ke clipboard Anda.",
          });
          setTimeout(() => setIsCopied(false), 2000);
        } else {
          throw new Error("Perintah salin gagal.");
        }
      } catch (error) {
        // Show error toast if copying fails
        toast.error("Gagal menyalin tautan.", {
          description: error instanceof Error ? error.message : undefined,
        });
      }

      // Clean up the textarea element
      document.body.removeChild(textArea);
    }
  };

  // Function to share the URL on different social media platforms
  const shareToSocialMedia = (platform: string) => {
    const url = encodeURIComponent(`${window.location.origin}${pathname}`);
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}%20${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }

    // Open the share URL in a new browser tab
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="hidden h-full w-full items-end gap-5 md:flex">
      <div className="flex h-full w-full items-end justify-end gap-5">
        {/* Button to copy the current URL */}
        <Button
          type="button" // Specify the button type
          variant="outline"
          className="bg-transparent text-zinc-100 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-100"
          onClick={copyToClipboard}
        >
          {isCopied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {isCopied ? "Disalin" : "Salin Tautan"}
        </Button>

        {/* Dropdown menu for sharing on social media */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button" // Specify the button type
              variant="outline"
              className="bg-transparent text-zinc-100 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-100"
              size="icon"
            >
              <MessageSquareShare className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* Share to WhatsApp */}
            <DropdownMenuItem
              onClick={() => shareToSocialMedia("whatsapp")}
              className="cursor-pointer"
            >
              Bagikan ke WhatsApp
            </DropdownMenuItem>
            {/* Share to Facebook */}
            <DropdownMenuItem
              onClick={() => shareToSocialMedia("facebook")}
              className="cursor-pointer"
            >
              Bagikan ke Facebook
            </DropdownMenuItem>
            {/* Share to Twitter */}
            <DropdownMenuItem
              onClick={() => shareToSocialMedia("twitter")}
              className="cursor-pointer"
            >
              Bagikan ke Twitter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
