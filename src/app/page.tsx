"use client";

import { useEffect, useState } from 'react';
import { SPRITE_SHEET_SRC } from '../../helpers/consts';
import RenderLevel from '../../components/level-layout/RenderLevel';
import { useRecoilState } from 'recoil';
import { spriteSheetImageAtom } from '../../atoms/spriteSheetImageAtom';
import soundsManager from "../../classes/Sounds";
import TouchControls from "../../components/hud/TouchControls";

soundsManager.init();

export default function Home() {

  const [spriteSheetImage, setSpriteSheetImage] = useRecoilState<HTMLImageElement | null>(spriteSheetImageAtom);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, [spriteSheetImage]);

  useEffect(() => {
    window.addEventListener('touchstart', function onFirstTouch() {
      setIsTouchDevice(true);

      // we only need to know once that a human touched the screen, so we can stop listening now
      window.removeEventListener('touchstart', onFirstTouch, false);
    }, false);
  }, []); 

  if (!spriteSheetImage) {
    return null;
  };

  console.log(isTouchDevice);

  return (
    <main className="relative w-screen h-screen overflow-hidden m-0">
      <RenderLevel />

      {isTouchDevice && 
        <TouchControls />
      }
    </main>
  )
}
