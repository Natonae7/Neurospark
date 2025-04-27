import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  isTransparent?: boolean;
  showLoginButton?: boolean;
}

export const Header = ({ isTransparent = false, showLoginButton = true }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        duration: 0.6
      }}
      className={`fixed top-0 left-0 right-0 ${isTransparent ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md'} z-40 border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 rounded-lg bg-[#00BCD4] flex items-center justify-center transition-transform group-hover:scale-110"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-1 bg-gradient-to-r from-[#2196F3] to-[#00BCD4] rounded-lg"
            >
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
            <motion.div className="flex items-center space-x-2">
              <motion.span 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#2196F3] to-[#00BCD4] group-hover:opacity-80 transition-opacity"
              >
                NS
              </motion.span>
              <motion.span 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-semibold text-xl text-gray-700 dark:text-gray-200 group-hover:opacity-80 transition-opacity"
              >
                NeuroSpark
              </motion.span>
            </motion.div>
          </motion.div>
        </Link>
        {showLoginButton && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="/app/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
