import { IPopoverOptions, PopoverConfig, PopoverContent, PopoverItem, PopoverLabels, PopoverOptions } from '../classes';
import { ConfigHelper } from './config.helper';
import {
    AttributeNames,
    ClassNames,
    ElementOptions,
    ICON_TARGET_NULL_MESSAGE,
    ICON_TARGET_WRONG_TYPE,
    TagNames
} from '../constants/template.constants';
import { isFalse } from '../utils/global.utils';
import { TargetEventHandler } from '../classes/target-event-handler';

export class TemplateHelper {

    /**
     * Builds the popover template
     *
     * Will create 2 main parts containing the following items:
     *   - Header: the title
     *   - Body: A first container with the brick description, and a second container,
     *           with articles and links sections
     *
     * Also Adds / removes the event listeners on the target (ie icon), based on
     * displayPopover option value, and handles other options for the icon
     *
     * @param config the popover configuration
     * @param targetHandler popover event handler, to track the event listeners on the target element (for the displayPopover option)
     */
    static buildTemplate(config: PopoverConfig, targetHandler: TargetEventHandler): HTMLDivElement {
        if (!config || !TemplateHelper.checkTarget(targetHandler)) {
            return null;
        }
        if (!config.options) {
            config.options = new PopoverOptions();
        }
        const { options, content, labels } = config;
        // Handle the options for the target
        this.addIconOptions(targetHandler, content, options, labels);

        if (isFalse(config.options.displayPopover)) {
            // No content required if display popover is false
            return null;
        }
        const container = TemplateHelper.buildContainer(options);
        // Header & title
        const popoverHeader = TemplateHelper.buildHeader(content, options);
        if (popoverHeader) {
            container.appendChild(popoverHeader);
        }
        // Body : Description, articles and links
        const popoverBody = TemplateHelper.buildBody(content, labels, options);
        if (popoverBody) {
            container.appendChild(popoverBody);
        }
        return container;
    }

    /**
     * Returns true if target handler and target element are defined,
     * and target is of kind Element
     *
     * @param targetHandler the target event handler
     */
    static checkTarget(targetHandler: TargetEventHandler): boolean {
        if (!targetHandler) {
            return false;
        }
        const { target } = targetHandler;
        if (!target) {
            console.error(ICON_TARGET_NULL_MESSAGE);
            return false;
        }
        if (!(target instanceof Element)) {
            console.error(ICON_TARGET_WRONG_TYPE);
            return false;
        }
        return true;
    }

    /**
     * Builds the main container, with its className
     */
    private static buildContainer(options: IPopoverOptions): HTMLDivElement {
        const container = document.createElement(TagNames.DIV);
        container.classList.add(ClassNames.EDC_POPOVER_CONTAINER);
        if (options && options.customClass) {
            container.classList.add(options.customClass);
        }
        return container;
    }

    /**
     * Builds the Header and insert the title, including the separator if true
     *
     * @param content the content including the title
     * @param options the options for the popover
     */
    private static buildHeader(content: PopoverContent, options: IPopoverOptions): HTMLDivElement {
        if (!options || !options.displayTitle) {
            return null;
        }
        if (!content || !content.title || !content.title.trim()) {
            return null;
        }
        const text = content.title;
        const headerContainer = document.createElement(TagNames.DIV);
        headerContainer.classList.add(ClassNames.EDC_POPOVER_HEADER);
        if (options.displaySeparator) {
            headerContainer.classList.add(ClassNames.EDC_POPOVER_SEPARATOR);
        }
        const title = document.createElement(TagNames.H3);
        title.innerText = text;
        title.classList.add(ClassNames.EDC_POPOVER_TITLE);
        headerContainer.appendChild(title);
        return headerContainer;
    }

    /**
     * Creates the popover's body
     * includes the brick description, articles and links sections
     *
     * As default fallback, if no content was found, returns the coming soon message
     * from the translated labels
     *
     * @param content the popover content
     * @param labels the popover labels
     * @param options the popover options
     */
    private static buildBody(content: PopoverContent, labels: PopoverLabels, options: IPopoverOptions): HTMLDivElement {
        const popoverBody = document.createElement(TagNames.DIV);
        // Body container
        popoverBody.classList.add(ClassNames.EDC_POPOVER_BODY, ClassNames.EDC_POPOVER_CONTENT);
        if (!ConfigHelper.hasContent(content)) {
            // Use coming soon message if no body content was found
            popoverBody.innerText = labels.comingSoon;
            return popoverBody;
        }
        // Add Description
        if (content.description) {
            const description = document.createElement(TagNames.ARTICLE);
            description.innerText = content.description;
            description.classList.add(ClassNames.EDC_POPOVER_DESC);
            popoverBody.appendChild(description);
        }
        const popoverSection = this.createSection(content, labels, options);
        if (popoverSection) {
            popoverBody.appendChild(popoverSection);
        }
        return popoverBody;
    }

