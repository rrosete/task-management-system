import { Navbar } from "@/components";
import { ILayout } from "@/interface/layout/layout";
import React, { FC } from "react";

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="h-full m-auto p-5">
        <div className="flex mt-5 p-5 xl:mx-32 xl:mt-16 xl:py-20 xl:px-32 bg-white min-h-[600px] shadow-md">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
