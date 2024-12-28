"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import type { ShareDropdownProps } from "~/typeSchema/root-types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { toast } from "sonner";
import { cn } from "~/lib/utils";
import { Share2 } from "lucide-react";
import { Button } from "~/components/ui/button";

type Platform = "whatsapp" | "facebook" | "twitter";

const socialShareUrls: Record<Platform, (url: string, text: string) => string> =
  {
    whatsapp: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`,
    facebook: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: (url, text) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  };

export default function ShareDropdown({ className, text }: ShareDropdownProps) {
  const [isCopied, setIsCopied] = useState(false);
  const pathname = usePathname();

  const copyToClipboard = useCallback(async () => {
    const url = `${window.location.origin}${pathname}`;

    if (navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        toast.success("Tautan disalin!", {
          description: "Tautan telah disalin ke clipboard Anda.",
        });
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        toast.error("Gagal menyalin tautan.", {
          description:
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan saat menyalin tautan.",
        });
      }
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);

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
        toast.error("Gagal menyalin tautan.", {
          description:
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan saat menyalin tautan.",
        });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [pathname]);

  const shareToSocialMedia = useCallback(
    (platform: Platform) => {
      try {
        const url = `${window.location.origin}${pathname}`;
        const getShareUrl = socialShareUrls[platform];

        if (!getShareUrl) {
          toast.error("Platform tidak didukung.");
          return;
        }

        const shareUrl = getShareUrl(url, text);
        window.open(shareUrl, "_blank", "noopener,noreferrer");
      } catch (error) {
        toast.error("Gagal membuka halaman berbagi.", {
          description:
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan saat membuka halaman berbagi.",
        });
      }
    },
    [pathname, text],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn("md:hidden", className)}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuItem
          onClick={copyToClipboard}
          disabled={isCopied}
          className="cursor-pointer"
        >
          {isCopied ? "Tautan telah disalin" : "Salin tautan"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => shareToSocialMedia("whatsapp")}
          className="cursor-pointer"
        >
          Bagikan ke WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => shareToSocialMedia("facebook")}
          className="cursor-pointer"
        >
          Bagikan ke Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => shareToSocialMedia("twitter")}
          className="cursor-pointer"
        >
          Bagikan ke Twitter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
