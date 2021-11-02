import { PopoverItem } from './popover-item';

/**
 * This class will contain the different content parts of the popover
 *
 * title: Will be set to the header
 * description: The description for the brick, under the title
 * articles: list of articles belonging to the brick
 * links: list of related documents, linked to this specific brick
 *
 */
export class PopoverContent {

    constructor(public title: string | null = '',
                public description: string | null = '',
                public articles: PopoverItem[] = [],
                public links: PopoverItem[] = []) {
    }
}
