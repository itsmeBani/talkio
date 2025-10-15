import React from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader.tsx";

interface LoadMoreButtonProps {
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage: () => Promise<void>;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
                                                           hasNextPage,
                                                           isFetchingNextPage,
                                                           fetchNextPage,
                                                       }) => {
    if (!hasNextPage) return null;

    return (
        <div className="w-full flex justify-center mt-4">
            {isFetchingNextPage ? (
                <Loader />
            ) : (
                <Button
                    size="sm"
                    disabled={!hasNextPage || isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    variant="outline"
                    className="rounded-full PlusJakartaSans-Regular leading-7 pb-[3px]"
                >
                    Load more
                </Button>
            )}
        </div>
    );
};

export default LoadMoreButton;
