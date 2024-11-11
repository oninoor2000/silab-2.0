"use client";

import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

interface ShareDropdownProps {
  className?: string;
}

export default function ShareDropdown({ className }: ShareDropdownProps) {
  const pathname = usePathname();

  const copyToClipboard = async () => {
    try {
      const url = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(url);
      toast.success("Tautan disalin!", {
        description: "Tautan telah disalin ke clipboard Anda.",
      });
    } catch (error) {
      toast.error("Gagal menyalin tautan", {
        description:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menyalin tautan",
      });
    }
  };

  const shareToSocialMedia = (platform: string) => {
    try {
      const url = encodeURIComponent(`${window.location.origin}${pathname}`);
      const text = encodeURIComponent("Lihat penelitian ini di SILAB: ");
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

      window.open(shareUrl, "_blank", "noopener,noreferrer");
    } catch {
      toast.error("Gagal membuka halaman berbagi");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("md:hidden", className)}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
          Salin tautan
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
