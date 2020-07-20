import { PopoverItem } from './popover-item';

/**
 * This class will contain the different content parts of the popover
 *
 * title: Will be set to the header
 * description: The description for the documentation brick, under the title
 * articles: list of articles belonging to the documentation brick
 * links: list of related documents, linked to this specific documentation brick
 *
 */
export class PopoverContent {

    constructor(public title = '',
                public description = '',
                public articles: PopoverItem[] = [],
                public links: PopoverItem[] = []) {
    }
}
