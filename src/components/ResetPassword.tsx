/* 
React component for handling a 4-step password reset flow where: 
- User enters their email 
- User enters verification code 
- User sets a new password 
- Success screen is loaded
*/

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, CheckCircle2, KeyRound } from 'lucide-react';

interface ResetPasswordProps {
  onBack: () => void;
}

/*
State variables: 
1) resetStep - defines which step of the reset process to show
2) resetEmail - stores the user's email 
3) verificationCode - stores the 6 digit code the user entered 
4/5) newPassword / confirmNewPassword - stores the new paswords before validation
6) mockCode - stores the 6 digit number the user must enter to reset their password (used for test purposes, needs changing)
*/
export function ResetPassword({ onBack }: ResetPasswordProps) {
  const [resetStep, setResetStep] = useState<'email' | 'code' | 'newPassword' | 'success'>('email');
  const [resetEmail, setResetEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [mockCode] = useState('123456'); // Mock verification code

  /*
  Event Handler 1 (handleSendResetEmail): 
  - prevents page from refreshing 
  - logs to the console that the code is being sent to user's email
  - Moves reset UI flow to the next step (code)  
  */
  const handleSendResetEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending verification code to:', resetEmail);
    setResetStep('code');
  };

  /*
  Event Handler 2 (handleVerifyCode): 
  - prevents page from refreshing 
  - checks if the input matches the mock code (123456)
  - if true, reset UI flow is moved to the next step (newPassword)
  - else an alert is shown prompting the user to enter the correct code
  */
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === mockCode) {
      setResetStep('newPassword');
    } else {
      alert('Invalid verification code. Use 123456 for demo purposes.');
    }
  };

  /*
 Event Handler 3 (handleResetPassword): 
 - prevents page from refreshing 
 - checks if password and confirm password fields match (if false, alert is produced)
 - checks is the password length < 8 (if true, alert is produced)
 - if passwords match and ≥ 8, Successfull password reset for email is logged in console
 - Moves reset UI flow to the next step (success)  
 */
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    console.log('Password reset successful for:', resetEmail);
    setResetStep('success');
  };

  /*
  animation - fades in, scales slightly then fades out when animation exits, lasting 0.3s 
  has a glass effect, cyan border, rounded corners, shadow, overflow hidden
  */
  return (
    <motion.div
      key="reset"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl border border-cyan-400/30 shadow-2xl overflow-hidden"
    >
      {/*
      header for the card is defined with a key icon and title "Reset Password"
      has semi-transparent dark background, bottom border, padding, flex layout for icon + text, gap between icon and text   
      */}
      <div className="bg-slate-950/50 border-b border-cyan-400/20 p-4 flex items-center gap-3">
        <KeyRound className="w-5 h-5 text-cyan-400" />
        <h3 className="text-cyan-300">Reset Password</h3>
      </div>

      {/*
      Defines the main content container for the current step of the password reset
      only shows this if resetStep is email
      animation - form slides in from the right and fades in
      when form is submitted, handleSendResetEmail() is called
      */}  
      <div className="p-6">
        {resetStep === 'email' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSendResetEmail}
            className="space-y-4"
          >
          {/*
          instruction text prompts user to enter their email to recieve code 
          email input field allows the user to type in their email
          user input value is stored in resetEmail state variable 
          has main ico
          */}
            <p className="text-cyan-100 text-sm mb-4">
              Enter your email address and we'll send you a verification code to reset your password.
            </p>
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-cyan-100">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
              >
                Send Code
              </Button>
            </div>
          </motion.form>
        )}

        {resetStep === 'code' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleVerifyCode}
            className="space-y-4"
          >
            <p className="text-cyan-100 text-sm mb-4">
              We've sent a verification code to <span className="text-cyan-300">{resetEmail}</span>.
              <br />
              <span className="text-cyan-400/70 text-xs">(Demo: Use code 123456)</span>
            </p>
            <div className="space-y-2">
              <Label htmlFor="verification-code" className="text-cyan-100">
                Verification Code
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <Input
                  id="verification-code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                  required
                  maxLength={6}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setResetStep('email')}
                className="flex-1 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
              >
                Verify
              </Button>
            </div>
          </motion.form>
        )}

        {resetStep === 'newPassword' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleResetPassword}
            className="space-y-4"
          >
            <p className="text-cyan-100 text-sm mb-4">
              Create a new password for your account. Make sure it's at least 8 characters long.
            </p>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-cyan-100">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-new-password" className="text-cyan-100">
                Confirm New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <Input
                  id="confirm-new-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-cyan-400/30 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
            >
              Reset Password
            </Button>
          </motion.form>
        )}

        {resetStep === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-4 py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-16 h-16 text-cyan-400" />
            </motion.div>
            <h3 className="text-cyan-300">Password Reset Successful!</h3>
            <p className="text-cyan-100 text-center text-sm">
              Your password has been reset successfully. You can now log in with your new password.
            </p>
            <Button
              type="button"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
              onClick={onBack}
            >
              Back to Login
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
