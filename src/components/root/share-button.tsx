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

export default function ShareButtons() {
  const [isCopied, setIsCopied] = useState(false);
  const pathname = usePathname();

  const copyToClipboard = () => {
    const url = `${window.location.origin}${pathname}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setIsCopied(true);
        toast.success("Tautan disalin!", {
          description: "Tautan telah disalin ke clipboard Anda.",
        });
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => {
        toast.error("Gagal menyalin tautan.", {
          description: error instanceof Error ? error.message : undefined,
        });
      });
  };

  const shareToSocialMedia = (platform: string) => {
    const url = encodeURIComponent(`${window.location.origin}${pathname}`);
    const text = encodeURIComponent("Lihat berita ini di SILAB: ");
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="hidden h-full w-full items-end gap-5 md:flex">
      <div className="flex h-full w-full items-end justify-end gap-5">
        <Button
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-transparent text-zinc-100 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-100"
              size="icon"
            >
              <MessageSquareShare className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => shareToSocialMedia("whatsapp")}>
              Bagikan ke WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia("facebook")}>
              Bagikan ke Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia("twitter")}>
              Bagikan ke Twitter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
