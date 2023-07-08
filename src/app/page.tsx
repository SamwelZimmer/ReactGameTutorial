"use client";

import { useEffect } from 'react';
import { SPRITE_SHEET_SRC } from '../../helpers/consts';
import RenderLevel from '../../components/level-layout/RenderLevel';
import { useRecoilState } from 'recoil';
import { spriteSheetImageAtom } from '../../atoms/spriteSheetImageAtom';

export default function Home() {

  const [spriteSheetImage, setSpriteSheetImage] = useRecoilState<HTMLImageElement | null>(spriteSheetImageAtom);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, [spriteSheetImage]);

  if (!spriteSheetImage) {
    return null;
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden m-0">
      <RenderLevel />
    </main>
  )
}
