/**
 * Type declarations for gsap-trial modules.
 * gsap-trial is the trial/club version of GSAP plugins that doesn't ship
 * its own TypeScript declarations, so we declare the modules here.
 */
declare module "gsap-trial/SplitText" {
    export class SplitText {
        constructor(target: any, vars?: any);
        chars: any[];
        words: any[];
        lines: any[];
        revert(): void;
        [key: string]: any;
    }
}

declare module "gsap-trial/ScrollSmoother" {
    export class ScrollSmoother {
        static create(vars?: any): ScrollSmoother;
        static refresh(safe?: boolean): void;
        paused(value?: boolean): boolean | ScrollSmoother;
        scrollTo(target: any, smooth?: boolean, position?: string): void;
        scrollTop(position?: number): number;
        [key: string]: any;
    }
}
