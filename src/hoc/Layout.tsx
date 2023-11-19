import { Navbar } from "@/components";
import { ILayout } from "@/interface/layout/layout";
import React, { FC } from "react";

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="h-full m-auto p-5">
        <div className="flex p-5 bg-white min-h-[600px] shadow-md">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
