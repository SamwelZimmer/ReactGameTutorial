"use client";

import React, { useRef, useEffect } from "react";

import { CELL_SIZE } from "../../helpers/consts";
import { useRecoilValue } from "recoil";
import { spriteSheetImageAtom } from "../../atoms/spriteSheetImageAtom";

interface SpriteProps {
  frameCoord: string;
  size?: number;
};

function Sprite({ frameCoord, size=16 }: SpriteProps) {

  const spriteSheetImage = useRecoilValue(spriteSheetImageAtom);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // check if the canvasRef is not null
        if (canvasRef.current) { 
          const canvasEl = canvasRef.current;
          const ctx = canvasEl.getContext("2d");
      
          // clear anything in the canvas tag
          if (ctx) {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
          }
          
          // convert sprite sheet coordinates to numbers --> frameCoord: "1x0" --> the position on sprite sheet
          const tileSheetX = Number(frameCoord.split("x")[0]);
          const tileSheetY = Number(frameCoord.split("x")[1]);

          // draw graphic to the canvas tag
          if (spriteSheetImage) {
            ctx?.drawImage(
              spriteSheetImage, // image to pull from
              tileSheetX * CELL_SIZE, // left X corner of frame
              tileSheetY * CELL_SIZE, // top Y corner of frame
              size, // how much to crop from the sprite sheet (X)
              size, // how much to crop from the sprite sheet (Y)
              0, // where to place this on canvas tag X (0)
              0, // where to place this on canvas tag Y (0)
              size, // how large to scale it (X)
              size // how large to scale it (Y)
            );
          }
        }
      }, [spriteSheetImage, frameCoord, size]);
      

    return <canvas width={size} height={size} ref={canvasRef} />
}

const MemoizedSprite = React.memo(Sprite);

export default MemoizedSprite;