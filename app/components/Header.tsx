
'use client'
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Home, User, Sparkles, Video, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNotification } from './Notification';

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");

    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-2xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="w-8 h-8 text-purple-400" />
                <motion.div
                  className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  VORTEX
                </span>
              
              </div>
            </Link>
          </motion.div>
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="dropdown dropdown-end">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium hidden sm:block">
                    {session.user?.email?.split("@")[0]}
                  </span>
                </motion.div>

                <ul className="dropdown-content z-[1] shadow-2xl bg-black/90 backdrop-blur-xl rounded-xl w-64 mt-4 py-3 border border-white/10">
                  <li className="px-4 py-2">
                    <span className="text-sm text-gray-400">Welcome back!</span>
                  </li>
                  <div className="divider my-2 bg-white/10"></div>
                  <li>
                    <Link
                      href="/upload"
                      className="px-4 py-3 hover:bg-white/10 block w-full transition-colors flex items-center space-x-3"
                      onClick={() => showNotification("Welcome to Upload Studio", "info")}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Video</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-3 text-red-400 hover:bg-red-500/10 w-full text-left transition-colors flex items-center space-x-3"
                    >
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/login" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}