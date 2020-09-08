import { PopoverConfig } from '../../src/classes/popover-config';
import { ConfigHelper } from '../../src/helpers/config.helper';
import { IPopoverOptions, PopoverContent, PopoverOptions } from '../../src/classes';
import { DEFAULT_LABELS } from '../../src/constants/default-labels';
import { PopoverProps } from '../../src/classes/popover-props';
import { Theme } from '../../src/constants/template.constants';

describe('Configuration Helper Test', () => {
    let config: PopoverConfig;
    beforeEach(() => {
        config = Object.assign(new PopoverConfig(), {
            target: '#singleTooltip',
            content: Object.assign(new PopoverContent(), {
                title: 'Popover de test',
                description: 'Description du popover de test',
                articles: [{ label: 'How to', url: '' }, { label: 'Example', url: '' }],
                links: [{ label: 'Link 1', url: '' }, { label: 'Link 2', url: '' }]
            }),
            labels: DEFAULT_LABELS
        });
    });

    describe('checkConfig', () => {
        it('should return false if configuration is null or undefined', () => {
            // Given configuration object is null or undefined
            // When checking the configuration
            // It should return false
            expect(ConfigHelper.checkConfig(null)).toBeFalse();
            expect(ConfigHelper.checkConfig(undefined)).toBeFalse();
        });
        it('should return false if no target', () => {
            // Given configuration object is defined but target is not
            const targetNull = Object.assign(new PopoverConfig(), config, { target: null });
            const targetUndefined = Object.assign(new PopoverConfig(), config, { target: undefined });
            const targetEmpty = Object.assign(new PopoverConfig(), config, { target: '' });
            // When checking the configuration
            // It should return false
            expect(ConfigHelper.checkConfig(targetNull)).toBeFalse();
            expect(ConfigHelper.checkConfig(targetUndefined)).toBeFalse();
            expect(ConfigHelper.checkConfig(targetEmpty)).toBeFalse();
        });
        it('should return true if configuration is valid', () => {
            // Given configuration object is defined and valid
            expect(config).toBeDefined();
            // When checking the configuration
            // It should return true
            expect(ConfigHelper.checkConfig(config)).toBeTruthy();
        });
    });

    describe('hasBody', () => {
        it('should return true if configuration includes all popover body elements', () => {
            // Given popover configuration contains description, articles and links
            expect(config.content.description).toBeTruthy();
            expect(config.content.articles.length).toBeGreaterThan(0);
            expect(config.content.links.length).toBeGreaterThan(0);

            // When checking for body element configuration
            const hasBody = ConfigHelper.hasContent(config.content);

            // Then it should be true
            expect(hasBody).toBeTruthy();
        });
        it('should return true if configuration includes at least one popover body element', () => {
            // Given at least one element is present
            const description = Object.assign(new PopoverContent(), config.content, { articles: null, links: null });
            const articles = Object.assign(new PopoverContent(), config.content, {  description: null, links: null  });
            const links = Object.assign(new PopoverContent(), config.content, { description: null, articles: null });
            const descAndArticles = Object.assign(new PopoverContent(), config.content, { links: null });
            const descAndLinks = Object.assign(new PopoverContent(), config.content, { articles: null });

            // When checking for body element configuration
            const hasBody = ConfigHelper.hasContent(description) && ConfigHelper.hasContent(articles) && ConfigHelper.hasContent(links)
            && ConfigHelper.hasContent(descAndArticles) && ConfigHelper.hasContent(descAndLinks);

            // Then it should be true
            expect(hasBody).toBeTruthy();
        });
        it('should return false if configuration does NOT include any popover body element', () => {
            // Given popover configuration contains no description, articles or links
            const noBody = Object.assign(new PopoverContent(), config.content, { description: null, articles: null, links: null });

            // When checking for body element configuration
            const hasBody = ConfigHelper.hasContent(noBody);

            // Then it should be true
            expect(hasBody).toBeFalse();
        });
    });

    describe('mapOptionsToProps', () => {
        let options: PopoverOptions;
        beforeEach(() => {
            options = new PopoverOptions();
        });
        it('should return props attributes', () => {
            // Given we have options with custom values
            options.customClass = 'customClass';
            options.placement = 'top';
            options.trigger = 'mouseenter';
            options.interactive = false;
            options.hideOnClick = false;
            options.appendTo = 'parent';

            // When calling mapOptionsToProps
            const props: PopoverProps = ConfigHelper.mapOptionsToProps(options);

            const expectedProps: PopoverProps = new PopoverProps();
            expectedProps.placement = 'top';
            expectedProps.trigger = 'mouseenter';
            expectedProps.interactive = false;
            expectedProps.hideOnClick = false;
            expectedProps.appendTo = 'parent';

            // We should have the associated values
            expect(props).toEqual(expectedProps);
            // Others properties should not have been copied
            expect((props as any)['customClass']).toBeUndefined();
            expect((props as any)['dark']).toBeUndefined();
        });

        it('should return theme edcDark if dark is true', () => {
            // Given dark option is true
            options.dark = true;
            options.theme = 'customTheme';

            // When calling mapOptionsToProps
            const props: PopoverProps = ConfigHelper.mapOptionsToProps(options);
            const expectedProps: PopoverProps = new PopoverProps();
            expectedProps.theme = Theme.EDC_DARK;
            expectedProps.appendTo = options.appendTo;

            // We should have the associated values, ignoring the option's theme attribute
            expect(props).toEqual(expectedProps);
            expect((props as any)['dark']).toBeUndefined();
        });

        it('should return customTheme if dark is false', () => {
            // Given dark option is true
            options.dark = false;
            options.theme = 'customTheme';

            // When calling mapOptionsToProps
            const props: PopoverProps = ConfigHelper.mapOptionsToProps(options);
            const expectedProps: PopoverProps = new PopoverProps();
            expectedProps.appendTo = options.appendTo;
            expectedProps.theme = 'customTheme';

            // We should have the associated values, ignoring the option's theme attribute
            expect(props).toEqual(expectedProps);
            expect((props as any)['dark']).toBeUndefined();
        });

        it('should return default value when options are not defined', () => {
            // Given we pass null or undefined as options
            const optionNull: PopoverOptions = null;
            // When calling mapOptionsToProps
            const props1: PopoverProps = ConfigHelper.mapOptionsToProps(optionNull);
            const props2: PopoverProps = ConfigHelper.mapOptionsToProps(undefined);

            expect(JSON.stringify(props1)).toEqual(JSON.stringify(new PopoverProps()));
            expect(JSON.stringify(props2)).toEqual(JSON.stringify(new PopoverProps()));
        });
        it('should replace with default value when properties are not defined', () => {
            // Given we have a partially defined options object
            const partialOptions: IPopoverOptions = {
                customClass: 'myClass'
            };

            // When calling mapOptionsToProps
            const props1: PopoverProps = ConfigHelper.mapOptionsToProps(partialOptions);

            // Then default values should have been set with default values
            expect(props1.trigger).toBeTruthy();
            expect(props1.placement).toEqual('bottom');
            expect(typeof props1.appendTo).toEqual('function');
            expect(props1.hideOnClick).toBeTruthy();
            expect(props1.interactive).toBeTruthy();
            // Theme is undefined by default
            expect(props1.theme).toBeUndefined();

        });
        it('should override defaults with parameter values', () => {
            // Given we have a partially defined options object
            const partialOptions: IPopoverOptions = {
                trigger: 'notDefault'
            };

            // When calling mapOptionsToProps
            const props1: PopoverProps = ConfigHelper.mapOptionsToProps(partialOptions);

            // Then we should receive the specified option value
            expect(props1.trigger).toEqual('notDefault');
        });
    })
});
