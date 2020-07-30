import { PopoverConfig } from '../classes/popover-config';
import { PopoverContent } from '../classes/popover-content';
import { DEFAULT_LABELS } from '../constants/default-labels';
import { PopoverProps } from '../classes/popover-props';
import { IPopoverOptions, PopoverOptions } from '../classes';
import { Theme } from '../constants/template.constants';

export class ConfigHelper {

    /**
     * Verify the given configuration, return true if valid else false
     *
     * @param config the input configuration
     */
    static checkConfig(config: PopoverConfig): boolean {
        if (!config) {
            console.warn('No configuration found for popover');
            return false;
        }
        if (!config.target) {
            console.warn('Popover cannot be created, element target is missing');
            return false;
        }
        // Use default labels if customs are missing
        if (!config.labels) {
            config.labels = DEFAULT_LABELS;
        }
        return true;
    }

    /**
     * Build a popover props object from the provided options
     *
     * @param options the provided options
     */
    static mapOptionsToProps(options: IPopoverOptions): PopoverProps {
        const src = options || new PopoverOptions();
        // If dark is selected, force EDC_DARK theme, else use provided theme if present
        const theme = src.dark ? Theme.EDC_DARK : src.theme;
        return new PopoverProps(src.placement, src.hideOnClick, src.interactive, src.trigger, src.appendTo, theme);
    }

    /**
     * Return true if any content was found
     *
     * content can be description, articles or links
     *
     * @param content the given content to check
     */
    static hasContent(content: PopoverContent): boolean {
        return ConfigHelper.hasDescription(content) ||
            ConfigHelper.hasArticles(content) ||
            ConfigHelper.hasLinks(content);
    }

    /**
     * Return true if content as any description
     * empty description (white spaces only) will be considered negative
     *
     * @param content the given content to check
     */
    static hasDescription(content: PopoverContent): boolean {
        return content && !!content.description && !!content.description.trim();
    }

    /**
     * Return true if content has at least one article
     *
     * @param content the given content to check
     */
    static hasArticles(content: PopoverContent): boolean {
        return !!content && !!content.articles && content.articles.length > 0;
    }

    /**
     * Return true if content has at least one link
     *
     * @param content the given content to check
     */
    static hasLinks(content: PopoverContent) {
        return !!content && !!content.links && content.links.length > 0;
    }
}
