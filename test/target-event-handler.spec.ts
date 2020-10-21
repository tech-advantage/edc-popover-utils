import { TargetEventHandler } from '../src/classes';
import { AttributeNames } from '../src/constants/template.constants';

describe('TargetEventHandler test', () => {
    let targetHandler: TargetEventHandler;

    beforeEach(() => {
        const target = document.createElement('span');
        targetHandler = new TargetEventHandler(target);
    });

    describe('updateClickHandler', () => {

        it('should add the click listener', () => {
            // Given targetHandler is initialized and displayPopover is true and url is defined
            expect(targetHandler.target).toBeDefined();
            spyOn(targetHandler.target, 'addEventListener');

            const displayPopover = false;
            const helpUrl = 'help/url';

            // When updating
            targetHandler.updateClickHandler(displayPopover, helpUrl);

            // Then data url attribute should have been set to help url value and event listener should have been attached
            expect(targetHandler.target.getAttribute(AttributeNames.DATA_URL)).toEqual(helpUrl);
            expect(targetHandler.target.addEventListener).toHaveBeenCalledTimes(1);
        });

        it('should NOT add the click listener if target is NOT defined', () => {
            // Given targetHandler is null
            spyOn(targetHandler, 'removeEventListener');
            targetHandler.target = null;

            const displayPopover = false;
            const helpUrl = 'help/url';

            // When updating
            targetHandler.updateClickHandler(displayPopover, helpUrl);

            // Then data url attribute should NOT have been set and no other function should have been called
            expect(targetHandler.target).toBeNull();
            expect(targetHandler.removeEventListener).toHaveBeenCalledTimes(0);
        });

        it('should remove element attributes and listener if display popover is true', () => {
            // Given targetHandler is initialized and displayPopover is true and url is defined
            expect(targetHandler.target).toBeDefined();
            spyOn(targetHandler.target, 'addEventListener');
            spyOn(targetHandler.target, 'removeEventListener');
            spyOn(targetHandler.target, 'removeAttribute');

            const displayPopover = true;
            const helpUrl = 'help/url';

            // When updating
            targetHandler.updateClickHandler(displayPopover, helpUrl);

            // Then data url attribute should NOT have been set and no other function should have been called
            expect(targetHandler.target.removeAttribute).toHaveBeenCalledTimes(1);
            expect(targetHandler.target.removeEventListener).toHaveBeenCalledTimes(1);
        });

        it('should remove element attributes and listener if url is empty', () => {
            // Given targetHandler is initialized and displayPopover is false and url is empty
            expect(targetHandler.target).toBeDefined();
            spyOn(targetHandler.target, 'addEventListener');
            spyOn(targetHandler.target, 'removeEventListener');
            spyOn(targetHandler.target, 'removeAttribute');

            const displayPopover = false;
            const helpUrl = '';

            // When updating
            targetHandler.updateClickHandler(displayPopover, helpUrl);

            // Then data url attribute should NOT have been set and no other function should have been called
            expect(targetHandler.target.removeAttribute).toHaveBeenCalledWith(AttributeNames.DATA_URL);
            expect(targetHandler.target.removeEventListener).toHaveBeenCalledTimes(1);
        });

    });
});
