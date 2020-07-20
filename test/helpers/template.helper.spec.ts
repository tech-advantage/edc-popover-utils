import { PopoverConfig } from '../../src/classes/popover-config';
import { TemplateHelper } from '../../src/helpers/template.helper';
import { PopoverContent } from '../../src/classes';
import { DEFAULT_LABELS } from '../../src/constants/default-labels';
import { compareStringContent } from '../../src/utils/test.utils';

describe('Template Helper test', () => {
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

    describe('buildTemplate test', () => {
        it('should return the full popover content', () => {
            // Given the popover configuration contains title and all the body elements

            // When building the template for this config
            const content: HTMLDivElement = TemplateHelper.buildTemplate(config);

            // Then it should have the expected content
            const expectedContent =
                `<div class="edc-popover-header">
                    <h3 class="edc-popover-title">${config.content.title}</h3>
                 </div>
                 <div class="edc-popover-body edc-popover-content">
                    <article class="edc-popover-desc">${config.content.description}</article>
                    <div class="edc-popover-section">
                        <div>
                            <h6 class="edc-popover-section-title"><strong><span>${config.labels.articles}</span></strong></h6>
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
                            <h6 class="edc-popover-section-title"><strong><span>${config.labels.links}</span></strong></h6>
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

        it('should return the empty message if no content', () => {
            // Given config has no provided content
            config.content = null;

            // When building the popover template
            const content: HTMLDivElement = TemplateHelper.buildTemplate(config);

            // Then it should contain a div with the coming soon message label
            const expectedContent = `<div class="edc-popover-body edc-popover-content">${config.labels.comingSoon}</div>`;
            expect(content.innerHTML).toEqual(expectedContent);
        });

        it('should return the description and links if articles are empty', () => {
            // Given config has no articles
            config.content.articles = null;

            // When building the popover template
            const content: HTMLDivElement = TemplateHelper.buildTemplate(config);

            // Then it should have the expected content with no articles
            const expectedContent =
                `<div class="edc-popover-header">
                    <h3 class="edc-popover-title">${config.content.title}</h3>
                 </div>
                 <div class="edc-popover-body edc-popover-content">
                    <article class="edc-popover-desc">${config.content.description}</article>
                    <div class="edc-popover-section">
                        <div>
                            <h6 class="edc-popover-section-title"><strong><span>${config.labels.links}</span></strong></h6>
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
            // Given config has no articles
            config.content.links = null;

            // When building the popover template
            const content: HTMLDivElement = TemplateHelper.buildTemplate(config);

            // Then it should have the expected content with no links
            const expectedContent =
                `<div class="edc-popover-header">
                    <h3 class="edc-popover-title">${config.content.title}</h3>
                 </div>
                 <div class="edc-popover-body edc-popover-content">
                    <article class="edc-popover-desc">${config.content.description}</article>
                    <div class="edc-popover-section">
                        <div>
                            <h6 class="edc-popover-section-title"><strong><span>${config.labels.articles}</span></strong></h6>
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
            config.content.articles = null;
            config.content.links = null;

            // When building the popover template
            const content: HTMLDivElement = TemplateHelper.buildTemplate(config);

            // Then it should have the expected content with no links
            const expectedContent =
                `<div class="edc-popover-header">
                    <h3 class="edc-popover-title">${config.content.title}</h3>
                 </div>
                 <div class="edc-popover-body edc-popover-content">
                    <article class="edc-popover-desc">${config.content.description}</article>
                    <div class="edc-popover-section">
                    </div>
                </div>`;

            expect(compareStringContent(content.innerHTML, expectedContent)).toBeTruthy();
        });

        it('should return the articles and links only if description is empty', () => {
            // Given config has no articles and no links
            config.content.description = null;

            // When building the popover template
            const content: HTMLDivElement = TemplateHelper.buildTemplate(config);

            // Then it should have the expected content with no article description element
            const expectedContent =
                `<div class="edc-popover-header">
                    <h3 class="edc-popover-title">${config.content.title}</h3>
                 </div>
                 <div class="edc-popover-body edc-popover-content">
                    <div class="edc-popover-section">
                        <div>
                            <h6 class="edc-popover-section-title"><strong><span>${config.labels.articles}</span></strong></h6>
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
                            <h6 class="edc-popover-section-title"><strong><span>${config.labels.links}</span></strong></h6>
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
            const configNullTitle = Object.assign(config, { content: Object.assign(config.content, { title: null })});
            const configEmptyTitle = Object.assign(config, { content: Object.assign(config.content, { title: '' })});
            const configSpaceOnlyTitle = Object.assign(config, { content: Object.assign(config.content, { title: '    ' })});

            // When building the respective popover templates
            const nullTitleTemplate = TemplateHelper.buildTemplate(configNullTitle);
            const emptyTitleTemplate = TemplateHelper.buildTemplate(configEmptyTitle);
            const spaceOnlyTitleTemplate = TemplateHelper.buildTemplate(configSpaceOnlyTitle);

            // Then it should return the popover with no header
            const expectedTemplate =
                `<div class="edc-popover-body edc-popover-content">
                    <article class="edc-popover-desc">${config.content.description}</article>
                    <div class="edc-popover-section">
                        <div>
                            <h6 class="edc-popover-section-title"><strong><span>${config.labels.articles}</span></strong></h6>
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
                            <h6 class="edc-popover-section-title"><strong><span>${config.labels.links}</span></strong></h6>
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
});
