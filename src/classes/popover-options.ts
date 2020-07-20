import { Placement } from 'tippy.js';

/**
 * The options to personalize the popover
 *
 * placement: the position of the popover. Accepted values are:
 * 'auto' | 'top' | 'bottom' | 'left' | 'right'
 * | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
 * | 'left-start' | 'left-end' | 'right-start' | 'right-end';
 * hideOnClick: If true, any click in the document will close the popover
 * interactive: Determine if we can interact with the popover content
 * trigger: which event will trigger the opening of the popover
 * customClass: class name that will be added to the main popover container
 * theme: the name of the theme to use for this popover
 * appendTo: the element to which the popover will be append
 *
 */
export class PopoverOptions {
    placement: Placement = 'bottom';
    hideOnClick = true;
    interactive = true;
    trigger = 'click';
    customClass?: string;
    theme?: string;
    appendTo: 'parent' | Element | (() => Element) = () => document.body;
}
