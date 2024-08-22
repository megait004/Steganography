import { useState } from "react";
import axios from "axios";
import { FileUpload } from "@components/ui/file-upload";
import { ImageUpload } from "@components/ui/image-upload";
import { Button } from "@components/ui/moving-border-button";

const Create: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null); // State to hold the download URL

    const handleFileChange = (newFiles: File[]) => {
        setFile(newFiles[0] || null);
    };

    const handleImageChange = (newImages: File[]) => {
        setImage(newImages[0] || null);
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        if (file) {
            formData.append("file", file);
        }

        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.post("http://127.0.0.1:8080/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                responseType: "blob"
            });

            const downloadUrl = URL.createObjectURL(response.data);
            setDownloadUrl(downloadUrl);

            console.log("Upload success:", response.data);
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <ImageUpload onChange={handleImageChange} />
                <FileUpload onChange={handleFileChange} />
            </div>
            <Button
                borderRadius="1.5rem"
                onClick={handleSubmit}
                containerClassName="relative inline-flex items-center justify-center overflow-hidden text-xl h-16 w-48 p-1 rounded-lg bg-transparent"
                duration={1500}
                className="relative flex h-full w-full transform items-center justify-center rounded-lg text-lg font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
                Upload
            </Button>
            {downloadUrl && (
                <a
                    href={downloadUrl}
                    download="combined_image.jpg"
                    className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
                >
                    Download Combined Image
                </a>
            )}
        </div>
    );
};

export default Create;
