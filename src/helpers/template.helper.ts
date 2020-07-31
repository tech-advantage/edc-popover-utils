import { PopoverItem } from '../classes';
import { ConfigHelper } from './config.helper';
import { ClassNames, ElementOptions, TagNames } from '../constants/template.constants';
import { PopoverContent } from '../classes';
import { IPopoverOptions, PopoverConfig, PopoverLabels } from '../classes';

export class TemplateHelper {

    /**
     * Build the popover template
     *
     * The 2 main parts contain the following items:
     *   - Header: the title
     *   - Body: A first container with the brick description, and a second container,
     *           with the articles and links sections
     *
     * @param config popover configuration
     */
    static buildTemplate(config: PopoverConfig): HTMLDivElement {
        if (!config) {
            return null;
        }
        const { options, content, labels } = config;
        const container = TemplateHelper.buildContainer(options);
        // Title
        const popoverHeader = TemplateHelper.buildHeader(content);
        if (popoverHeader) {
            container.appendChild(popoverHeader);
        }
        // Body : Description, articles and links
        const popoverBody = TemplateHelper.buildBody(content, labels);
        if (popoverBody) {
            container.appendChild(popoverBody);
        }
        return container;
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
     * Builds the Header and insert the title
     *
     * @param content the content including the title
     */
    private static buildHeader(content: PopoverContent): HTMLDivElement {
        if (!content || !content.title || !content.title.trim()) {
            return null;
        }
        const text = content.title;
        const headerContainer = document.createElement(TagNames.DIV);
        headerContainer.classList.add(ClassNames.EDC_POPOVER_HEADER);
        const title = document.createElement(TagNames.H3);
        title.innerText = text;
        title.classList.add(ClassNames.EDC_POPOVER_TITLE);
        headerContainer.appendChild(title);
        return headerContainer;
    }

    /**
     * Create the popover's body
     * includes the brick description, the articles and links sections
     * If no content was found, will return the coming soon message,
     * from the translated labels
     *
     * @param content the popover content
     * @param labels the popover labels
     */
    private static buildBody(content: PopoverContent, labels: PopoverLabels): HTMLDivElement {
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

        // Add the article and link section
        const popoverSection = document.createElement('div');
        popoverSection.classList.add(ClassNames.EDC_POPOVER_SECTION);

        // Articles
        const articles: HTMLDivElement = TemplateHelper.buildItemList(content.articles, labels.articles, ClassNames.NEED_MORE);
        if (articles) {
            popoverSection.appendChild(articles);
        }
        // Links
        const links: HTMLDivElement = TemplateHelper.buildItemList(content.links, labels.links, ClassNames.RELATED_TOPIC);
        if (links) {
            popoverSection.appendChild(links);
        }
        popoverBody.appendChild(popoverSection);
        return popoverBody;
    }

    /**
     * Create the html div element containing the "see also" list (articles or links)
     *
     * @param items array of popover items (articles or links)
     * @param label the string to add at the top of the list section
     * @param className the name of the item list class (specific to articles or links)
     */
    private static buildItemList(items: PopoverItem[], label: string, className: string): HTMLDivElement {
        if (!items || !items.length) {
            return;
        }
        const container = document.createElement(TagNames.DIV);
        const title = TemplateHelper.createSeeAlsoLabel(label);
        title.classList.add(ClassNames.EDC_POPOVER_SECTION_TITLE);
        if (container) {
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
     * Create the label element for the popover item list section
     * @param label the string to use for the label
     */
    private static createSeeAlsoLabel(label: string): HTMLDivElement {
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
}
