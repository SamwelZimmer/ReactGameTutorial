"use client";

import { FaArrowCircleUp, FaArrowCircleDown, FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { DIRECTION_DOWN, DIRECTION_UP, DIRECTION_LEFT, DIRECTION_RIGHT } from "../../helpers/consts";

import { TouchDirectionControls } from "../../classes/TouchDirectionControls";


export default function TouchControls() {
    const controls = new TouchDirectionControls();

    useEffect(() => {

        return () => {
            controls.unbind();
        }
    }, []);
      
    return (
        <div className='z-50 absolute bottom-0 left-0 w-[300px] aspect-square p-12'>
            <div className='w-full aspect-square grid grid-cols-3 grid-rows-3'>
                <button onTouchStart={() => controls.touchStartHandler(DIRECTION_RIGHT)} onTouchEnd={() => controls.touchEndHandler(DIRECTION_RIGHT)} className="w-full h-full bg-gray-300/20 rounded-lg col-start-3 row-start-2 flex items-center justify-center">
                    <FaArrowCircleRight size={30} />
                </button>
                <button onTouchStart={() => controls.touchStartHandler(DIRECTION_LEFT)} onTouchEnd={() => controls.touchEndHandler(DIRECTION_LEFT)} className="w-full h-full bg-gray-300/20 rounded-lg col-start-1 row-start-2 flex items-center justify-center">
                    <FaArrowCircleLeft size={30} />
                </button>
                <button onTouchStart={() => controls.touchStartHandler(DIRECTION_DOWN)} onTouchEnd={() => controls.touchEndHandler(DIRECTION_DOWN)} className="w-full h-full bg-gray-300/20 rounded-lg col-start-2 row-start-3 flex items-center justify-center">
                    <FaArrowCircleDown size={30} />
                </button>
                <button onTouchStart={() => controls.touchStartHandler(DIRECTION_UP)} onTouchEnd={() => controls.touchEndHandler(DIRECTION_UP)} className="w-full h-full bg-gray-300/20 rounded-lg col-start-2 row-start-1 flex items-center justify-center">
                    <FaArrowCircleUp size={30} />
                </button>
            </div>
        </div>
    );
};