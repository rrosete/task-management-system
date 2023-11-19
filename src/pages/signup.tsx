"use client";
import { LoginLayout } from "@/hoc/LoginLayout";
import { Button, TextInput } from "flowbite-react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React from "react";

const SignUp: NextPage = () => {
  const router = useRouter();
  return (
    <LoginLayout title="Sign Up">
      <form>
        <div className="px-5 text-center mb-10">
          <div className="flex flex-col gap-2">
            <TextInput
              name="email"
              placeholder="Email"
              type="email"
              value=""
              onChange={(e) => {}}
            />
            <TextInput
              name="password"
              placeholder="Password"
              type="password"
              value=""
              onChange={(e) => {}}
            />
          </div>

          <div className="mt-20">
            <div className="flex flex-col gap-2">
              <Button onClick={() => {}}>Save</Button>
              <Button
                color="light"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </LoginLayout>
  );
};

export default SignUp;
