import { ILoginLayout } from "@/interface/layout/login";
import React, { FC } from "react";

export const LoginLayout: FC<ILoginLayout> = ({
  children,
  title = "Sign In",
}) => {
  return (
    <div className="flex items-center justify-center h-screen tracking-wide">
      <div className="shadow-md rounded-2xl my-10 mx-5 w-full lg:w-[500px] lg:h-[600px] bg-white">
        <div className="relative">
          <div className="rounded-t-2xl bg-teal-600 p-6 mb-20">
            <p className="text-white text-2xl font-extrabold">{title}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
