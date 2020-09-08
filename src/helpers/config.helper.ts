import { PopoverConfig } from '../classes/popover-config';
import { PopoverContent } from '../classes/popover-content';
import { DEFAULT_LABELS } from '../constants/default-labels';
import { PopoverProps } from '../classes/popover-props';
import { IPopoverOptions, PopoverOptions } from '../classes';
import { Theme } from '../constants/template.constants';
import { TemplateHelper } from './template.helper';
import { TargetEventHandler } from '../classes/target-event-handler';

export class ConfigHelper {

    /**
     * Builds the tippy.js popover props from the configuration
     *
     * @param config the popover configuration
     * @param targetHandler the popover target (icon) handler
     */
    static buildPropsFromConfig(config: PopoverConfig, targetHandler: TargetEventHandler): PopoverProps {
        if (!ConfigHelper.checkConfig(config)) {
            return null;
        }
        const content: HTMLDivElement = TemplateHelper.buildTemplate(config, targetHandler);

        if (!content) {
            return null;
        }
        const props: PopoverProps = {
            content,
            ...ConfigHelper.mapOptionsToProps(config.options)
        };
        return props;
    }

    /**
     * Returns true if configuration is valid
     *
     * Checks configuration, target,
     * and sets default labels if they're not defined
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
     * Builds a popover props object from the provided options
     *
     * @param options the provided options
     */
    static mapOptionsToProps(options: IPopoverOptions): PopoverProps {
        const src = options || new PopoverOptions();
        // If dark is selected, force EDC_DARK theme, else use provided theme if present
        const theme = src.dark ? Theme.EDC_DARK : src.theme;
        return new PopoverProps(
            src.placement,
            src.hideOnClick,
            src.interactive,
            src.trigger,
            src.appendTo,
            theme,
            src.delay,
            src.animation);
    }

    /**
     * Returns true if any content was found
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
     * Returns true if content has any description
     * empty descriptions (white spaces only) will return false
     *
     * @param content the given content to check
     */
    static hasDescription(content: PopoverContent): boolean {
        return content && !!content.description && !!content.description.trim();
    }

    /**
     * Returns true if content has at least one article
     *
     * @param content the given content to check
     */
    static hasArticles(content: PopoverContent): boolean {
        return !!content && !!content.articles && content.articles.length > 0;
    }

    /**
     * Returns true if content has at least one link
     *
     * @param content the given content to check
     */
    static hasLinks(content: PopoverContent) {
        return !!content && !!content.links && content.links.length > 0;
    }
}
