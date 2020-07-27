import { Placement } from 'tippy.js';

/**
 * The options to personalize the popover via an interface
 * @see popover-options.ts
 *
 */
export interface IPopoverOptions {
    placement?: Placement;
    hideOnClick?: boolean;
    interactive?: boolean;
    trigger?: string;
    customClass?: string;
    theme?: string;
    appendTo?: 'parent' | Element | (() => Element);
}
