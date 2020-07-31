import tippy, { Instance } from 'tippy.js';

import { PopoverConfig } from './classes';
import { TemplateHelper } from './helpers/template.helper';
import { ConfigHelper } from './helpers/config.helper';
import { PopoverProps } from './classes/popover-props';

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

        const props: PopoverProps = {
            content,
            ...ConfigHelper.mapOptionsToProps(config.options)
        };

        // Create the popover instance
        this.instance = tippy(config.target, props);
    }

}
