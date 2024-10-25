import { Box, Button, Container, HStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function Hodina9() {
  const [position, setPosition] = useState({ x: 140, y: 0 });
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    let animationFrameId: number;

    const moveBox = () => {
      setPosition((prevPosition) => {
        let { x, y } = prevPosition;
        const boxSize = 20;
        const containerSize = 300;

        if (x === 0 && y < containerSize - boxSize) {
          y += 1;
        } else if (
          y === containerSize - boxSize &&
          x < containerSize - boxSize
        ) {
          x += 1;
        } else if (x === containerSize - boxSize && y > 0) {
          y -= 1;
        } else if (y === 0 && x > 0) {
          x -= 1;
        }

        return { x, y };
      });

      animationFrameId = requestAnimationFrame(moveBox);
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(moveBox);
    }

    return () => cancelAnimationFrame(animationFrameId as number);
  }, [isRunning]);

  return (
    <Container maxW={"container.lg"} centerContent py={10}>
      <Box
        height="300px"
        width="300px"
        border="1px solid black"
        position="relative" // Ensure the container is relative
        overflow="hidden" // Prevent the box from moving outside
      >
        <Box
          height="20px"
          width="20px"
          bg="red"
          position="absolute" // Absolute positioning for accurate movement
          top={`${position.y}px`}
          left={`${position.x}px`}
          transition="top 0.01s linear, left 0.01s linear" // Smooth movement
        />
      </Box>
      <HStack spacing={4} mt={4}>
        <Button onClick={handleStart} isDisabled={isRunning}>
          Start
        </Button>
        <Button onClick={handleStop} isDisabled={!isRunning}>
          Stop
        </Button>
      </HStack>
    </Container>
  );
}

export default Hodina9;
