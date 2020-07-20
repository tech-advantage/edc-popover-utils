import { PopoverConfig } from '../../src/classes/popover-config';
import { ConfigHelper } from '../../src/helpers/config.helper';
import { PopoverContent } from '../../src/classes';
import { DEFAULT_LABELS } from '../../src/constants/default-labels';

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
});
