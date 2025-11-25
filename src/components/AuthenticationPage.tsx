/* 
React component displaying an authentication page containing: 
- A login / registration form 
- Tabs to switch between login and registration
- Animated background particle effect / floating logo 
- Optional 'back to home' button 
- form validation and state management for user inputs
- Tailwind CSS for styling
- Lucide icons for visual elements
*/
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Waves, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { FloatingParticles } from './ui/FloatingParticles';


interface AuthPageProps {
  onBack?: () => void;
}

/* 
Defines AuthPage compomnent which: 
- Accepts optional onBack prop to handle back button click 
- useState stores the users inputs & updates as the user types
- Creates a boolean state for 'remember me' and 'agree to terms' checkboxes 
- Defines a function that runs when the form is submitted 
  - Stops the page from refreshing when the form is submitted 
  - Prints the form data to the console (placeholder for actual auth logic) 
*/
export function AuthPage({ onBack }: AuthPageProps) {
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

    // email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid Email Address. Please enter your email again.");
      return;
    }

    // password length validation
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    console.log("Login:", loginData);

    // Optional redirect logic goes here
    // if (onLoginSuccess) onLoginSuccess();
    onLoginSuccess(); // ⭐ TRIGGER redirect to homepage
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = registerData.name.trim();
    const email = registerData.email.trim();
    const password = registerData.password.trim();
    const confirmPassword = registerData.confirmPassword.trim();

    // full name validation
    if (!/^[A-Za-z']+(?:\s+[A-Za-z']+)+$/.test(fullName)) {
      alert("Invalid Full Name. Please enter your first and last name.");
      return;
    }

    // email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid Email Address. Please enter your email again.");
      return;
    }

    // password validation
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // password match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // terms agreement validation
    if (!agreedToTerms) {
      alert("Please agree to the Terms and Privacy Policy.");
      return;
    }

    console.log("Register:", registerData);
  };


/*
Defines the main container for the page and ensures it: 
- fits the whole screen 
- centers everything inside it 
- hides overflow content 
- uses a blue gradient background
*/
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-400 via-blue-600 to-blue-950">
      
      {/* Call the FloatingParticles component to render animated background particles*/}
      <FloatingParticles />

      {/* 
      shows a 'back to home' button only if onBack function is provided, if onBack exists the button is rendered
      button uses framer-motion animation to slide in from the left when the page loads
      when the user clicks the button, the onBack function is run 
      positions button at the top left, and layers it above other content
      shows a left arrow icon and 'Back to Home' text
      */}

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

      {/* 
      Creates a centered container for the login/register cards
      animation - fades in and slides up the container when the page is loaded, lasting 0.8 secs 
      */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 
          Centers the logo and adds a margin below it
          animation - moves the logo up and down in a loop (makes it float)
           */}
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
              {/* 
              Creates a circular background for the logo with a border and blur effect
              uses the Waves icon from Lucide as the logo
             */}

              <div className="w-16 h-16 mx-auto bg-cyan-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-300/30">
                <Waves className="w-8 h-8 text-cyan-300" />
              </div>

            </motion.div>

            <h2 className="text-white mb-2">Welcome to OceanIQ</h2>
            <p className="text-cyan-200">Join us in protecting our oceans</p>
          </div>

          {/* 
          Creates the card container for the login/register forms
          animation - fades in and scales up the card when it appears, lasting 0.5 secs and starting 0.2 secs after page loads
          card has a slight transparent white background with a blurry glass effect, cyan border, rounded corners and soft shadow
          creates 2 tabs for login / reg where default is login
          has a horizontal bar at the top containing the tab buttons allowing users to switch between forms
          */}
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



              {/* 
              Login form that appears when the 'Login' tab is selected
              Includes email / password fields, remember me checkbox, forgot password link and submit button
              When user clicks 'sign in' button, handleLogin function is run
              Email field contains labrl, Mail icon, placeholder text and updates the loginData.email as user types
              */}
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

                  {/* 
                  Password field contains Lock icon, placeholder text and updates loginData.password as user types
                  */}
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

                  {/* 
                  Remember me checkbox updates its state when clicked
                  Forgot password has a clickable link (currently has placeholder '#')
                  Sign in button is clicked to submit the login form
                  */}
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



              {/*
              Registration form that appears when the 'Register' tab is selected
              Includes full name / email / password / confirm password fields, accept Terms & Privacy Policy checkbox and creeate account button
              When user clicks 'create account' button, handleRegister function is run
              fields contains label, icon, placeholder text and updates variables (e.g. registerData.name) as the user types
              Remember me checkbox updates its state when clicked
              Forgot password link is styled to change color on hover
              Submit button spans full width, has cyan background and shadow, changes color on hover
              */}
              <TabsContent value="register" className="p-6">
                <form onSubmit={handleRegister} className="space-y-4">
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
                        required
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
          
                  
                  {/*
                  Terms & Privacy Policy checkbox updates agreedToTerms state to true if checked and false if not
                  Includes clickable links to Terms of Service and Privacy Policy (currently placeholders '#')
                  Create Account button is clicked to submit the registration form
                  Submit button is disabled until user agrees to the terms (mandatory)
                  */}
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

          {/* 
          Display message below the forms, which is centered, positioned with a margin at the top and is light cyan in colour
          */}
          <p className="text-center text-cyan-200 text-sm mt-6">
            By joining OceanSDG, you're contributing to global ocean conservation efforts
          </p>
        </motion.div>
      </div>
    </section>
  );
}
