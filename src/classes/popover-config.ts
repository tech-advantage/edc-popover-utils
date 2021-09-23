import { PopoverContent } from './popover-content';
import { PopoverLabels } from './popover-labels';
import { IPopoverOptions } from './popover-options.interface';
import { SingleTarget } from 'tippy.js';
import { PopoverOptions } from './popover-options';

/**
 * Configuration for the popover, passed as an input from the host element
 *
 * target: The reference of the target that will trigger the popover
 * content: The popover's content: the title for the header, the description, articles and links for the body
 * labels: The translated labels
 * options: Popover customizations
 */
export class PopoverConfig {
    target: SingleTarget | null = null;
    content: PopoverContent | null = null;
    labels: PopoverLabels | null = null;
    options: IPopoverOptions | null | undefined = new PopoverOptions();
}
