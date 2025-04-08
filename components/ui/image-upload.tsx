"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setProgress(0);

        try {
            // 1. Get Presigned URL
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    filename: file.name,
                    contentType: file.type,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to get upload url");
            }

            const { uploadUrl, fileUrl } = await res.json();

            // 2. Upload to S3
            const uploadRes = await fetch(uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type,
                },
                body: file,
            });

            if (!uploadRes.ok) {
                throw new Error("Upload to S3 failed");
            }

            // 3. Update Parent
            onChange(fileUrl);

        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong during upload.");
        } finally {
            setIsUploading(false);
        }
    };

    const onRemove = () => {
        onChange("");
    };

    return (
        <div className="space-y-4 w-full">
            {/* Hidden Input */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload-input"
                onChange={onUpload}
                disabled={disabled || isUploading}
            />

            {value ? (
                <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <Image
                        src={value}
                        alt="Upload"
                        fill
                        className="object-cover"
                    />
                    <button
                        onClick={onRemove}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        type="button"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <label
                    htmlFor="image-upload-input"
                    className={cn(
                        "flex flex-col items-center justify-center w-full max-w-sm h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors",
                        (disabled || isUploading) && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {isUploading ? (
                            <>
                                <Loader2 className="w-10 h-10 mb-3 text-gray-400 animate-spin" />
                                <p className="mb-2 text-sm text-gray-500">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <ImagePlus className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 5MB)</p>
                            </>
                        )}
                    </div>
                </label>
            )}
        </div>
    );
}
