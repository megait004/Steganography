import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { IconPhotoUp } from "@tabler/icons-react";

const mainVariant = {
    initial: {
        x: 0,
        y: 0,
    },
    animate: {
        x: 20,
        y: -20,
        opacity: 0.9,
    },
};

const secondaryVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const ImageUpload = ({
    onChange,
}: {
    onChange?: (files: File[]) => void;
}) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (newFiles: File[]) => {
        if (newFiles.length > 0) {
            const newFile = newFiles[0];
            const imageUrl = URL.createObjectURL(newFile);
            setImage(newFile);
            setPreview(imageUrl);
            if (onChange) {
                onChange([newFile]);
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const { getRootProps, isDragActive } = useDropzone({
        multiple: false,
        accept: { "image/*": [] },
        noClick: true,
        onDrop: handleFileChange,
        onDropRejected: (error) => {
            console.log(error);
        },
    });

    return (
        <div className="w-full" {...getRootProps()}>
            <motion.div
                onClick={handleClick}
                whileHover="animate"
                className="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        handleFileChange(Array.from(e.target.files || []))
                    }
                    className="hidden"
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                    <GridPattern />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
                        Put your image here
                    </p>
                    <p className="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400">
                        Drag or drop your image here or click to upload
                    </p>
                    <div className="relative mx-auto mt-10 w-full max-w-xl">
                        {preview && (
                            <motion.div
                                key="image-preview"
                                layoutId="image-upload"
                                className="relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 shadow-sm md:h-52 dark:bg-neutral-900"
                            >
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-32 w-full rounded-md object-cover"
                                />
                                <div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
                                    <p className="rounded-md bg-gray-100 px-1 py-0.5 dark:bg-neutral-800">
                                        {image?.type || "Unknown type"}
                                    </p>
                                    <p>
                                        modified{" "}
                                        {image
                                            ? new Date(
                                                  image.lastModified,
                                              ).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                        {!image && (
                            <motion.div
                                layoutId="image-upload"
                                variants={mainVariant}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className="relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white shadow-[0px_10px_50px_rgba(0,0,0,0.1)] group-hover/file:shadow-2xl dark:bg-neutral-900"
                            >
                                {isDragActive ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center text-neutral-600"
                                    >
                                        Drop it
                                        <IconPhotoUp className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                    </motion.p>
                                ) : (
                                    <IconPhotoUp className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                                )}
                            </motion.div>
                        )}
                        {!image && (
                            <motion.div
                                variants={secondaryVariant}
                                className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
                            ></motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        <div className="flex flex-shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-gray-100 dark:bg-neutral-900">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: columns }).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`flex h-10 w-10 flex-shrink-0 rounded-[2px] ${
                                index % 2 === 0
                                    ? "bg-gray-50 dark:bg-neutral-950"
                                    : "bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:bg-neutral-950 dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                            }`}
                        />
                    );
                }),
            )}
        </div>
    );
}
