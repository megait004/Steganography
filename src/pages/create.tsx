import { useState } from "react";
import axios from "axios";
import { FileUpload } from "@components/ui/file-upload";
import { ImageUpload } from "@components/ui/image-upload";
import { Button } from "@components/ui/moving-border-button";
const Create: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const handleFileChange = (newFiles: File[]) => {
        setFiles(newFiles);
    };
    const handleImageChange = (newImages: File[]) => {
        setImages(newImages);
    };
    const handleSubmit = async () => {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        images.forEach((image) => formData.append("images", image));
        try {
            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

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
        </div>
    );
};

export default Create;
