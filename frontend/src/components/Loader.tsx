import React from "react";

interface LoaderProps{
    className?:string;

}

const Loader: React.FC<LoaderProps> = ({className}) => {
  return (
    <section className={`${className} w-full`}>
      <div className="loader rounded-full h-5 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>

        <div className="loader rounded-full h-5 w-2/3 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>


      <div className="loader-slide flex">

      <div className="loader rounded-xl h-36 w-1/3 border-2 overflow-clip bg-gray-300 m-4">
        <div className="loader-bg h-[200%] w-[100%]"></div>
      </div>

      <div className="loader rounded-xl h-36 w-1/3 border-2 overflow-clip bg-gray-300 m-4">
        <div className="loader-bg h-[200%] w-[100%]"></div>
      </div>

      <div className="loader rounded-xl h-36 w-1/3 border-2 overflow-clip bg-gray-300 m-4">
        <div className="loader-bg h-[200%] w-[100%]"></div>
      </div>
      </div>

      <div className="loader-card">
        <div className="loader rounded-xl h-36 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>

        <div className="loader rounded-full h-5 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>

        <div className="loader rounded-full h-5 w-2/3 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>

        <div className="loader rounded-full h-5 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>
      </div>

      <div className="loader-card">
        <div className="loader rounded-xl h-36 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>

        <div className="loader rounded-full h-5 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>

        <div className="loader rounded-full h-5 w-2/3 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>

        <div className="loader rounded-full h-5 border-2 overflow-clip bg-gray-300 m-4">
          <div className="loader-bg h-[200%] w-[100%]"></div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
