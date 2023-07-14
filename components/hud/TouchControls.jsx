import { FaArrowCircleUp, FaArrowCircleDown, FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

export default function TouchControls() {
    return (
        <div className='z-50 absolute bottom-0 left-0 w-[300px] aspect-square p-12'>
            <div className='w-full h-full grid grid-cols-3 grid-rows-3'>
                <UpButton />
                <DownButton />
                <LeftButton />
                <RightButton />
            </div>
        </div>
    );
}

const UpButton = () => {
    const handleClick = () => {
        // Create a new 'KeyboardEvent' event
        let keyboardEvent = new KeyboardEvent('keydown', {
          key: 'ArrowUp', // Specify the key you want to simulate
          code: 'ArrowUp', // This should match the 'key'
          charCode: 38, // ASCII code for 'Up'
          keyCode: 38, // Legacy property, also ASCII code for 'Up'
          which: 0, // Yet another legacy property, also ASCII code for 'Up'
        });
    
        // Dispatch the event
        document.dispatchEvent(keyboardEvent);
      };
    return (
        <button onClick={handleClick} className="w-full h-full bg-gray-300/20 rounded-lg col-start-2 row-start-1 flex items-center justify-center">
            <FaArrowCircleUp size={30} />
        </button>
    );
}

const DownButton = () => {
    const handleClick = () => {
        // Create a new 'KeyboardEvent' event
        let keyboardEvent = new KeyboardEvent('keydown', {
          key: 'ArrowDown', 
          code: 'ArrowDown', 
          charCode: 40, 
          keyCode: 40, 
          which: 0, 
        });
    
        // Dispatch the event
        document.dispatchEvent(keyboardEvent);
      };
    return (
        <button onClick={handleClick} className="w-full h-full bg-gray-300/20 rounded-lg col-start-2 row-start-3 flex items-center justify-center">
            <FaArrowCircleDown size={30} />
        </button>
    );
}

const LeftButton = () => {
    const handleClick = () => {
        // Create a new 'KeyboardEvent' event
        let keyboardEvent = new KeyboardEvent('keydown', {
            key: 'ArrowLeft', 
            code: 'ArrowLeft', 
            charCode: 37, 
            keyCode: 37, 
            which: 0, 
          });
    
        // Dispatch the event
        document.dispatchEvent(keyboardEvent);
      };
    return (
        <button onClick={handleClick} className="w-full h-full bg-gray-300/20 rounded-lg col-start-1 row-start-2 flex items-center justify-center">
            <FaArrowCircleLeft size={30} />
        </button>
    );
}

const RightButton = () => {
    const handleClick = () => {
        // Create a new 'KeyboardEvent' event
        let keyboardEvent = new KeyboardEvent('keydown', {
            key: 'ArrowRight', 
            code: 'ArrowRight', 
            charCode: 39, 
            keyCode: 39, 
            which: 0, 
          });
    
        // Dispatch the event
        document.dispatchEvent(keyboardEvent);
      };
    return (
        <button onClick={handleClick} className="w-full h-full bg-gray-300/20 rounded-lg col-start-3 row-start-2 flex items-center justify-center">
            <FaArrowCircleRight size={30} />
        </button>
    );
}