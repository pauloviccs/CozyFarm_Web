import { useScroll, useMotionValueEvent, motion, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from 'next/link';

export function HeroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (videoRef.current && videoRef.current.duration) {
            // Clamp the value between 0 and 0.999 to avoid loop/restart issues at exact 1.0
            const progress = Math.min(Math.max(latest, 0), 0.999);
            const time = progress * videoRef.current.duration;
            // Use fastSeek if available for smoother scrubbing, fallback to currentTime
            // simple currentTime is often smoother for frame-by-frame updates in modern browsers unless keyframe interval is large
            // Our ffmpeg workflow uses -g 1 (all-intra), so currentTime is perfectly fast.
            videoRef.current.currentTime = time;
        }
    });

    return (
        <div ref={containerRef} className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <video
                    ref={videoRef}
                    src="/hero-sequence.mp4"
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    // Ensure the video is loaded and ready
                    onLoadedMetadata={() => {
                        if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                        }
                    }}
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

