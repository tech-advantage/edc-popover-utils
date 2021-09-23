import { AttributeNames, ElementOptions, EventType } from '../constants/template.constants';
import { isFalse } from '../utils/global.utils';

/**
 * Wrapper for dom target element (ie the help icon)
 * Manages event listeners on the popover target element, including removing listeners.
 *
 * 'click' behavior:
 * If displayPopover option is false, click events on the target will open the edc help viewer instead of showing the popover
 * When displayPopover is reset to true, the Popover Event handler will remove the event listener on the target
 * and let the popover display again.
 */
export class TargetEventHandler {

    constructor(public target: Element) {
    }

    /**
     * Handles the click event on the target (the help icon)
     *
     * If displayPopover option is false, clicking on the target will open the edc help viewer instead of the popover
     *
     * @param displayPopover state of displayPopover option: if false, open the help viewer, if true, display the popover
     * @param url the first article url, entry point for the help viewer application
     */
    updateClickHandler(displayPopover: boolean, url: string | null | undefined): void {
        if (!this.target) {
            return;
        }
        // If url is valid and displayPopover is defined and false
        if (url && isFalse(displayPopover)) {
            // Store the help viewer url in the DATA_URL attribute
            this.target.setAttribute(AttributeNames.DATA_URL, url);
            this.target.addEventListener(EventType.CLICK, clickHandler);
        } else {
            this.removeEventListener(EventType.CLICK);
        }
    }

    /**
     * Remove event listener from the target element
     *
     * @param eventType the type of the event listener to remove
     */
    removeEventListener(eventType: EventType): void {
        if (!this.target) {
            return;
        }
        // Remove the help viewer url form the element
        this.target.removeAttribute(AttributeNames.DATA_URL);
        // Removing the event listener needs the precise reference of the previously registered callback 'clickHandler'
        this.target.removeEventListener(eventType, clickHandler);
    }
}

/**
 * The function to be passed to the DOM's click event listener, to open the help viewer instead of the popover
 *
 * Opens the help viewer on the brick's first article
 * The url should have been previously stored in the data-url attribute of the target element
 *
 * @param e the click event
 */
function clickHandler(this: Element, e: Event): void {
    // Will be called within target element scope, "this" will refer to the dom element itself
    const articleUrl = this.getAttribute(AttributeNames.DATA_URL); // Help viewer's url has been stored as a data-property
    if (!articleUrl) {
        return;
    }
    e.stopPropagation();

    // Open edc help viewer on first article from the stored url
    window.open(
        articleUrl,
        ElementOptions.WINDOW_OPEN_TARGET,
        ElementOptions.WINDOW_OPEN_FEATURES);
}
