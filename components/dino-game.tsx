'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const playerRef = useRef({ x: 100, y: 150, width: 50, height: 50, velocityY: 0 });
  const pipesRef = useRef<Array<{ x: number; topHeight: number; gapY: number; gapHeight: number; passed: boolean }>>([]);
  const gameSpeedRef = useRef(2);
  const frameCountRef = useRef(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(0);
  const highScoreRef = useRef(0);
  const pipeWidthRef = useRef(60);
  const gapHeightRef = useRef(150);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('dinoGameHighScore');
    if (savedHighScore) {
      const hs = parseInt(savedHighScore);
      setHighScore(hs);
      highScoreRef.current = hs;
    }

    // Load profile image
    const img = new Image();
    img.src = '/profile.jpg';
    img.onload = () => {
      imageRef.current = img;
    };

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 400;
      // Reset player position when canvas resizes
      if (gameStateRef.current === 'idle') {
        playerRef.current.y = canvas.height / 2 - playerRef.current.height / 2;
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const currentState = gameStateRef.current;
      
      if (currentState === 'playing' || currentState === 'gameOver') {
        // Draw pipes
        ctx.fillStyle = '#228B22';
        pipesRef.current.forEach(pipe => {
          // Top pipe
          ctx.fillRect(pipe.x, 0, pipeWidthRef.current, pipe.topHeight);
          // Bottom pipe
          ctx.fillRect(pipe.x, pipe.gapY + pipe.gapHeight, pipeWidthRef.current, canvas.height - (pipe.gapY + pipe.gapHeight));
          
          // Pipe borders
          ctx.strokeStyle = '#006400';
          ctx.lineWidth = 3;
          ctx.strokeRect(pipe.x, 0, pipeWidthRef.current, pipe.topHeight);
          ctx.strokeRect(pipe.x, pipe.gapY + pipe.gapHeight, pipeWidthRef.current, canvas.height - (pipe.gapY + pipe.gapHeight));
        });

        // Draw player (profile image cutout)
        if (imageRef.current) {
          // Create a circular mask for the player
          ctx.save();
          ctx.beginPath();
          ctx.arc(
            playerRef.current.x + playerRef.current.width / 2,
            playerRef.current.y + playerRef.current.height / 2,
            playerRef.current.width / 2,
            0,
            Math.PI * 2
          );
          ctx.clip();
          
          // Draw the image
          ctx.drawImage(
            imageRef.current,
            playerRef.current.x,
            playerRef.current.y,
            playerRef.current.width,
            playerRef.current.height
          );
          ctx.restore();
        } else {
          // Fallback circle
          ctx.fillStyle = '#4CAF50';
          ctx.beginPath();
          ctx.arc(
            playerRef.current.x + playerRef.current.width / 2,
            playerRef.current.y + playerRef.current.height / 2,
            playerRef.current.width / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Draw score and high score
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'left';
        ctx.strokeText(`Score: ${scoreRef.current}`, 20, 35);
        ctx.fillText(`Score: ${scoreRef.current}`, 20, 35);
        if (highScoreRef.current > 0) {
          ctx.font = 'bold 18px Arial';
          ctx.strokeText(`High Score: ${highScoreRef.current}`, 20, 60);
          ctx.fillText(`High Score: ${highScoreRef.current}`, 20, 60);
        }
      }

      if (currentState === 'idle') {
        // Draw start message
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.strokeText('Press SPACE or Click to Start', canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillText('Press SPACE or Click to Start', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = 'bold 18px Arial';
        ctx.strokeText('Tap/Click to fly up!', canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('Tap/Click to fly up!', canvas.width / 2, canvas.height / 2 + 10);
        if (highScoreRef.current > 0) {
          ctx.font = 'bold 20px Arial';
          ctx.strokeText(`High Score: ${highScoreRef.current}`, canvas.width / 2, canvas.height / 2 + 40);
          ctx.fillText(`High Score: ${highScoreRef.current}`, canvas.width / 2, canvas.height / 2 + 40);
        }
      } else if (currentState === 'gameOver') {
        // Draw game over message
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.strokeText('Game Over!', canvas.width / 2, canvas.height / 2 - 30);
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = 'bold 20px Arial';
        ctx.strokeText(`Score: ${scoreRef.current}`, canvas.width / 2, canvas.height / 2 + 5);
        ctx.fillText(`Score: ${scoreRef.current}`, canvas.width / 2, canvas.height / 2 + 5);
        ctx.strokeText(`High Score: ${highScoreRef.current}`, canvas.width / 2, canvas.height / 2 + 35);
        ctx.fillText(`High Score: ${highScoreRef.current}`, canvas.width / 2, canvas.height / 2 + 35);
        ctx.font = 'bold 16px Arial';
        ctx.strokeText('Press SPACE or Click to Restart', canvas.width / 2, canvas.height / 2 + 65);
        ctx.fillText('Press SPACE or Click to Restart', canvas.width / 2, canvas.height / 2 + 65);
      }
    };

    let animationId: number;
    let lastFrameTime = 0;
    const gameLoop = (currentTime?: number) => {
      // Throttle to ~60fps
      if (currentTime && currentTime - lastFrameTime < 16) {
        animationId = requestAnimationFrame(gameLoop);
        gameLoopRef.current = animationId;
        return;
      }
      if (currentTime) {
        lastFrameTime = currentTime;
      }
      
      const currentState = gameStateRef.current;
      
      if (currentState === 'playing') {
        // Update player physics (gravity always applies)
        playerRef.current.velocityY += 0.3; // Gravity (reduced for slower fall)
        playerRef.current.y += playerRef.current.velocityY;

        // Top and bottom boundaries
        if (playerRef.current.y < 0) {
          playerRef.current.y = 0;
          playerRef.current.velocityY = 0;
        }
        if (playerRef.current.y + playerRef.current.height > canvas.height) {
          // Hit bottom - game over
          setGameState('gameOver');
          if (scoreRef.current > highScoreRef.current) {
            const newHighScore = scoreRef.current;
            setHighScore(newHighScore);
            highScoreRef.current = newHighScore;
            localStorage.setItem('dinoGameHighScore', newHighScore.toString());
          }
        }

        // Update pipes
        pipesRef.current = pipesRef.current.map(pipe => ({
          ...pipe,
          x: pipe.x - gameSpeedRef.current
        })).filter(pipe => pipe.x + pipeWidthRef.current > 0);

        // Spawn new pipes
        const lastPipe = pipesRef.current[pipesRef.current.length - 1];
        const minGap = 200; // Minimum distance between pipes
        
        if (pipesRef.current.length === 0 || (lastPipe && canvas.width - (lastPipe.x + pipeWidthRef.current) >= minGap)) {
          // Create a new pipe with a gap
          const gapHeight = gapHeightRef.current;
          const minGapY = 50;
          const maxGapY = canvas.height - gapHeight - 50;
          const gapY = minGapY + Math.random() * (maxGapY - minGapY);
          const topHeight = gapY;
          
          pipesRef.current.push({
            x: canvas.width,
            topHeight,
            gapY,
            gapHeight,
            passed: false
          });
        }

        // Progressive game speed increase
        gameSpeedRef.current = 2 + Math.floor(scoreRef.current / 100);

        // Collision detection with pipes
        const player = playerRef.current;
        const hitboxPadding = 0;
        for (const pipe of pipesRef.current) {
          // Check collision with top pipe
          if (
            player.x + hitboxPadding < pipe.x + pipeWidthRef.current &&
            player.x + player.width - hitboxPadding > pipe.x &&
            player.y + hitboxPadding < pipe.topHeight
          ) {
            setGameState('gameOver');
            if (scoreRef.current > highScoreRef.current) {
              const newHighScore = scoreRef.current;
              setHighScore(newHighScore);
              highScoreRef.current = newHighScore;
              localStorage.setItem('dinoGameHighScore', newHighScore.toString());
            }
            break;
          }
          
          // Check collision with bottom pipe
          if (
            player.x + hitboxPadding < pipe.x + pipeWidthRef.current &&
            player.x + player.width - hitboxPadding > pipe.x &&
            player.y + player.height - hitboxPadding > pipe.gapY + pipe.gapHeight
          ) {
            setGameState('gameOver');
            if (scoreRef.current > highScoreRef.current) {
              const newHighScore = scoreRef.current;
              setHighScore(newHighScore);
              highScoreRef.current = newHighScore;
              localStorage.setItem('dinoGameHighScore', newHighScore.toString());
            }
            break;
          }

          // Score when passing through gap
          if (!pipe.passed && player.x > pipe.x + pipeWidthRef.current) {
            pipe.passed = true;
            scoreRef.current++;
            setScore(scoreRef.current);
          }
        }
      }

      draw();
      animationId = requestAnimationFrame(gameLoop);
      gameLoopRef.current = animationId;
    };

    // Start the loop
    animationId = requestAnimationFrame(gameLoop);
    gameLoopRef.current = animationId;

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  const handleFlap = useCallback(() => {
    if (gameStateRef.current === 'idle' || gameStateRef.current === 'gameOver') {
      // Start or restart game
      setGameState('playing');
      setScore(0);
      scoreRef.current = 0;
      const canvas = canvasRef.current;
      if (canvas) {
        playerRef.current = {
          x: 100,
          y: canvas.height / 2 - 25,
          width: 50,
          height: 50,
          velocityY: 0
        };
      }
      pipesRef.current = [];
      gameSpeedRef.current = 2;
      frameCountRef.current = 0;
    } else if (gameStateRef.current === 'playing') {
      // Flap (go up)
      playerRef.current.velocityY = -6;
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlap();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleFlap]);

  return (
    <div className="dino-game-container">
      <canvas
        ref={canvasRef}
        className="dino-game-canvas"
        onClick={handleFlap}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}
