import { Animation } from './animation';
import { PopoverPlacement } from './popover-placement';

/**
 * The options to personalize the popover via an interface
 * @see popover-options.ts
 *
 */
export interface IPopoverOptions {
    placement?: PopoverPlacement;
    hideOnClick?: boolean;
    interactive?: boolean;
    trigger?: string;
    customClass?: string;
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
