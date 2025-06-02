// AuthForm.tsx - shared form logic for login/register (to be implemented)
import React, { useState } from "react";
import Link from "next/link";

interface LoginProps {
  type: "login";
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  loading: boolean;
  error: string;
}

interface RegisterProps {
  type: "register";
  onSubmit: (data: { name: string; email: string; password: string; confirmPassword: string; role: string; department: string }) => Promise<void>;
  loading: boolean;
  error: string;
  departments: { id: string; name: string }[];
}

type AuthFormProps = LoginProps | RegisterProps;

type LoginFormState = { email: string; password: string };
type RegisterFormState = { name: string; email: string; password: string; confirmPassword: string; role: string; department: string };

export default function AuthForm(props: AuthFormProps) {
  const [loginForm, setLoginForm] = useState<LoginFormState>({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState<RegisterFormState>({ name: "", email: "", password: "", confirmPassword: "", role: "", department: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (props.type === "login") {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    } else {
      setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (props.type === "login") {
      await props.onSubmit(loginForm);
    } else {
      await props.onSubmit(registerForm);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto p-6 bg-[#232326] rounded-lg shadow-lg border border-[#27272a] text-foreground">
      {props.type === "register" && (
        <>
          <input name="name" type="text" placeholder="Full Name" value={registerForm.name} onChange={handleChange} className="input input-bordered w-full bg-[#18181b] border-[#27272a] text-foreground placeholder:text-gray-400" required />
        </>
      )}
      <input name="email" type="email" placeholder="Email" value={props.type === "login" ? loginForm.email : registerForm.email} onChange={handleChange} className="input input-bordered w-full bg-[#18181b] border-[#27272a] text-foreground placeholder:text-gray-400" required />
      <input name="password" type="password" placeholder="Password" value={props.type === "login" ? loginForm.password : registerForm.password} onChange={handleChange} className="input input-bordered w-full bg-[#18181b] border-[#27272a] text-foreground placeholder:text-gray-400" required />
      {props.type === "register" && (
        <>
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={registerForm.confirmPassword} onChange={handleChange} className="input input-bordered w-full bg-[#18181b] border-[#27272a] text-foreground placeholder:text-gray-400" required />
          <select name="role" value={registerForm.role} onChange={handleChange} className="input input-bordered w-full bg-[#18181b] border-[#27272a] text-foreground" required>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Department Admin</option>
          </select>
          <select name="department" value={registerForm.department} onChange={handleChange} className="input input-bordered w-full bg-[#18181b] border-[#27272a] text-foreground" required>
            <option value="">Select Department</option>
            {props.type === "register" && props.departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </>
      )}
      {props.error && <div className="text-red-400 text-sm">{props.error}</div>}
      <button type="submit" className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white border-none" disabled={props.loading}>
        {props.loading ? "Loading..." : props.type === "login" ? "Login" : "Register"}
      </button>
      <div className="text-center text-sm text-gray-400">
        {props.type === "login" ? (
          <span>Don&apos;t have an account? <Link href="/register" className="text-blue-400 hover:underline">Sign Up</Link></span>
        ) : (
          <span>Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Login</Link></span>
        )}
      </div>
    </form>
  );
}
