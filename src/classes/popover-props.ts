import { Animation } from './animation';
import { PopoverPlacement } from './popover-placement';

/**
 * Input props to instantiate the tippy.js popover
 *
 */
export class PopoverProps {

    content?: HTMLDivElement;
    constructor(public placement: PopoverPlacement = PopoverPlacement.BOTTOM,
                public hideOnClick  = true,
                public interactive  = true,
                public trigger = 'click',
                public appendTo: 'parent' | Element | (() => Element) = () => document.body,
                public theme?: string,
                public delay?: number | [number | null, number | null],
                public animation?: Animation,
                ) {
    }
}
