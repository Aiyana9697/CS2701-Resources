import { useState } from "react";
import { FloatingParticles } from './ui/FloatingParticles';
import { Label } from "./ui/label";
import { Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function PasswordRecovery() {
  const [current, setCurrent] = useState<"login" | "Passwordreset">("login");
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [resetEmail, setResetEmail] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login:", loginData);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("password reset email:", resetEmail);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-400 via-blue-600 to-blue-950">

      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 py-16 pb-24">
        <div className="max-w-md mx-auto">

          {/* login UI*/}
          {current === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <Label htmlFor="login-email" className="text-cyan-100">
                Email
              </Label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-300"
                  required
                />
              </div>

              <Label htmlFor="login-password" className="text-cyan-100">
                Password
              </Label>

              <div className="relative mt-2">
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="pl-10 bg-white/5 border-cyan-400/30 text-white"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-cyan-100">Remember me</label>

                <button
                  type="button"
                  onClick={() => setCurrent("Passwordreset")}
                  className="text-blue-300 underline bg-transparent p-0 border-none"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Sign In
              </Button>
            </form>
          )}

          {/* Reset Password UI */}
          {current === "Passwordreset" && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <Label htmlFor="Passwordreset-email" className="text-cyan-100">
                Email Address
              </Label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-10 bg-blue-950/30 border border-blue-800 text-cyan-100"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Send Reset Link
              </Button>

              <p className="text-center mt-4 text-black">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => setCurrent("login")}
                  className="text-blue-300 underline bg-transparent p-0 border-none"
                >
                  Back to Login
                </button>
              </p>
            </form>
          )}

        </div>
      </div>

    </section>
  );
}
