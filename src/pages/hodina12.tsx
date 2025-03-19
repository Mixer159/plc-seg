import React, { useEffect, useRef } from "react";

const Hodina12: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef({ x: 50, y: 50, radius: 15 });
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const canvasWidth = 800;
  const canvasHeight = 600;

  // Config ref for colors and wall dimensions
  const configRef = useRef({
    backgroundTopColor: '#f0f8ff',
    backgroundBottomColor: '#87cefa',
    wallWidth: 400,
    wallHeight: 400,
    wallColorStart: '#8B0000',
    wallColorEnd: '#FF6347'
  });

  // Helper function to generate a random hex color
  const getRandomColor = (): string => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

  // Function to randomize configuration
  const randomizeConfig = (): void => {
    configRef.current = {
      backgroundTopColor: getRandomColor(),
      backgroundBottomColor: getRandomColor(),
      wallWidth: Math.floor(Math.random() * (400 - 100 + 1)) + 100,
      wallHeight: Math.floor(Math.random() * (400 - 100 + 1)) + 100,
      wallColorStart: getRandomColor(),
      wallColorEnd: getRandomColor()
    };
  };

  // Function to detect collision between a circle and a rectangle
  const circleRectCollision = (
    cx: number,
    cy: number,
    radius: number,
    rx: number,
    ry: number,
    rw: number,
    rh: number
  ): boolean => {
    const closestX = Math.max(rx, Math.min(cx, rx + rw));
    const closestY = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - closestX;
    const dy = cy - closestY;
    return dx * dx + dy * dy < radius * radius;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const speed = 3;

    const update = () => {
      // Use current config
      const { backgroundTopColor, backgroundBottomColor, wallWidth, wallHeight, wallColorStart, wallColorEnd } = configRef.current;

      // Fill the background with a gradient from config
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      bgGradient.addColorStop(0, backgroundTopColor);
      bgGradient.addColorStop(1, backgroundBottomColor);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Define wall based on current config (centered)
      const wall = {
        x: canvasWidth / 2 - wallWidth / 2,
        y: canvasHeight / 2 - wallHeight / 2,
        width: wallWidth,
        height: wallHeight
      };

      const ball = ballRef.current;
      const prevX = ball.x;
      const prevY = ball.y;

      // Determine movement based on WASD keys
      let dx = 0, dy = 0;
      if (keysPressed.current["w"]) dy -= speed;
      if (keysPressed.current["s"]) dy += speed;
      if (keysPressed.current["a"]) dx -= speed;
      if (keysPressed.current["d"]) dx += speed;

      // Update X axis and check collision
      ball.x += dx;
      if (circleRectCollision(ball.x, ball.y, ball.radius, wall.x, wall.y, wall.width, wall.height)) {
        ball.x = prevX; // Revert X move on collision
      }

      // Update Y axis and check collision
      ball.y += dy;
      if (circleRectCollision(ball.x, ball.y, ball.radius, wall.x, wall.y, wall.width, wall.height)) {
        ball.y = prevY; // Revert Y move on collision
      }

      // Draw the wall with gradient and shadow from config
      const wallGradient = ctx.createLinearGradient(wall.x, wall.y, wall.x + wall.width, wall.y + wall.height);
      wallGradient.addColorStop(0, wallColorStart);
      wallGradient.addColorStop(1, wallColorEnd);
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = wallGradient;
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
      ctx.restore();

      // Draw the ball with shadow
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#00008B";
      ctx.fill();
      ctx.closePath();
      ctx.restore();

      // Draw instruction text
      ctx.font = "20px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText("Use WASD to move", 10, canvasHeight - 20);

      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: '1px solid #000' }}
      />
      <button onClick={randomizeConfig} style={{ marginTop: '10px' }}>Randomize</button>
    </div>
  );
};

export default Hodina12;
