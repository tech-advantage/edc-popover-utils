/**
 * Represents a list item for the popover content
 *
 * Typically, an article or a link
 *
 */
export class PopoverItem {
    public id?: number;
    constructor(public label: string | null, public url: string | null) {
    }
}
