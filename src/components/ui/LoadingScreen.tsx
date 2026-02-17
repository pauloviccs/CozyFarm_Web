"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";
import { useEffect, useState } from "react";

export function LoadingScreen() {
    const { isLoading, progress } = useLoading();
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            // Delay removing the component from DOM to allow exit animation to finish
            const timer = setTimeout(() => setShow(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!show) return null;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }} // Custom ease for "curtain" feel
                >
                    <div className="relative overflow-hidden w-full max-w-md flex flex-col items-center gap-8">
                        {/* Logo or Title */}
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl font-thin tracking-tighter"
                        >
                            Cozy<span className="font-normal">Tale</span>
                        </motion.h1>

                        {/* Progress Bar / Counter */}
                        <div className="flex flex-col items-center gap-2 w-64">
                            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-purple-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                            <span className="text-xs font-mono text-white/50">{Math.round(progress)}%</span>
                        </div>

                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute -z-10 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
