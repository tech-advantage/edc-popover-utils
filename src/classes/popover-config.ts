import { PopoverContent } from './popover-content';
import { PopoverLabels } from './popover-labels';
import { IPopoverOptions } from './popover-options.interface';

/**
 * Configuration for the popover, passed as an input from the host element
 *
 * target: The target that will trigger the popover - can be an element id, the reference of the element itself, or classes
 * icon: The class name to use for the icon
 * content: The popover's content: the title for the header, the description, articles and links for the body
 * labels: The translated labels
 * options: Popover customizations
 */
export class PopoverConfig {
    target: Element;
    icon: string;
    content: PopoverContent;
    labels: PopoverLabels;
    options?: IPopoverOptions;
}
