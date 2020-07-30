import { Placement } from 'tippy.js';

/**
 * Input props to instantiate the tippy.js popover
 *
 */
export class PopoverProps {

    content?: HTMLDivElement;

    constructor(public placement: Placement = 'bottom',
                public hideOnClick  = true,
                public interactive  = true,
                public trigger = 'click',
                public appendTo: 'parent' | Element | (() => Element) = () => document.body,
                public theme?: string,
                ) {
    }
}
