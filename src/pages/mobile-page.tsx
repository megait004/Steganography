import React from "react";
import { Highlight } from "@components/ui/hero-highlight";
import { Button } from "@components/ui/moving-border-button";

const MobilePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <p className="mb-4 text-lg font-semibold">
                <Highlight className="bg-gradient-to-r from-indigo-500 to-purple-600 text-3xl bg-clip-text text-transparent">
                    It looks like you're using a mobile device.
                </Highlight>
            </p>
            <p className="text-base bg-gradient-to-r from-gray-100 to-gray-600 bg-clip-text text-center text-gray-200">
                The desktop version of this site provides the best experience.
                <Highlight className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                    Please visit us on a larger screen.
                </Highlight>
            </p>
            <Button
                borderRadius="1.5rem"
                as="a"
                containerClassName="relative inline-flex items-center justify-center overflow-hidden text-xl h-16 w-48 p-2 mt-4"
                borderClassName="bg-gradient-to-r from-yellow-400 to-red-500"
                duration={1500}
                href="/about-me"
            >
                Get in touch
            </Button>
        </div>
    );
};

export default MobilePage;
