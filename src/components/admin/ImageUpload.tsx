"use client";

import React, { useRef, useState } from "react";
import { Upload, Link, X, Image as ImageIcon } from "lucide-react";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholders";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: keyof typeof PLACEHOLDER_IMAGES;
}

export default function ImageUpload({ value, onChange, placeholder = "project" }: ImageUploadProps) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) {
      onChange(data.url);
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  };

  return (
    <div className="space-y-3">
      {/* Preview */}
      <div className="relative w-full aspect-video bg-slate-100 border border-slate-200 overflow-hidden">
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 w-7 h-7 bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <ImageIcon className="w-8 h-8 mb-2" />
            <p className="text-xs">Tidak ada gambar</p>
          </div>
        )}
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
            mode === "url"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
          }`}
        >
          <Link className="w-3 h-3" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
            mode === "upload"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
          }`}
        >
          <Upload className="w-3 h-3" />
          Upload
        </button>
      </div>

      {/* URL input */}
      {mode === "url" && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors"
        />
      )}

      {/* Upload area */}
      {mode === "upload" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-[#ff4a16] bg-[#ff4a16]/[0.04]"
              : "border-slate-300 hover:border-slate-400"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
          {uploading ? (
            <p className="text-xs text-slate-500">Mengupload...</p>
          ) : (
            <>
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Klik atau seret gambar ke sini</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
