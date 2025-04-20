import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Home, User } from 'lucide-react';
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
    <motion.div
      className="navbar border border-gray-600 rounded-md bg-base-300/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm text-white"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sm:text-sm  container mx-auto rounded-sm px-4 w-full max-w-screen-xl">
        <div className="flex-1 px-2 lg:flex-none flex flex-wrap items-center">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link
              href="/"
              className="btn btn-ghost text-lg sm:text-base gap-2 normal-case font-bold flex items-center"
              prefetch={true}
              onClick={() => showNotification("Welcome to ImageKit ReelsPro", "info")}
            >
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                <Home className="flex text-white flex-row w-5 h-5" />
              </motion.div>
              <span className="truncate text-white max-w-[150px] sm:max-w-none">IKit Reels</span>
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch gap-2">
            {session && (
              <div className="dropdown dropdown-end">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </motion.div>

                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] shadow-lg bg-base-100/95 backdrop-blur-sm rounded-box w-64 mt-4 py-2"
                >
                  <li className="px-4 py-1">
                    <span className="text-sm opacity-70 text-white">{session.user?.email?.split("@")[0]}</span>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <Link
                      href="/upload"
                      className="px-4 py-2 hover:bg-base-200/80 block w-full"
                      onClick={() => showNotification("Welcome to Admin Dashboard", "info")}
                    >
                      Video Upload
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-2 text-error hover:bg-base-200/80 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}