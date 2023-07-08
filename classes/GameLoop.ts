type OnStepCallback = () => void;

export class GameLoop {
    private onStep: OnStepCallback;
    private rafCallback: number | null;
  
    constructor(onStep: OnStepCallback) {
        this.onStep = onStep;
        this.rafCallback = null;
        this.start();
    }

    start(): void {
        let previousMs: number | undefined;
        const step: number = 1 / 60;

        const tick = (timestampMs: number): void => {
            if (previousMs === undefined) {
                previousMs = timestampMs;
            }
            let delta = (timestampMs - previousMs) / 1000;
            while (delta >= step) {
                this.onStep();
                delta -= step;
            }
            previousMs = timestampMs - delta * 1000;
            //Recapture the callback to be able to shut it off
            this.rafCallback = requestAnimationFrame(tick);
        };
    
        // Initial kickoff
        this.rafCallback = requestAnimationFrame(tick);
    }

    stop(): void {
        if (this.rafCallback !== null) {
            cancelAnimationFrame(this.rafCallback);
        }
    }
}
