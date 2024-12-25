import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React, { useMemo } from "react";
import { Button } from "../ui/button";

// Types
export interface PaginationProps {
  totalDoc: number;
  limit?: number;
  onPageChange: (page: number) => void;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

interface PaginationTextProps {
  currentPage: number;
  limit: number;
  totalDoc: number;
  className?: string;
}

// Text Component
function PaginationText({
  currentPage,
  limit,
  totalDoc,
  className,
}: PaginationTextProps) {
  const start = Math.min((currentPage - 1) * limit + 1, totalDoc);
  const end = Math.min(currentPage * limit, totalDoc);

  return (
    <p className={cn("text-sm text-gray-700", className)}>
      Showing <span className="font-medium">{start}</span> to{" "}
      <span className="font-medium">{end}</span> of{" "}
      <span className="font-medium">{totalDoc}</span> items
    </p>
  );
}

// Main Pagination Component
function FeroxPagination({
  totalDoc,
  limit = 10,
  onPageChange,
  className,
  showText = true,
  textClassName,
}: PaginationProps) {
  const totalPages = Math.ceil(totalDoc / limit);
  const [currentPage, setCurrentPage] = React.useState(1);

  const pages = useMemo(() => {
    const items: (number | string)[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    items.push(1);

    if (currentPage > 3) {
      items.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (currentPage < totalPages - 2) {
      items.push("...");
    }

    items.push(totalPages);

    return items;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="space-y-4">
      {showText && (
        <PaginationText
          currentPage={currentPage}
          limit={limit}
          totalDoc={totalDoc}
          className={textClassName}
        />
      )}
      <nav
        className={cn("flex items-center justify-center space-x-2", className)}
        aria-label="Pagination"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center space-x-1">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <Button
                  key={`ellipsis-${index}`}
                  variant="ghost"
                  size="sm"
                  className="w-9"
                  disabled
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              );
            }

            const pageNumber = page as number;
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNumber)}
                className="w-9"
                aria-current={currentPage === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}

export default FeroxPagination;
