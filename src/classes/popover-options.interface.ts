import { Placement } from 'tippy.js';
import { Animation } from './animation';

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
    dark?: boolean;
    theme?: string;
    appendTo?: 'parent' | Element | (() => Element);
    displaySeparator?: boolean;
    displayTitle?: boolean;
    displayArticles?: boolean;
    displayRelatedTopics?: boolean;
    displayPopover?: boolean;
    displayTooltip?: boolean;
    delay?: number | [number | null, number | null];
    animation?: Animation;
}
