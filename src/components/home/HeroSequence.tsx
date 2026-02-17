import { useScroll, useMotionValueEvent, motion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';

export function HeroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const frameCount = 80;
    const currentFrame = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises: Promise<void>[] = [];

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                const filename = `heroanim_720p_${i.toString().padStart(3, '0')}.jpg`;
                img.src = `/hero-sequence/${filename}`;

                const promise = new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // Continuing despite error to avoid breaking the sequence completely
                });

                loadedImages.push(img);
                imagePromises.push(promise);
            }

            setImages(loadedImages);

            // Draw first frame immediately
            if (loadedImages[0].complete) {
                renderFrame(0, loadedImages);
            } else {
                loadedImages[0].onload = () => renderFrame(0, loadedImages);
            }

            setIsLoading(false);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number, imgs: HTMLImageElement[]) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = imgs[index];

        if (!canvas || !ctx || !img || !img.complete) return;

        // Scaling to cover
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Update canvas size on resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(currentFrame.current, images);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [images]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * frameCount)
        );

        if (frameIndex !== currentFrame.current && images.length > 0) {
            currentFrame.current = frameIndex;
            requestAnimationFrame(() => renderFrame(frameIndex, images));
        }
    });

    return (
        <div ref={containerRef} className="h-[300vh] relative bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Cinematic Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                    <motion.div
                        className="max-w-5xl px-6 space-y-10 flex flex-col items-center"
                        style={{
                            opacity: useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]),
                            scale: useTransform(scrollYProgress, [0, 0.4], [1, 0.9])
                        }}
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
                            <Link href="/docs" className="group relative px-8 py-4 rounded-full bg-white text-slate-950 font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                <span className="relative z-10">Read Documentation</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/farming" className="group px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105 hover:border-white/30">
                                Launch Simulators
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
            </div>
        </div>
    );
}

