import ImageUpload from "@/components/image-upload";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-blue-900/90 via-blue-400/90 to-blue-200/90">
      <Navbar />
      <h1 className="text-6xl text-white m-4">Image Upload</h1>
      <ImageUpload />
    </main>
  );
}
