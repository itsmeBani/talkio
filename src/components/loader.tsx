import {LoaderIcon} from "lucide-react";

function Loader() {
    return (
        <div className="w-full justify-center flex">
            <LoaderIcon className="animate-spin"/>

        </div>
    );
}

export default Loader;