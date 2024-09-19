import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

function hodina1() {
  useEffect(() => {
    const canvas = document.getElementById(
      "drawingCanvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    let drawing = false;

    const startDrawing = () => {
      drawing = true;
      ctx?.beginPath();
    };

    const draw = (event: MouseEvent) => {
      if (!drawing) return;
      ctx?.lineTo(event.offsetX, event.offsetY);
      ctx?.stroke();
    };

    const stopDrawing = () => {
      drawing = false;
      ctx?.closePath();
    };

    const colorPicker = document.getElementById(
      "colorPicker"
    ) as HTMLInputElement;
    const changeColor = () => {
      if (ctx) {
        ctx.strokeStyle = colorPicker.value;
      }
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
    colorPicker.addEventListener("input", changeColor);

    // Initialize color
    changeColor();

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
      colorPicker.removeEventListener("input", changeColor);
    };
  }, []);

  return (
    <>
      <Container maxW="container.lg" centerContent>
        <Heading as="h1" size="2xl">
          První hodina
        </Heading>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          width="100%"
          height="auto"
          position="relative"
        >
          <input type="color" id="colorPicker" defaultValue="#000000" />

          <canvas
            id="drawingCanvas"
            width="500"
            height="400"
            style={{ border: "1px solid black" }}
          ></canvas>
        </Box>
      </Container>
    </>
  );
}

export default hodina1;
