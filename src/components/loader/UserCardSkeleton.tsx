import React from "react";

const UserCardSkeleton: React.FC = () => {
    return (
        <li className="flex justify-between  py-3 animate-pulse">
            <div className="flex min-w-0 gap-x-4">

                <div className="size-12 rounded-full bg-secondary" />


                <div className="lg:block md:hidden min-w-0 flex-auto space-y-2">
                    <div className="h-4 w-32 rounded bg-secondary" />
                    <div className="h-3 w-48 rounded bg-secondary" />
                </div>
            </div>


            <div className="md:hidden lg:block shrink-0 place-items-center justify-center sm:flex sm:flex-col sm:items-end space-y-1">
                <div className="h-3 w-12 rounded bg-secondary" />
                <div className="flex-none rounded-full bg-secondary p-1">
                    <div className="size-1.5 rounded-full bg-secondary"></div>
                </div>
            </div>
        </li>
    );
};

export default UserCardSkeleton;
