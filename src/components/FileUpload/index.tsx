import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    maxSize?: number;
    preview?: string;
}

export function FileUpload({
    onFileSelect,
    accept = "image/png,image/jpeg,image/gif",
    maxSize = 10 * 1024 * 1024,
    preview,
}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > maxSize) {
                alert(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
                return;
            }
            onFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (file.size > maxSize) {
                alert(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
                return;
            }
            onFileSelect(file);
        }
    };

    return (
        <div
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative h-44 rounded-2xl border-2 cursor-pointer transition-colors ${isDragging
                ? "border-[#C1BDDB] bg-pink/5"
                : "border-[#C1BDDB] hover:border-[#b4b1c7]"
                }`}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />
            {preview ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                        src={preview}
                        alt="Preview"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm">Click to change</span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full px-8">
                    <Upload className="w-12 h-12 text-[#A2C7E5] mb-4" strokeWidth={1.5} />
                    <p className="text-base text-[#303A2B] text-center mb-2">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-[#606060] text-center">
                        PNG, JPG, GIF up to 10MB
                    </p>
                </div>
            )}
        </div>
    );
}
