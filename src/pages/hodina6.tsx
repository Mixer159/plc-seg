import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";

function hodina6() {
  const [position, setPosition] = useState({
    x: 200,
    y: 200,
  });
  const [rotation, setRotation] = useState(0);
  const [hue, setHue] = useState(0);

  const randomizeColor = useCallback(() => {
    setHue(Math.floor(Math.random() * 360));
  }, []);

  // New useEffect hook to set initial random color
  useEffect(() => {
    randomizeColor();
  }, [randomizeColor]);

  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    setPosition((prev) => {
      const step = 10;
      switch (direction) {
        case "up":
          setRotation(-75);
          return { ...prev, y: prev.y - step };
        case "down":
          setRotation(75);
          return { ...prev, y: prev.y + step };
        case "left":
          setRotation(0);
          return { ...prev, x: prev.x - step };
        case "right":
          setRotation(0);
          return { ...prev, x: prev.x + step };
        default:
          return prev;
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          handleMove("up");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        case "ArrowLeft":
          handleMove("left");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <Container maxW="container.md" centerContent>
        <Box position="relative" width="100%" height="400px">
          <Heading>Hodina 6</Heading>
          <Text>Jezdící autíčko ovládá se šipkama a mění barvy!</Text>

          <Image
            maxH={"100px"}
            src={"/car.png"}
            position={"absolute"}
            top={`${position.y}px`}
            left={`${position.x}px`}
            transform={`rotate(${rotation}deg)`}
            filter={`hue-rotate(${hue}deg)`}
          />
          <VStack>
            <Button onClick={() => handleMove("up")}>{"^"}</Button>
            <HStack>
              <Button onClick={() => handleMove("left")}>{"<"}</Button>
              <Button onClick={() => handleMove("down")}>{"v"}</Button>
              <Button onClick={() => handleMove("right")}>{">"}</Button>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </>
  );
}

export default hodina6;
