"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function PageLoading() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50  flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            className="relative w-20 h-20"
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
          >
            {/* Animated loading spinner with gradient */}
        
         <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-primary/30 border-l-transparent" />
          

{/* 
          <DotLottieReact
          src="/animations/load.lottie"
          loop
          autoplay
         
       
        /> */}
        
          </motion.div>

          <motion.h2
            className="text-2xl font-bold mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-Molle w-3xl h-3xl">Hello</span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground font-Aladin mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          >
           Get ready ......
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

