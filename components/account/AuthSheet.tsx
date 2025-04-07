"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthSheet({ isOpen, onClose }: AuthSheetProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 backdrop-blur-md z-[60]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold font-sans tracking-tight">Profile</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 px-8 py-12 flex flex-col justify-center max-w-sm mx-auto w-full space-y-6">

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email*</label>
                                    <input type="email" className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password*</label>
                                    <input type="password" className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" />
                                </div>
                            </div>

                            <button className="text-xs font-bold underline text-left w-fit">Forgot your password?</button>

                            <div className="pt-8 space-y-4">
                                <Button className="w-full h-12 bg-black text-white hover:bg-zinc-800 rounded-full font-medium">
                                    Sign in
                                </Button>
                                <Button variant="outline" className="w-full h-12 rounded-full font-medium border-gray-300 hover:border-black hover:bg-transparent">
                                    Create an account
                                </Button>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
