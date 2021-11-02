import tippy, { Instance } from 'tippy.js';

import { PopoverConfig } from './classes';
import { ConfigHelper } from './helpers/config.helper';
import { PopoverProps } from './classes/popover-props';
import { TargetEventHandler } from './classes/target-event-handler';

export class Popover {
    instance: Instance | null;
    eventHandler: TargetEventHandler | null = null;
    
    constructor(config?: PopoverConfig) {
        this.instance = null;
        this.buildPopover(config);
    }

    /**
     * Creates the popover properties from the input configuration object and the tippy.js instance
     * @param config the received popover configuration
     */
    buildPopover(config: PopoverConfig | null | undefined): Instance | null {
        if (!config || !config.target) {
            return null;
        }
        if (!this.eventHandler) {
            // Create the event handler, to handle custom target events listeners
            this.eventHandler = new TargetEventHandler(config.target);
        }
        const props: PopoverProps | null = ConfigHelper.buildPropsFromConfig(config, this.eventHandler);
        if (!props) {
            this.removeExistingPopover();
            return null;
        }
        if (this.instance) {
            // Update using existing instance
            this.instance.setProps(props);
        } else {
            // Create the popover instance
            this.instance = tippy(config.target, props);
        }
        return this.instance;
    }

    removeExistingPopover(): void {
        if (this.instance && typeof this.instance.destroy === 'function') {
            this.instance.unmount();
            this.instance.destroy();
            this.instance = null;

            this.eventHandler = null;
        }
    }

}
