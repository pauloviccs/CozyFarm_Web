"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    completedItems: Set<string>;
    signInWithDiscord: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<{ error: any }>;
    signUpWithEmail: (email: string, password: string) => Promise<{ error: any }>;
    signOut: () => Promise<void>;
    toggleItemCompletion: (itemId: string) => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        // Initial Session Check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchCompletedItems(session.user.id);
            } else {
                setIsLoading(false);
            }
        });

        // Listen for Auth Changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchCompletedItems(session.user.id);
            } else {
                setCompletedItems(new Set());
                setIsLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchCompletedItems = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('user_items')
                .select('item_id')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching completed items:', error);
                return;
            }

            if (data) {
                setCompletedItems(new Set(data.map(item => item.item_id)));
            }
        } catch (err) {
            console.error('Unexpected error fetching items:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithDiscord = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const signInWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const signUpWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setCompletedItems(new Set());
    };

    const toggleItemCompletion = async (itemId: string) => {
        if (!user) return;

        const isCompleted = completedItems.has(itemId);

        // Optimistic Update
        const newCompletedItems = new Set(completedItems);
        if (isCompleted) {
            newCompletedItems.delete(itemId);
        } else {
            newCompletedItems.add(itemId);
        }
        setCompletedItems(newCompletedItems);

        try {
            if (isCompleted) {
                const { error } = await supabase
                    .from('user_items')
                    .delete()
                    .match({ user_id: user.id, item_id: itemId });

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('user_items')
                    .insert({ user_id: user.id, item_id: itemId });

                if (error) throw error;
            }
        } catch (error) {
            // Revert on error
            console.error('Error toggling item:', error);
            setCompletedItems(completedItems); // Revert to previous state
            alert('Failed to update item status. Please try again.');
        }
    };

    return (
        <AuthContext.Provider value={{
            session,
            user,
            completedItems,
            signInWithDiscord,
            signInWithEmail,
            signUpWithEmail,
            signOut,
            toggleItemCompletion,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
