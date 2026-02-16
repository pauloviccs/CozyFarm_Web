"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { GlassCard } from "@/components/ui/glass-card";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Save, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccountForm() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'warning', text: string } | null>(null);

    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const supabase = createClient();

    const handleUpdateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // Validation
        if (password && password !== confirmPassword) {
            setMessage({ type: 'error', text: 'As senhas não coincidem.' });
            setIsLoading(false);
            return;
        }

        const updates: { email?: string; password?: string } = {};
        if (email !== user?.email) updates.email = email;
        if (password) updates.password = password;

        if (Object.keys(updates).length === 0) {
            setMessage({ type: 'warning', text: 'Nenhuma alteração detectada.' });
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser(updates);

            if (error) throw error;

            let successMsg = 'Conta atualizada com sucesso!';
            if (updates.email) successMsg += ' Verifique seu novo email para confirmar.';

            setMessage({ type: 'success', text: successMsg });
            setPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erro ao atualizar conta.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlassCard className="p-6 md:p-8 space-y-8 bg-slate-900/50 backdrop-blur-xl border-white/5">
            <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-400 border border-red-500/20">
                    <Lock className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-medium text-white">Segurança da Conta</h2>
                    <p className="text-sm text-white/50">Atualize suas credenciais de acesso.</p>
                </div>
            </div>

            <form onSubmit={handleUpdateAccount} className="space-y-8">
                <div className="space-y-6">
                    {/* Email Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 ml-1">Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                            />
                        </div>
                        <p className="text-xs text-white/40 ml-1">
                            Alterar o email exigirá confirmação no novo endereço.
                        </p>
                    </div>

                    <div className="h-px bg-white/5 w-full" />

                    {/* Password Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 ml-1">Nova Senha</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 ml-1">Confirmar Senha</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium border animate-in fade-in slide-in-from-top-1 flex items-center gap-2",
                        message.type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                            message.type === 'error' ? "bg-red-500/10 border-red-500/20 text-red-400" :
                                "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    )}>
                        {message.type === 'success' && <CheckCircle className="w-4 h-4" />}
                        {message.type === 'error' && <AlertTriangle className="w-4 h-4" />}
                        {message.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                        {message.text}
                    </div>
                )}

                <div className="pt-6 border-t border-white/5 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        )}
                        <span>Salvar Credenciais</span>
                    </button>
                </div>
            </form>
        </GlassCard>
    );
}
