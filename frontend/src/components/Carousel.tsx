import { useState, useEffect } from 'react';
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

const Carousel = ({ slides }: { slides: { heading: string, paragraph: string; }[]; }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 7000);
        return () => clearInterval(intervalId);
    }, [slides.length]);

    return (
        <Box sx={{ width: "100%", overflow: 'hidden' }}>
            <Box style={{ transform: `translateX(-${currentIndex * 100}%)`, display: "flex", transition: "transform 0.5s ease-in-out" }}>
                {slides.map((slide, index) => (
                    <Box key={index} sx={{ minWidth: "100%", boxSizing: "border-box", p: "20px", textAlign: "center" }}>
                        <Box width="100%" maxWidth="sm" sx={{ margin: 'auto', mb: 2 }}>
                            <Typography level="h1">{slide.heading}</Typography>
                            <Typography level="body-lg">{slide.paragraph}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Carousel;