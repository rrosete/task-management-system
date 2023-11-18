"use client";
import React from "react";
import { Button, TextInput } from "flowbite-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { LoginLayout } from "@/hoc/LoginLayout";
import Link from "next/link";

const Login: NextPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/task");
  };
  return (
    <>
      <LoginLayout>
        <form>
          <div className="p-5 text-center">
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
              <div className="flex flex-col">
                <Button
                  onClick={() => {
                    router.push("/task");
                  }}
                >
                  Login
                </Button>
                <div className="mt-20">
                  <p className="text-gray-500">Don't have an account?</p>
                  <h1 className="text-teal-600 font-black">
                    <Link href="/signup">Sign Up</Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </form>
      </LoginLayout>
    </>
  );
};

export default Login;
