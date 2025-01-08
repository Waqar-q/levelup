import React from "react";
import Logo from "./Logo";

interface LoaderProps{
    className?:string;

}

const Loader: React.FC<LoaderProps> = ({className}) => {
  return (
    <section className={`${className} w-full items-center gap-0 justify-center flex  flex-col h-[100vh]`}>
     
        <Logo className="p-0 w-1/2"/>
        Loading..
     
      {/*<div className="loader rounded-full h-5 border-2 overflow-clip bg-gray-300 m-4">
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
      </div>*/}
    </section>
  );
};

export default Loader;
