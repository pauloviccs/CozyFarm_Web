"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const frameCount = 80; // 000 to 079

export function HeroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, "0");
                    img.src = `/hero-sequence/1080p_${paddedIndex}.jpg`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setImagesLoaded(true);
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
                render(currentIndex.get());
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Init size

        return () => window.removeEventListener("resize", handleResize);
    }, [currentIndex, imagesLoaded]); // Dependency ensures resize re-renders current frame

    // Overlay Animation Hooks
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const textY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

    return (
        <div ref={containerRef} className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Cinematic Overlay */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none"
                    style={{ opacity, scale }}
                >
                    <div className="max-w-4xl px-6 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                            style={{ y: textY }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 backdrop-blur-md mb-6 pointer-events-auto">
                                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                                <span>Interactive Blueprint System</span>
                            </div>

                            <h1 className="text-7xl lg:text-9xl font-thin tracking-tighter text-white mb-6">
                                Cozy<span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Farming</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed"
                            style={{ y: textY }}
                        >
                            High-fidelity agricultural simulations for Hytale modding.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="flex flex-wrap justify-center gap-4 pt-8 pointer-events-auto"
                        >
                            <a href="/docs" className="px-8 py-4 rounded-full bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                Read Documentation
                            </a>
                            <a href="/farming" className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all backdrop-blur-xl">
                                Launch Simulators
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
            </div>
        </div>
    );
}
