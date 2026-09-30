import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          className={cn("h-4 w-4", index < rating ? "fill-brand text-brand" : "text-border")}
        />
      ))}
    </div>
  );
}