    /**
     * Creates the articles and link section
     *
     * @param content the popover content to use
     * @param labels the labels for the translation
     * @param options popover options
     * @private
     */
    private static createSection(content: PopoverContent, labels: PopoverLabels, options: IPopoverOptions): HTMLDivElement {
        if ((!ConfigHelper.hasArticles(content) || !options.displayArticles)
            && (!ConfigHelper.hasLinks(content) || !options.displayRelatedTopics)) {
            return null;
        }
        // Add the article and link section
        const popoverSection = document.createElement('div');
        popoverSection.classList.add(ClassNames.EDC_POPOVER_SECTION);

        // Articles
        const articles: HTMLDivElement = options.displayArticles ?
            TemplateHelper.buildSectionList(content.articles, labels.articles, ClassNames.NEED_MORE) : null;
        if (articles) {
            popoverSection.appendChild(articles);
        }
        // Links
        const links: HTMLDivElement = options.displayRelatedTopics ?
            TemplateHelper.buildSectionList(content.links, labels.links, ClassNames.RELATED_TOPIC) : null;
        if (links) {
            popoverSection.appendChild(links);
        }
        return popoverSection;
    }

    /**
     * Creates the html div element containing the complementary sections (articles / links)
     *
     * @param items array of popover items (articles or links)
     * @param label the string to add at the top of the list section
     * @param className the name of the item list class (specific to articles or links)
     */
    private static buildSectionList(items: PopoverItem[], label: string, className: string): HTMLDivElement {
        if (!items || !items.length) {
            return;
        }
        const container = document.createElement(TagNames.DIV);
        // Add the label presenting the list
        const title = TemplateHelper.createSectionLabel(label);
        if (title) {
            title.classList.add(ClassNames.EDC_POPOVER_SECTION_TITLE);
            container.appendChild(title);
        }

        const list = document.createElement(TagNames.UL);
        list.classList.add(className);
        items.forEach((currentValue: PopoverItem) => {
            const li = TemplateHelper.createItem(currentValue);
            if (li) {
                list.appendChild(li);
            }
        });
        container.appendChild(list);
        return container;
    }

    /**
     * Creates the label element for the popover item list section (article / links)
     *
     * @param label the string to use for the label
     */
    private static createSectionLabel(label: string): HTMLDivElement {
        if (!label || !label.trim()) {
            return null;
        }
        const title = document.createElement(TagNames.H6);
        const titleText = document.createElement(TagNames.SPAN);
        titleText.innerText = label;
        title.appendChild(titleText);

        return title;
    }

    /**
     * Create the item element to include in the see also list
     * can be an article or a link
     *
     * Will make the item navigable, using the url property from the item
     *
     * @param item the item to include in the list
     */
    private static createItem(item: PopoverItem): HTMLLIElement {
        const li = document.createElement(TagNames.LI);
        li.classList.add(ClassNames.SECTION_ITEM);
        const link = document.createElement(TagNames.DIV);
        link.classList.add(ClassNames.SECTION_GOTO);
        link.innerText = item.label;
        // Add the open action on click to redirect to the web explorer
        link.onclick = (() => {
            window.open(item.url, ElementOptions.WINDOW_OPEN_TARGET, ElementOptions.WINDOW_OPEN_FEATURES);
        });
        li.appendChild(link);
        return li;
    }

    /**
     * Handles the options for the popover trigger element
     * Customizations include element title attribute - tooltip, and on click event handler
     *
     * if displayPopover option was set to false, it will open a new window with the edc help viewer url
     * instead of displaying the popover url will point to the first article
     *
     * @param eventHandler the popover event handler, to keep track of the event callbacks
     * @param content the popover content
     * @param options the popover options
     * @param labels the popover labels
     */
    private static addIconOptions(eventHandler: TargetEventHandler, content: PopoverContent, options: IPopoverOptions, labels: PopoverLabels): void {
        if (options.displayTooltip && labels && labels.iconAlt) {
            eventHandler.target.setAttribute(AttributeNames.TITLE, labels.iconAlt);
        } else {
            // Remove if previously set
            eventHandler.target.removeAttribute(AttributeNames.TITLE);
        }
        // Handle the click on the icon, based on displayPopover option value
        let articleUrl = '';
        if (ConfigHelper.hasArticles(content)) {
            // Use the first article as entry point for edc help viewer
            articleUrl = content.articles[0].url;
        }

        // The event handler will add or remove the event listener, based on display popover option and url value
        eventHandler.updateClickHandler(options.displayPopover, articleUrl);
    }
}
