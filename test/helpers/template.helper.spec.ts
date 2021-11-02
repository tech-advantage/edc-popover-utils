import { PopoverConfig } from '../../src/classes/popover-config';
import { TemplateHelper } from '../../src/helpers/template.helper';
import { PopoverContent, PopoverOptions } from '../../src/classes';
import { DEFAULT_LABELS } from '../../src/constants/default-labels';
import { compareStringContent } from '../../src/utils/test.utils';
import { ClassNames, ElementOptions, } from '../../src/constants/template.constants';
import { TargetEventHandler } from '../../src/classes/target-event-handler';

describe('Template Helper test', () => {
    let config: PopoverConfig;

    // Partial contents
    let headerContent: string;
    let descriptionContent: string;
    let articlesContent: string;
    let linksContent: string;
    let fullContent: string;

    // Other variables
    let iconTarget: Element;
    let eventsHandler: TargetEventHandler;

    beforeEach(() => {
        iconTarget = document.createElement('span');
        config = new PopoverConfig();
        config.target = iconTarget;
        config.content = new PopoverContent(
            'Popover de test',
            'Description du popover de test',
            [{ label: 'How to', url: 'url1' }, { label: 'Example', url: 'url2' }],
            [{ label: 'Link 1', url: '' }, { label: 'Link 2', url: '' }]
        );
        config.options = new PopoverOptions();
        config.labels = DEFAULT_LABELS;

        eventsHandler = new TargetEventHandler(config.target);
        // Generate contents
        headerContent =
        `<div class="edc-popover-header edc-popover-separator">
            <h3 class="edc-popover-title">${config.content.title}</h3>
        </div>`;
        descriptionContent = `
        <article class="edc-popover-desc">${config.content.description}</article>
        `;
        articlesContent = `
        <div>
            <h6 class="edc-popover-section-title"><span>${config.labels.articles}</span></h6>
            <ul class="edc-popover-need-more">
                <li class="edc-popover-section-item">
                    <div class="edc-popover-section-goto">${config.content.articles[0].label}</div>
                </li>
                <li class="edc-popover-section-item">
                    <div class="edc-popover-section-goto">${config.content.articles[1].label}</div>
                </li>
            </ul>
        </div>
        `;
        linksContent = `
        <div>
            <h6 class="edc-popover-section-title"><span>${config.labels.links}</span></h6>
            <ul class="edc-popover-related-topics">
                <li class="edc-popover-section-item">
                    <div class="edc-popover-section-goto">${config.content.links[0].label}</div>
                </li>
                <li class="edc-popover-section-item">
                    <div class="edc-popover-section-goto">${config.content.links[1].label}</div>
                </li>
            </ul>
        </div>
        `;

        fullContent = `
        ${headerContent}
         <div class="edc-popover-body edc-popover-content">
            ${descriptionContent}
            <div class="edc-popover-section">
                ${articlesContent}
                ${linksContent}
            </div>
        </div>`;
    });

    describe('buildTemplate test', () => {
        describe('build the template content', () => {
            it('should return the full popover content', () => {
                // Given the popover configuration contains title and all the body elements

                // When building the template for this config
                const content: HTMLDivElement | null = TemplateHelper.buildTemplate(config, eventsHandler);

                // Then it should have the expected content
                expect(content).toBeDefined();
                expect(compareStringContent(content.innerHTML, fullContent)).toBeTruthy();
            });

            it('should return the empty message if no content', () => {
                // Given config has no provided content
                config.content = null;

                // When building the popover template
                const content: HTMLDivElement | null  = TemplateHelper.buildTemplate(config, eventsHandler);

                // Then it should contain a div with the coming soon message label
                expect(content).toBeDefined();
                const expectedContent = `<div class="edc-popover-body edc-popover-content">${config.labels.comingSoon}</div>`;
                expect(content.innerHTML).toEqual(expectedContent);
            });

            it('should return the description and links if articles are empty', () => {
                // Given config has no articles
                config.content.articles = [];

                // When building the popover template
                const content: HTMLDivElement | null = TemplateHelper.buildTemplate(config, eventsHandler);

                // Then it should have the expected content with no articles
                const expectedContent =
                    `<div class="edc-popover-header edc-popover-separator">
                    <h3 class="edc-popover-title">${config.content.title}</h3>
                 </div>
                 <div class="edc-popover-body edc-popover-content">
                    <article class="edc-popover-desc">${config.content.description}</article>
                    <div class="edc-popover-section">
                        <div>
                            <h6 class="edc-popover-section-title"><span>${config.labels.links}</span></h6>
                            <ul class="edc-popover-related-topics">
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.links[0].label}</div>
                                </li>
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.links[1].label}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;

                expect(compareStringContent(content.innerHTML, expectedContent)).toBeTruthy();
            });

            it('should return the description and articles if links are empty', () => {
                if (!config || !config.content || !config.labels) {
                    return;
                }
                // Given config has no articles
                config.content.links = [];

                // When building the popover template
                const content: HTMLDivElement | null = TemplateHelper.buildTemplate(config, eventsHandler);

                // Then it should have the expected content with no links
                const expectedContent =
                    `<div class="edc-popover-header edc-popover-separator">
                    <h3 class="edc-popover-title">${config.content.title}</h3>
                 </div>
                 <div class="edc-popover-body edc-popover-content">
                    <article class="edc-popover-desc">${config.content.description}</article>
                    <div class="edc-popover-section">
                        <div>
                            <h6 class="edc-popover-section-title"><span>${config.labels.articles}</span></h6>
                            <ul class="edc-popover-need-more">
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.articles[0].label}</div>
                                </li>
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.articles[1].label}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;

                expect(compareStringContent(content.innerHTML, expectedContent)).toBeTruthy();
            });

            it('should return the description only if articles and links are empty', () => {
                // Given config has no articles and no links
                config.content.articles = [];
                config.content.links = [];

                // When building the popover template
                const content: HTMLDivElement | null = TemplateHelper.buildTemplate(config, eventsHandler);

                // Then it should have the expected content with no links
                const expectedContent =
                    `<div class="edc-popover-header edc-popover-separator">
                    <h3 class="edc-popover-title">${config.content.title}</h3>
                 </div>
                 <div class="edc-popover-body edc-popover-content">
                    <article class="edc-popover-desc">${config.content.description}</article>
                </div>`;

                expect(compareStringContent(content.innerHTML, expectedContent)).toBeTruthy();
            });

            it('should return the articles and links only if description is empty', () => {
                // Given config has no articles and no links
                config.content.description = null;

                // When building the popover template
                const content: HTMLDivElement | null = TemplateHelper.buildTemplate(config, eventsHandler);

                // Then it should have the expected content with no article description element
                const expectedContent =
                    `<div class="edc-popover-header edc-popover-separator">
                    <h3 class="edc-popover-title">${config.content.title}</h3>
                 </div>
                 <div class="edc-popover-body edc-popover-content">
                    <div class="edc-popover-section">
                        <div>
                            <h6 class="edc-popover-section-title"><span>${config.labels.articles}</span></h6>
                            <ul class="edc-popover-need-more">
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.articles[0].label}</div>
                                </li>
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.articles[1].label}</div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h6 class="edc-popover-section-title"><span>${config.labels.links}</span></h6>
                            <ul class="edc-popover-related-topics">
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.links[0].label}</div>
                                </li>
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.links[1].label}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;

                expect(compareStringContent(content.innerHTML, expectedContent)).toBeTruthy();
            });

            it('should skip the header if no title', () => {
                // Given no title
                const configNullTitle = Object.assign(config, { content: Object.assign(config.content, { title: null }) });
                const configEmptyTitle = Object.assign(config, { content: Object.assign(config.content, { title: '' }) });
                const configSpaceOnlyTitle = Object.assign(config, { content: Object.assign(config.content, { title: '    ' }) });

                // When building the respective popover templates
                const nullTitleTemplate = TemplateHelper.buildTemplate(configNullTitle, eventsHandler);
                const emptyTitleTemplate = TemplateHelper.buildTemplate(configEmptyTitle, eventsHandler);
                const spaceOnlyTitleTemplate = TemplateHelper.buildTemplate(configSpaceOnlyTitle, eventsHandler);

                // Then it should return the popover with no header and no separator class
                const expectedTemplate =
                    `<div class="edc-popover-body edc-popover-content">
                    <article class="edc-popover-desc">${config.content.description}</article>
                    <div class="edc-popover-section">
                        <div>
                            <h6 class="edc-popover-section-title"><span>${config.labels.articles}</span></h6>
                            <ul class="edc-popover-need-more">
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.articles[0].label}</div>
                                </li>
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.articles[1].label}</div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h6 class="edc-popover-section-title"><span>${config.labels.links}</span></h6>
                            <ul class="edc-popover-related-topics">
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.links[0].label}</div>
                                </li>
                                <li class="edc-popover-section-item">
                                    <div class="edc-popover-section-goto">${config.content.links[1].label}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;

                expect(compareStringContent(nullTitleTemplate.innerHTML, expectedTemplate)).toBeTruthy();
                expect(compareStringContent(emptyTitleTemplate.innerHTML, expectedTemplate)).toBeTruthy();
                expect(compareStringContent(spaceOnlyTitleTemplate.innerHTML, expectedTemplate)).toBeTruthy();
            });
        });

        describe('Check target', () => {
            it('should return true if valid', () => {
                // Given target is defined
                expect(eventsHandler.target).toBeDefined();

                // When calling checkTarget
                const result = TemplateHelper.checkTarget(eventsHandler);

                // Then it should return true
                expect(result).toBeTrue();
            });
            it('should return false if target is not defined', () => {
                // Given target is null or not defined
                const undefinedTarget: TargetEventHandler = new TargetEventHandler(null);
                const nullTarget: TargetEventHandler = new TargetEventHandler(undefined);

                // When calling checkTarget it should return false
                expect(TemplateHelper.checkTarget(null)).toBeFalse();
                expect(TemplateHelper.checkTarget(undefinedTarget)).toBeFalse();
                expect(TemplateHelper.checkTarget(nullTarget)).toBeFalse();
            });
        });

        // Options
        describe('Popover options', () => {
            it('should return a template if options is not defined', () => {
                // Given config options are not defined
                const undefinedOptions: PopoverConfig = { ...config, options: undefined };
                const nullOptions: PopoverConfig = { ...config, options: null };

                // When building the templates
                const undefinedOptionsTemplate = TemplateHelper.buildTemplate(undefinedOptions, eventsHandler);
                const nullOptionsTemplate = TemplateHelper.buildTemplate(nullOptions, eventsHandler);

                // Then both should be defined
                expect(undefinedOptionsTemplate).toBeDefined();
                expect(nullOptionsTemplate).toBeDefined();
                // Both should match the full content template
                expect(compareStringContent(undefinedOptionsTemplate.innerHTML, fullContent)).toBeTruthy();
                expect(compareStringContent(nullOptionsTemplate.innerHTML, fullContent)).toBeTruthy();
            });
        });

        // Icon options
        describe('Icon options', () => {

            // Tooltip option
            it('should add tooltip', () => {
                // Given displayTooltip is true
                expect(config.options.displayTooltip).toBeTruthy();
                // Current target title is null
                expect(config.target.getAttribute('title')).toBeNull();

                // When building the respective popover templates
                TemplateHelper.buildTemplate(config, eventsHandler);

                // Then target should have the title property set
                expect(config.target.getAttribute('title')).toEqual(config.labels.iconAlt);
            });
            it('should NOT set tooltip if displayTooltip is false', () => {
                // Given displayTooltip is false
                config.options.displayTooltip = false;
                // Current target title is null
                expect(config.target.getAttribute('title')).toBeNull();

                // When building the respective popover templates
                TemplateHelper.buildTemplate(config, eventsHandler);

                // Then target should have the title property set
                expect(config.target.getAttribute('title')).toBeNull();
            });

            // Display popover
            it('should trigger open if displayPopover is false', () => {
                spyOn(window, 'open');
                // Given displayPopover is false
                config.options.displayPopover = false;
                // When building the respective popover templates
                TemplateHelper.buildTemplate(config, eventsHandler);

                const target: HTMLElement = eventsHandler.target as HTMLElement;
                target.click();
                expect(window.open).toHaveBeenCalledWith(
                    config.content.articles[0].url,
                    ElementOptions.WINDOW_OPEN_TARGET,
                    ElementOptions.WINDOW_OPEN_FEATURES);
            });
            it('should NOT trigger open if displayPopover is true', () => {
                spyOn(window, 'open');
                // Given displayPopover is false
                config.options.displayPopover = true;
                // When building the respective popover templates
                TemplateHelper.buildTemplate(config, eventsHandler);

                const target: HTMLElement = config.target as HTMLElement;
                target.click();
                expect(window.open).not.toHaveBeenCalled();
            });

        });

        // Display Options
        describe('display options', () => {
            // Show title
            it('should include title if displayTitle is true', () => {
                // Given displayTitle is true
                expect(config.options.displayTitle).toBeTruthy();

                // When building the respective popover templates
                const template = TemplateHelper.buildTemplate(config, eventsHandler);

                expect(template).toBeDefined();
                const titleElement = template.getElementsByClassName(ClassNames.EDC_POPOVER_TITLE);
                expect(titleElement.length).toEqual(1);
                expect(titleElement[0].tagName).toEqual('H3');
                expect(titleElement[0].innerHTML).toEqual(`${config.content.title}`);
            });
            it('should NOT include title if displayTitle is false', () => {
                // Given displayTitle is false
                config.options.displayTitle = false;

                // When building the respective popover templates
                const template = TemplateHelper.buildTemplate(config, eventsHandler);

                expect(template).toBeDefined();
                const titleElement = template.getElementsByClassName(ClassNames.EDC_POPOVER_TITLE);
                expect(titleElement.length).toEqual(0);
            });
            // Separator
            it('should display the separator if displaySeparator and displayTitle are true', () => {
                // Given displayTitle is true
                expect(config.options.displaySeparator).toBeTruthy();
                expect(config.options.displayTitle).toBeTruthy();

                // When building the respective popover templates
                const template = TemplateHelper.buildTemplate(config, eventsHandler);

                expect(template).toBeDefined();
                const titleContainer = template.getElementsByClassName(ClassNames.EDC_POPOVER_SEPARATOR);
                expect(titleContainer.length).toEqual(1);
                expect(titleContainer[0].tagName).toEqual('DIV');
                // Container should be title's parent
                const titleElement = titleContainer[0].getElementsByClassName(ClassNames.EDC_POPOVER_TITLE);
                expect(titleElement.length).toEqual(1);
            });
            it('should NOT display the separator if displaySeparator and displayTitle are false', () => {
                // Given displaySeparator and displayTitle are false
                config.options.displaySeparator = false;
                config.options.displayTitle = false;

                // When building the respective popover templates
                const template = TemplateHelper.buildTemplate(config, eventsHandler);

                expect(template).toBeDefined();
                const titleContainer = template.getElementsByClassName(ClassNames.EDC_POPOVER_SEPARATOR);
                expect(titleContainer.length).toEqual(0);
            });
            it('should NOT display the separator if displaySeparator is true but displayTitle is false', () => {
                // Given displaySeparator is true BUT displayTitle is false
                config.options.displaySeparator = true;
                config.options.displayTitle = false;

                // When building the respective popover templates
                const template = TemplateHelper.buildTemplate(config, eventsHandler);

                // Then there should not be any title container
                expect(template).toBeDefined();
                const titleContainer = template.getElementsByClassName(ClassNames.EDC_POPOVER_SEPARATOR);
                expect(titleContainer.length).toEqual(0);
            });

            // Display Articles
            it('should include articles if displayArticles is true', () => {
                // Given displayArticles is true
                expect(config.options.displayArticles).toBeTruthy();

                // When building the respective popover templates
                const template = TemplateHelper.buildTemplate(config, eventsHandler);
                expect(template).toBeDefined();

                // Then there should be articles
                const articlesContainer = template.getElementsByClassName(ClassNames.NEED_MORE);
                expect(articlesContainer.length).toEqual(1);
                const articleElements = articlesContainer[0].getElementsByClassName(ClassNames.SECTION_ITEM);
                expect(articleElements.length).toEqual(2);
                // And links should remain included
                const linksContainer = template.getElementsByClassName(ClassNames.RELATED_TOPIC);
                expect(linksContainer.length).toEqual(1);
            });
            it('should NOT include articles if displayArticles is false', () => {
                // Given displayArticles is false
                config.options.displayArticles = false;

                // When building the respective popover templates
                const template = TemplateHelper.buildTemplate(config, eventsHandler);
                expect(template).toBeDefined();

                // Then there should be NO articles
                const articlesContainer = template.getElementsByClassName(ClassNames.NEED_MORE);
                expect(articlesContainer.length).toEqual(0);
                // And links should remain included
                const linksContainer = template.getElementsByClassName(ClassNames.RELATED_TOPIC);
                expect(linksContainer.length).toEqual(1);
            });

            // Display Links
            it('should include links if displayRelatedTopics is true', () => {
                // Given displayRelatedTopics is true
                expect(config.options.displayRelatedTopics).toBeTruthy();

                // When building the respective popover templates
                const template = TemplateHelper.buildTemplate(config, eventsHandler);
                expect(template).toBeDefined();

                // Then there should be links
                const linksContainer = template.getElementsByClassName(ClassNames.RELATED_TOPIC);
                expect(linksContainer.length).toEqual(1);
                const linkElements = linksContainer[0].getElementsByClassName(ClassNames.SECTION_ITEM);
                expect(linkElements.length).toEqual(2);
                // And articles should remain included
                const articlesContainer = template.getElementsByClassName(ClassNames.NEED_MORE);
                expect(articlesContainer.length).toEqual(1);
            });
            it('should NOT include articles if displayArticles is false', () => {
                // Given displayRelatedTopics is false
                config.options.displayRelatedTopics = false;

                // When building the respective popover templates
                const template = TemplateHelper.buildTemplate(config, eventsHandler);

                expect(template).toBeDefined();
                // Then there should be NO links
                const linksContainer = template.getElementsByClassName(ClassNames.RELATED_TOPIC);
                expect(linksContainer.length).toEqual(0);
                // And articles should remain included
                const articlesContainer = template.getElementsByClassName(ClassNames.NEED_MORE);
                expect(articlesContainer.length).toEqual(1);
            });
        });
    });
});
