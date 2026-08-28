"use client";

import React, { useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Upload, Link, X, Image as ImageIcon } from "lucide-react";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholders";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: keyof typeof PLACEHOLDER_IMAGES;
}

const ASPECT_RATIOS: Record<keyof typeof PLACEHOLDER_IMAGES, number> = {
  hero: 16 / 9,
  about: 16 / 10,
  service: 4 / 3,
  project: 16 / 9,
  testimonial: 4 / 5,
};

async function cropToBlob(imageSrc: string, crop: Area): Promise<Blob> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = imageSrc;
  });
  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/webp", 0.9);
  });
}

function createImageFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ImageUpload({ value, onChange, placeholder = "project" }: ImageUploadProps) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropPixels, setCropPixels] = useState<Area | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const aspect = ASPECT_RATIOS[placeholder] ?? 16 / 9;

  const uploadBlob = async (blob: Blob) => {
    setUploading(true);
    const form = new FormData();
    form.append("file", new File([blob], `crop-${Date.now()}.webp`, { type: "image/webp" }));
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) onChange(data.url);
    setUploading(false);
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const src = await createImageFromFile(file);
    setCropSrc(src);
  };

  const confirmCrop = async () => {
    if (!cropSrc || !cropPixels) return;
    const blob = await cropToBlob(cropSrc, cropPixels);
    setCropSrc(null);
    await uploadBlob(blob);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
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
          Upload &amp; Crop
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
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          {uploading ? (
            <p className="text-xs text-slate-500">Mengupload...</p>
          ) : (
            <>
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Klik atau seret gambar ke sini</p>
              <p className="text-[10px] text-slate-400 mt-1">Akan tampil jendela crop sesuai format tampilan</p>
            </>
          )}
        </div>
      )}

      {/* Crop modal */}
      {cropSrc && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg flex flex-col max-h-[90vh]">
            <div className="px-4 py-3 border-b border-slate-200">
              <p className="text-sm font-bold text-slate-900">Atur Posisi Gambar</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Geser &amp; zoom untuk menyesuaikan. Rasio sudah diset sesuai format tampilan.</p>
            </div>
            <div className="relative h-72 bg-slate-900">
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) => setCropPixels(croppedAreaPixels)}
              />
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-600 flex-1">
                <span>Zoom</span>
                <input
                  type="range" min={1} max={3} step={0.05} value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-[#ff4a16] cursor-pointer"
                />
              </label>
              <button
                type="button"
                onClick={() => setCropSrc(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmCrop}
                disabled={uploading}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
              >
                {uploading ? "Mengupload..." : "Konfirmasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
