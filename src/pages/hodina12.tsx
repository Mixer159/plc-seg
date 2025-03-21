import React, { useEffect, useRef, useState } from "react";

const Hodina12: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef({ x: 50, y: 50, radius: 15 });
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  // Add collision flag to prevent continuous color changes
  const collisionRef = useRef(false);
  // Add timer ref for auto-randomization
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use a state to track client-side hydration
  const [isClient, setIsClient] = useState(false);

  // Default initial values (used during server-side rendering)
  const defaultUiStyle = {
    containerBorderRadius: '10px',
    canvasBorderRadius: '8px',
    buttonColor: '#4CAF50',
    buttonHoverColor: '#45a049',
    buttonBorderRadius: '5px',
    pageBgGradient: 'linear-gradient(180deg, #2c3e50, #1a1a2e)',
    boxShadowColor: '#000000',
    buttonText: 'Randomize Everything'
  };

  // Random UI styles set on client-side only
  const [uiStyle, setUiStyle] = useState(defaultUiStyle);

  const canvasWidth = 800;
  const canvasHeight = 600;

  // Config ref for colors and wall dimensions
  const configRef = useRef({
    backgroundTopColor: '#f0f8ff',
    backgroundBottomColor: '#87cefa',
    wallWidth: 400,
    wallHeight: 400,
    wallColorStart: '#8B0000',
    wallColorEnd: '#FF6347',
    ballColor: '#00008B',
    ballBorderColor: '#000088',
    ballGlowColor: '#4040ff',
    ballGlowSize: 10
  });

  // Helper function to generate a random hex color
  function getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  // Generate random UI styles for client-side only
  useEffect(() => {
    setIsClient(true);
    
    // Now that we're on the client, we can set random styles
    setUiStyle({
      containerBorderRadius: `${Math.floor(Math.random() * 16) + 5}px`,
      canvasBorderRadius: `${Math.floor(Math.random() * 20) + 5}px`,
      buttonColor: getRandomColor(),
      buttonHoverColor: getRandomColor(),
      buttonBorderRadius: `${Math.floor(Math.random() * 20) + 5}px`,
      pageBgGradient: `linear-gradient(${Math.floor(Math.random() * 360)}deg, ${getRandomColor()}, ${getRandomColor()})`,
      boxShadowColor: getRandomColor(),
      buttonText: ['Randomize Everything', 'Change It All', 'New Look', 'Shuffle', 'Transform Scene'][Math.floor(Math.random() * 5)]
    });
  }, []);

  useEffect(() => {
    // Only set random ball effects after initial render on client
    if (isClient) {
      configRef.current = {
        ...configRef.current,
        ballBorderColor: getRandomColor(),
        ballGlowColor: getRandomColor(),
        ballGlowSize: Math.floor(Math.random() * 15) + 5
      };
    }
  }, [isClient]);

  // Function to randomize configuration
  const randomizeConfig = (): void => {
    configRef.current = {
      backgroundTopColor: getRandomColor(),
      backgroundBottomColor: getRandomColor(),
      wallWidth: Math.floor(Math.random() * (400 - 100 + 1)) + 100,
      wallHeight: Math.floor(Math.random() * (400 - 100 + 1)) + 100,
      wallColorStart: getRandomColor(),
      wallColorEnd: getRandomColor(),
      ballColor: getRandomColor(),
      ballBorderColor: getRandomColor(),
      ballGlowColor: getRandomColor(),
      ballGlowSize: Math.floor(Math.random() * 15) + 5
    };
  };

  // Change only wall colors to random colors
  const randomizeWallColors = (): void => {
    configRef.current = {
      ...configRef.current,
      wallColorStart: getRandomColor(),
      wallColorEnd: getRandomColor()
    };
  };

  // Function to gradually transform only colors, not wall size
  const partialRandomize = (): void => {
    // Choose one aspect to change randomly, but not wall size
    const choice = Math.floor(Math.random() * 3);
    
    switch(choice) {
      case 0:
        // Change background colors
        configRef.current = {
          ...configRef.current,
          backgroundTopColor: getRandomColor(),
          backgroundBottomColor: getRandomColor()
        };
        break;
      case 1:
        // Change wall colors
        randomizeWallColors();
        break;
      case 2:
        // Change ball color
        configRef.current = {
          ...configRef.current,
          ballColor: getRandomColor(),
          ballGlowColor: getRandomColor()
        };
        break;
    }
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
    // Only start auto-randomization after client-side hydration
    if (!isClient) return;
    
    // Set up auto-randomization timer
    timerRef.current = setInterval(() => {
      partialRandomize();
    }, 3000); // Change something every 3 seconds

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return; // Skip canvas rendering during SSR
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const speed = 3;

    const update = () => {
      // Use current config
      const { 
        backgroundTopColor, backgroundBottomColor, wallWidth, wallHeight, 
        wallColorStart, wallColorEnd, ballColor, ballBorderColor, ballGlowColor, ballGlowSize 
      } = configRef.current;

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

      // Reset collision flag if no keys are pressed (ball is not moving)
      if (dx === 0 && dy === 0) {
        collisionRef.current = false;
      }

      // Track if any collision happened in this frame
      let collisionHappened = false;

      // Update X axis and check collision
      ball.x += dx;
      if (circleRectCollision(ball.x, ball.y, ball.radius, wall.x, wall.y, wall.width, wall.height)) {
        ball.x = prevX; // Revert X move on collision
        collisionHappened = true;
      }

      // Update Y axis and check collision
      ball.y += dy;
      if (circleRectCollision(ball.x, ball.y, ball.radius, wall.x, wall.y, wall.width, wall.height)) {
        ball.y = prevY; // Revert Y move on collision
        collisionHappened = true;
      }

      // If collision happened and we weren't already in a collision state, change wall colors
      if (collisionHappened && !collisionRef.current) {
        randomizeWallColors();
        collisionRef.current = true;
      } else if (!collisionHappened) {
        // Reset collision flag when not colliding
        collisionRef.current = false;
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

      // Draw the ball with enhanced visuals
      ctx.save();
      
      // Ball glow effect
      ctx.shadowColor = ballGlowColor;
      ctx.shadowBlur = ballGlowSize;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Ball fill
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ballColor;
      ctx.fill();
      
      // Ball border
      ctx.lineWidth = 2;
      ctx.strokeStyle = ballBorderColor;
      ctx.stroke();
      
      ctx.closePath();
      ctx.restore();

      // Draw instruction text
      ctx.font = "20px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText("Use WASD to move", 10, canvasHeight - 20);
      ctx.fillText("Touch the wall to change its color", 10, canvasHeight - 50);
      ctx.fillText("Colors change automatically every 3 seconds", 10, canvasHeight - 80);

      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isClient]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: uiStyle.pageBgGradient,
      padding: '20px'
    }}>
      <div style={{ 
        boxShadow: `0 10px 30px ${uiStyle.boxShadowColor}80`,
        borderRadius: uiStyle.containerBorderRadius,
        overflow: 'hidden',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)'
      }}>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          style={{ 
            display: 'block',
            borderRadius: uiStyle.canvasBorderRadius
          }}
        />
      </div>
      <button 
        onClick={randomizeConfig} 
        style={{ 
          marginTop: '20px',
          padding: '12px 24px',
          borderRadius: uiStyle.buttonBorderRadius,
          backgroundColor: uiStyle.buttonColor,
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          if (!isClient) return; // Prevent hover effects during SSR
          e.currentTarget.style.backgroundColor = uiStyle.buttonHoverColor;
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          if (!isClient) return; // Prevent hover effects during SSR
          e.currentTarget.style.backgroundColor = uiStyle.buttonColor;
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {uiStyle.buttonText}
      </button>
    </div>
  );
};

export default Hodina12;
