import { PopoverConfig } from '../src/classes/popover-config';
import { IPopoverOptions, Popover, PopoverContent, PopoverLabels, PopoverOptions } from '../src';
import { DEFAULT_LABELS } from '../src/constants/default-labels';

describe('popover component test', () => {
    let config: PopoverConfig;
    let target: HTMLElement;
    let popover: Popover = null;

    const createConfig = (options: IPopoverOptions = new PopoverOptions(),
                          labels: PopoverLabels = DEFAULT_LABELS): PopoverConfig => {
        const content = {
            ...new PopoverContent(),
            title: 'Popover de test',
            description: 'Description du popover de test',
            articles: [{ label: 'How to', url: '' }, { label: 'Example', url: '' }],
            links: [{ label: 'Link 1', url: '' }, { label: 'Link 2', url: '' }]
        };
        const configuration = {
            ...new PopoverConfig(),
            target,
            content,
            labels
        };
        return configuration;
    }

    beforeEach(() => {
        target = document.createElement('div');
        target.id = 'popover-target';
        document.body.insertBefore(target, document.body.firstChild);
        config = createConfig();
        popover = new Popover(config);
    });
    afterEach(function(){
        target.remove();
        target = null;
        popover.instance.destroy();
        popover = null;
        config = null;
    });

    describe('Create popover', () => {
       it('should create the popover', () => {
           expect(document.getElementById('popover-target')).toBeDefined();
           expect(document.getElementById('tippy-1')).toBeNull();
           target.click();

           const tippyElement = document.getElementById('tippy-1');

           expect(tippyElement).toBeDefined();
           expect(tippyElement.getAttribute('style')).toContain('visibility: visible');

           popover.instance.hide();
           expect(tippyElement.getAttribute('style')).toContain('visibility: hidden');
       });

    });
});
