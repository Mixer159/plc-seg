"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Image as ChakraImage,
  Text,
} from "@chakra-ui/react";

export default function HomePage() {
  // Track which image is currently selected in the radio
  const [activeImage, setActiveImage] = useState("image1");

  // Positions for each image, stored as { x, y }
  const [pos1, setPos1] = useState({ x: 0, y: 0 });
  const [pos2, setPos2] = useState({ x: 100, y: 100 });

  // Helper to clamp newPosition so images don’t go outside the container
  const clampPosition = (x: number, y: number) => {
    // Assume each image is ~100×100 & container is 100vw×100vh
    // Adjust clamp as needed if your images are other sizes
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    };
  };

  // Move the currently active image
  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    if (activeImage === "image1") {
      setPos1((prev) => {
        let { x, y } = prev;
        switch (direction) {
          case "up":
            y -= 10;
            break;
          case "down":
            y += 10;
            break;
          case "left":
            x -= 10;
            break;
          case "right":
            x += 10;
            break;
        }
        return clampPosition(x, y);
      });
    } else {
      setPos2((prev) => {
        let { x, y } = prev;
        switch (direction) {
          case "up":
            y -= 10;
            break;
          case "down":
            y += 10;
            break;
          case "left":
            x -= 10;
            break;
          case "right":
            x += 10;
            break;
        }
        return clampPosition(x, y);
      });
    }
  };

  return (
    <Box p={2}>
      <Text fontSize="xl" mb={4}>
        Move the selected image with the arrows below
      </Text>

      {/* Radio Group to pick which image moves */}
      <RadioGroup onChange={setActiveImage} value={activeImage} mb={5}>
        <Stack direction="row" spacing={5}>
          <Radio value="image1">Image 1</Radio>
          <Radio value="image2">Image 2</Radio>
        </Stack>
      </RadioGroup>

      {/* Full-screen container; position: "relative" allows absolute positioning. */}
      <Box
        position="relative"
        w="90vw"
        h="80vh"
        border="1px solid lightgray"
        overflow="hidden"
      >
        <ChakraImage
          src="/car.png"
          alt="Image 1"
          position="absolute"
          width="100px"
          height="100px"
          left={pos1.x}
          top={pos1.y}
        />
        <ChakraImage
          src="/image.png"
          alt="Image 2"
          position="absolute"
          width="100px"
          height="100px"
          left={pos2.x}
          top={pos2.y}
        />
      </Box>

      {/* Arrows to move the currently active image */}
      <Stack direction="row" spacing={2} mt={4}>
        <Button onClick={() => handleMove("up")}>Up</Button>
        <Button onClick={() => handleMove("left")}>Left</Button>
        <Button onClick={() => handleMove("right")}>Right</Button>
        <Button onClick={() => handleMove("down")}>Down</Button>
      </Stack>
    </Box>
  );
}
