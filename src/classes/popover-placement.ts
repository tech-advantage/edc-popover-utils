/**
 * Placement options
 * Based on Popper.Placement
 */
export enum PopoverPlacement {
    // Base Placement
    TOP = 'top',
    BOTTOM = 'bottom',
    RIGHT = 'right',
    LEFT = 'left',
    // Auto placement
    AUTO = 'auto',
    AUTO_START = 'auto-start',
    AUTO_END = 'auto-end',
    // Variation placement
    TOP_START = 'top-start',
    TOP_END = 'top-end',
    BOTTOM_START = 'bottom-start',
    BOTTOM_END = 'bottom-end',
    RIGHT_START = 'right-start',
    RIGHT_END = 'right-end',
    LEFT_START = 'left-start',
    LEFT_EDN = 'left-end'
}

export const PopoverPlacements: PopoverPlacement[] = Object.values(PopoverPlacement);
