import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Waves, Mail, Lock, User, ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  onBack?: () => void;
  onLoginSuccess: () => void;
}

export function AuthPage({ onBack, onLoginSuccess}: AuthPageProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  const email = loginData.email.trim();
  const password = loginData.password.trim();

  // email follows a proper format 
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Invalid Email Address. Please enter your email address again.");
    return;
  }

  // check password is at least 8 characters long
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  // If we get here, login was successful
  console.log("Login successful!");

  onLoginSuccess();  // ⭐ TRIGGER redirect to homepage
};

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', registerData);
    // Add your registration logic here

    const FullName = registerData.name.trim();
    const email = registerData.email.trim();
    const password = registerData.password.trim();
    const confirmPassword = registerData.confirmPassword.trim();
    
    // fullname validation
if(!/^[A-Za-z']+(?:\s+[A-Za-z']+)+$/.test(FullName)){
alert("Invalid Full Name. Please enter your full name (first and last).");
return;
}

// email validation
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    alert("Invalid Email Address. Please enter your email address again.");
    return;
}
// password validation
if(password.trim().length<8 ){
    alert("Password must be at least 8 characters long.")
    return;
}
// password confirmation
if(password!==confirmPassword){
    alert("Passwords do not match. please re-enter your password.");
    return;
}
// terms agreement
if(!agreedToTerms){
alert("Please agree to the terms and conditions before submitting.");
return;
}
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-400 via-blue-600 to-blue-950">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-300/70 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Back button */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="absolute top-5 left-6 z-20 flex items-center gap-2 text-white hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-block mb-4"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-16 h-16 mx-auto bg-cyan-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-300/30">
                <Waves className="w-8 h-8 text-cyan-300" />
              </div>
            </motion.div>
            <h2 className="text-white mb-2">Welcome to OceanIQ</h2>
            <p className="text-cyan-200">Join us in protecting our oceans</p>
          </div>

          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-cyan-400/30 shadow-2xl overflow-hidden"
          >
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-950/50 border-b border-cyan-400/30">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 text-slate-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 text-slate-300"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-cyan-100">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-300 focus:border-cyan-400 focus:ring-cyan-400/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-cyan-100">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-300 focus:border-cyan-400 focus:ring-cyan-400/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked as boolean)
                        }
                        className="border-cyan-400/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-cyan-100 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-cyan-300 hover:text-cyan-200">
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="p-6">
                <form onSubmit= {handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-cyan-100">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="John Doe"
                        value={registerData.name}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, name: e.target.value })
                        }
                        className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-300 focus:border-cyan-400 focus:ring-cyan-400/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-cyan-100">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, email: e.target.value })
                        }
                        className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-300 focus:border-cyan-400 focus:ring-cyan-400/50"
                        required // tells browser that the email field must not be empty
                                 // required is used to default the error message("please fill out this field")
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-cyan-100">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-300 focus:border-cyan-400 focus:ring-cyan-400/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-cyan-100">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-300 focus:border-cyan-400 focus:ring-cyan-400/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) =>
                        setAgreedToTerms(checked as boolean)
                      }
                      className="border-cyan-400/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 mt-1"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-cyan-100 cursor-pointer"
                    >
                      I agree to the{' '}
                      <a href="#" className="text-cyan-300 hover:text-cyan-200">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-cyan-300 hover:text-cyan-200">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                    disabled={!agreedToTerms}
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Additional info */}
          <p className="text-center text-cyan-200 text-sm mt-6">
            By joining OceanSDG, you're contributing to global ocean conservation efforts
          </p>
        </motion.div>
      </div>
    </section>
  );
}
