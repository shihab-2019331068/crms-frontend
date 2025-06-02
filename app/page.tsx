import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Welcome to SUST-CRMS website.</h1>
      <div className="flex gap-4">
        <Link href="/login" className="btn btn-primary">
          Login
        </Link>
        <Link href="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
}
