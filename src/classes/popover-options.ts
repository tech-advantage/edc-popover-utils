import { IPopoverOptions } from './popover-options.interface';
import { Animation } from './animation';
import { PopoverPlacement } from './popover-placement';

/**
 * The options to personalize the popover
 *
 * placement: the position of the popover. Accepted values are:
 *      'auto' | 'top' | 'bottom' | 'left' | 'right'
 *      | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
 *      | 'left-start' | 'left-end' | 'right-start' | 'right-end';
 * hideOnClick: If true, any click in the document will close the popover
 * interactive: Determine if we can interact with the popover content
 * trigger: Event that will trigger the popover: `click`, `mouseenter`, `focus`
 * customClass: class name that will be added to the main popover container
 * theme: Popover's theme name
 * displaySeparator: Hide / show the line between header and body
 * displayTitle: Hide / show the header containing the title - if false, will hide the separator
 * displayArticles: Hide / show the articles section
 * displayRelatedTopics: Hide / show the related Topics (aka Links) section
 * displayTooltip: Hide / show the icon tooltip
 * displayPopover: If false, clicking on the icon will open the web help viewer on the first article, instead of showing the popover
 * delay: Delay in milliseconds before showing the popover - if array, delay for opening and closing respectively
 * animation: Adds a animation when opening / closing the popover
 * appendTo: The element to which append the popover to
 */
export class PopoverOptions implements IPopoverOptions {
    placement: PopoverPlacement = PopoverPlacement.BOTTOM;
    hideOnClick = true;
    interactive = true;
    trigger = 'click';
    customClass?: string;
    theme?: string;
    displaySeparator = true;
    displayTitle = true;
    displayArticles = true;
    displayRelatedTopics = true;
    displayTooltip = true;
    displayPopover = true;
    delay?: number | [number | null, number | null];
    animation?: Animation;
    appendTo: 'parent' | Element | (() => Element) = () => document.body;
}
