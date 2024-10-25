import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Img,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";

function hodina7() {
  const [position, setPosition] = useState({ x: 0 });
  const [isRunning, setIsRunning] = useState(false);

  const handleStop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setPosition((prevPosition) => {
        const newX = prevPosition.x + 2;
        if (newX >= 460) {
          return { x: 0 }; // Reset to start instead of stopping
        }
        return { x: newX };
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning]);

  // Calculate the position of the second car
  const secondCarPosition = position.x > 360 ? position.x - 460 : null;

  return (
    <>
      <Container maxW={"container.lg"} centerContent>
        <Heading>Hodina 7</Heading>
        <VStack width={"100%"}>
          <Box
            minW={"450px"}
            maxW={"450px"}
            h={"100px"}
            position="relative"
            overflow={"hidden"}
          >
            <Img
              position="absolute"
              left={`${position.x}px`}
              src={"/car.png"}
              maxH={"40px"}
              height={"100%"}
            />
            {secondCarPosition !== null && (
              <Img
                position="absolute"
                left={`${secondCarPosition}px`}
                src={"/car.png"}
                maxH={"40px"}
                height={"100%"}
              />
            )}
          </Box>
          <HStack>
            <Button onClick={handleStart} isDisabled={isRunning}>
              Rozjeď se
            </Button>
            <Button onClick={handleStop} isDisabled={!isRunning}>
              Zastav se
            </Button>
          </HStack>
        </VStack>
      </Container>
    </>
  );
}

export default hodina7;
