"use client";

interface DownloadButtonProps {
  content: string;
}

export default function DownloadButton({ content }: DownloadButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
    >
      Download README.md
    </button>
  );
}
