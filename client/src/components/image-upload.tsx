"use client";
import { useState, ChangeEvent } from "react";
import Image from "next/image";

interface ApiResponse {
  response?: string;
  message?: string;
}

export default function ImageUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://127.0.0.1:8081/analyze-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setResult(data);
    } catch (error) {
      console.error("Error uploading image:", error);
      setResult({ message: "Error analyzing image." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div className="relative w-40 h-40">
          <Image
            src={preview}
            alt="Preview"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-100 w-full max-w-5xl">
          {result.response ? (
            <div
              className="text-sm whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: result.response }}
            />
          ) : (
            <p className="text-sm">{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}