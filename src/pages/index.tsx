import { Highlight } from "@components/ui/hero-highlight";
import React from "react";
import { Button } from "@components/ui/moving-border-button";

import Icosa from "@public/Icosa.svg";

const Index: React.FC = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4 text-5xl font-bold">
            <div className="flex items-center justify-center gap-4">
                <div className="fixed z-10 w-60 animate-bounce md:left-20 md:top-20 lg:left-40 lg:top-40">
                    <img
                        src={Icosa}
                        alt="Icosahedron"
                        className="drop-shadow-[0_0_45px_rgba(0,123,255,0.75)] saturate-200"
                    />
                </div>
                <span className="bg-gradient-to-r from-yellow-300 to-red-500 bg-clip-text text-5xl text-transparent">
                    Welcome to
                </span>
                <Highlight className="rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-4 text-white shadow-lg">
                    Image LSB Encoder
                </Highlight>
            </div>
            <p className="mt-6 rounded-lg bg-gray-800 bg-opacity-60 p-4 text-xl text-white shadow-lg transition-all duration-300 hover:bg-opacity-80">
                Securely encode your data into images with our advanced LSB
                encoding technology.
            </p>
            <Button
                borderRadius="1.5rem"
                as="a"
                containerClassName="relative inline-flex items-center justify-center overflow-hidden text-xl h-16 w-48 p-2 bg-transparent"
                duration={1500}
                className="relative flex h-full w-full transform items-center justify-center rounded-lg text-lg font-bold text-white shadow-lg transition-transform hover:scale-105"
                href="/create"
            >
                Getting Started
            </Button>
        </div>
    );
};

export default Index;
