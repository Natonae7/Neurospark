import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useInView, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";

const LoadingLogo = () => (
  <motion.div 
    className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
    initial={{ opacity: 1 }}
    exit={{ 
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }}
  >
    <div className="relative">
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="relative z-10"
      >
        <div className="w-32 h-32 rounded-[30px] bg-[#00BCD4] flex items-center justify-center shadow-lg">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3,
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="text-white text-5xl font-bold"
          >
            NS
          </motion.span>
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 rounded-[30px] bg-[#00BCD4] filter blur-2xl opacity-40 -z-10"
      />
    </div>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.5,
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }}
      className="mt-8 text-lg text-gray-600 font-medium"
    >
      Your learning experience is loading
    </motion.p>
  </motion.div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingLogo />}
      </AnimatePresence>

      <Header />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: isLoading ? 0.3 : 0
        }}
        className="pt-32 pb-16 px-4 text-center relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
              delay: isLoading ? 0.5 : 0.2
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: isLoading ? 0.6 : 0.3
                }}
                className="block"
              >
                Transform Education
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: isLoading ? 0.7 : 0.4
                }}
                className="block mt-2"
              >
                Through
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: isLoading ? 0.8 : 0.5
                }}
                className="bg-gradient-to-r from-[#2196F3] to-[#00BCD4] bg-clip-text text-transparent block mt-2"
              >
                Intelligent Learning
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: isLoading ? 0.9 : 0.6
            }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            Empower your teaching and learning journey with AI-driven insights and personalized experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: isLoading ? 1.0 : 0.7
            }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 bg-gradient-to-r from-[#2196F3] to-[#00BCD4] hover:opacity-90 text-white font-medium rounded-full"
            >
              <Link to="/app/login">Get Started →</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Revolutionize Your Learning Experience</h2>
            <p className="mt-4 text-lg text-gray-500">Discover how our intelligent platform transforms education</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'AI-Powered Learning',
                description: 'Adaptive learning paths that evolve with each student\'s progress.'
              },
              {
                icon: '📊',
                title: 'Real-time Analytics',
                description: 'Track progress and identify areas for improvement instantly.'
              },
              {
                icon: '👥',
                title: 'Collaborative Learning',
                description: 'Foster engagement through interactive group activities.'
              },
              {
                icon: '📚',
                title: 'Personalized Curriculum',
                description: 'Tailored content that adapts to individual learning styles.'
              },
              {
                icon: '⏰',
                title: 'Time Management',
                description: 'Optimize study schedules for better learning outcomes.'
              },
              {
                icon: '🎯',
                title: 'Smart Assessment',
                description: 'AI-driven evaluation for accurate progress tracking.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: index * 0.1
                }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#00BCD4]/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
