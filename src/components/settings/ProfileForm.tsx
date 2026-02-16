"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { GlassCard } from "@/components/ui/glass-card";
import { createClient } from "@/lib/supabase/client";
import { Camera, Save, User, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProfileForm() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Initial state
    const [nickname, setNickname] = useState(user?.user_metadata?.nickname || "");
    const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || "");

    const supabase = createClient();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    nickname: nickname,
                    avatar_url: avatarUrl
                }
            });

            if (error) throw error;

            setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erro ao atualizar perfil.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlassCard className="p-6 md:p-8 space-y-8 bg-slate-900/50 backdrop-blur-xl border-white/5">
            <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-medium text-white">Perfil Público</h2>
                    <p className="text-sm text-white/50">Gerencie como você aparece para os outros.</p>
                </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group">
                            <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-950 border-2 border-white/10 shadow-xl">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20 bg-white/5">
                                        <User className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <Camera className="w-6 h-6 text-white drop-shadow-md" />
                            </div>
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-xs font-medium text-white/70">Foto de Perfil</p>
                            <p className="text-[10px] text-white/30 max-w-[120px]">
                                Cole uma URL de imagem válida abaixo.
                            </p>
                        </div>
                    </div>

                    {/* Inputs Section */}
                    <div className="flex-1 w-full space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 ml-1">Nickname (Nome de exibição)</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="Como devemos te chamar?"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all font-medium"
                                />
                            </div>
                            <p className="text-xs text-white/40 ml-1">Este nome substituirá seu email no dashboard.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 ml-1">URL do Avatar</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                    placeholder="https://example.com/image.png"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all font-mono text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium border animate-in fade-in slide-in-from-top-1",
                        message.type === 'success'
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-red-500/10 border-red-500/20 text-red-400"
                    )}>
                        {message.text}
                    </div>
                )}

                <div className="pt-6 border-t border-white/5 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-purple-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        )}
                        <span>Salvar Alterações</span>
                    </button>
                </div>
            </form>
        </GlassCard>
    );
}
