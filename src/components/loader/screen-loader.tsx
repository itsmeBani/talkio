function ScreenLoader() {
    return (
        <div className="w-full h-[100dvh] flex flex-col items-center justify-center gap-2 sm:gap-3">
            <h1 className="PlusJakartaSans-Bold text-base sm:text-xl">Loading</h1>

            <div className="bg-secondary shadow-md relative p-4 sm:p-6 rounded-md">
                <div className="flex space-x-1.5 sm:space-x-2 justify-center items-center">
                    <div className="h-2.5 w-2.5 sm:h-4 sm:w-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2.5 w-2.5 sm:h-4 sm:w-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2.5 w-2.5 sm:h-4 sm:w-4 bg-blue-600 rounded-full animate-bounce"></div>
                </div>


                <div
                    className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2
          w-0 h-0
          border-l-[10px] sm:border-l-[20px]
          border-r-[10px] sm:border-r-[20px]
          border-t-[10px] sm:border-t-[20px]
          border-l-transparent border-r-transparent border-secondary"
                ></div>
            </div>
        </div>
    );
}

export default ScreenLoader;
