"use client";

import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const frameCount = 80; // 000 to 079

export function HeroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];
            let loadedCount = 0;

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, "0");
                    img.src = `/hero-sequence/1080p_5.mp4_conv_${paddedIndex}.jpg`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            // Small delay to ensure 100% is seen
            setTimeout(() => setImagesLoaded(true), 500);
        };

        loadImages();
    }, []);

    const render = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const img = images[Math.round(index)];
        if (!img) return;

        // Maintain aspect ratio and cover functionality
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const xOffset = (canvasWidth - newWidth) / 2;
        const yOffset = (canvasHeight - newHeight) / 2;

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(img, xOffset, yOffset, newWidth, newHeight);
    };

    useEffect(() => {
        if (!imagesLoaded) return;

        // Initial render
        render(0);

        const unsubscribe = currentIndex.on("change", (latest) => {
            render(latest);
        });

        return () => unsubscribe();
    }, [currentIndex, imagesLoaded]);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Only render if images are loaded to avoid errors
                if (images.length > 0) {
                    render(currentIndex.get());
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Init size

        return () => window.removeEventListener("resize", handleResize);
    }, [currentIndex, imagesLoaded, images]);

    // Overlay Animation Hooks
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.8, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -600]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <div ref={containerRef} className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden perspective-[1000px]">
                <AnimatePresence mode="wait">
                    {!imagesLoaded && (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center space-y-6"
                            >
                                <div className="text-6xl md:text-8xl font-thin tracking-tighter tabular-nums">
                                    {loadingProgress}%
                                </div>
                                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                                <p className="text-white/60 font-light tracking-widest uppercase text-sm">
                                    Carregando sua experiência
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Cinematic Overlay */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none perspective-[1000px]"
                    style={{ opacity }}
                >
                    <motion.div
                        className="max-w-5xl px-6 space-y-10 flex flex-col items-center origin-bottom"
                        style={{ scale, y: textY, rotateX }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 backdrop-blur-md mb-8 pointer-events-auto hover:bg-white/10 transition-colors cursor-default">
                                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                                <span className="tracking-wide uppercase">Interactive Blueprint System</span>
                            </div>

                            <h1 className="text-8xl lg:text-[10rem] font-thin tracking-tighter text-white mb-2 leading-none select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                                Cozy<span className="font-normal text-white">Farming</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-2xl md:text-3xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                        >
                            High-fidelity agricultural simulations for Hytale modding.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="flex flex-col sm:flex-row gap-5 pt-4 pointer-events-auto"
                        >
                            <a href="/docs" className="group relative px-8 py-4 rounded-full bg-white text-slate-950 font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                <span className="relative z-10">Read Documentation</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="/farming" className="group px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105 hover:border-white/30">
                                Launch Simulators
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
            </div>
        </div>
    );
}
