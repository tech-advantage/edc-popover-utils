import tippy, { Instance } from 'tippy.js';

import { PopoverConfig, PopoverOptions } from './classes';
import { TemplateHelper } from './helpers/template.helper';
import { ConfigHelper } from './helpers/config.helper';

export class Popover {
    instance: Instance;
    
    constructor(public config: PopoverConfig) {
        if (!ConfigHelper.checkConfig(config)) {
            return null;
        }
        this.initPopover(config);
    }

    initPopover(config: PopoverConfig): void {
        const content: HTMLDivElement = TemplateHelper.buildTemplate(config);

        // Override default options with the ones passed as input
        const options: PopoverOptions = Object.assign(new PopoverOptions(), config.options);

        // Create the popover instance
        this.instance = tippy(config.target, {
            content,
            ...options
        });
    }

}
