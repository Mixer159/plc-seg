import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { random } from "lodash";

type Ball = {
  x: number;
  y: number;
  velocity: number;
  trajectory: number;
};

function hodina8() {
  const [balls, setBalls] = useState<Ball[]>([]);

  const getRandomVelocity = () => {
    return random(1, 10);
  };

  const getRandomTrajectory = () => {
    return random(0, 360);
  };

  const spawnBall = () => {
    const containerSize = 200; // Size of the container box
    setBalls([
      ...balls,
      {
        x: random(0, containerSize),
        y: random(0, containerSize),
        velocity: getRandomVelocity(),
        trajectory: getRandomTrajectory(),
      },
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBalls((prevBalls) =>
        prevBalls.map((ball) => ({
          ...ball,
          x: ball.x + ball.velocity * Math.cos(ball.trajectory),
          y: ball.y + ball.velocity * Math.sin(ball.trajectory),
        }))
      );
    }, 1000 / 60); // 60 frames per second

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    spawnBall();
  });

  return (
    <Container maxW={"container.lg"} centerContent>
      <Heading>Hodina 8</Heading>
      <VStack>
        <Box position="relative" height={"200px"} width={"200px"}>
          {balls.map((ball, index) => (
            <Box
              key={index}
              position="absolute"
              top={`${ball.y}px`}
              left={`${ball.x}px`}
              width="10px"
              height="10px"
              backgroundColor="red"
              borderRadius="50%"
            />
          ))}
        </Box>
        <HStack>
          <Button onClick={spawnBall}>Spawn Ball</Button>
        </HStack>
      </VStack>
    </Container>
  );
}

export default hodina8;
