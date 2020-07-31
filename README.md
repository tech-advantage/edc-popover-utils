## edc-popover-js

[![Build Status](https://travis-ci.org/tech-advantage/edc-popover-js.svg?branch=master)](https://travis-ci.org/tech-advantage/edc-popover-js)
[![npm version](https://badge.fury.io/js/edc-popover-js.svg)](https://badge.fury.io/js/edc-popover-js)

A lightweight javascript edc popover for displaying the contextual help, based only on [tippy.js](https://atomiks.github.io/tippyjs/).

_This project is meant to be used with **easy doc contents** (aka edc)._

edc is a simple yet powerful tool for agile-like documentation management.

Learn more at [https://www.easydoccontents.com](https://www.easydoccontents.com).

## Dependencies

No extra dependency to install.

## How to use

### Import

You can import this module with `npm` by running:
```bash
npm install edc-popover-js --save
```

Or with `yarn`:
```bash
yarn add edc-popover-js
```

### Setup

To build the popover, you need to provide the following configuration object:

```typescript

/**
 * Configuration for the popover, passed as an input from the host element
 *
 * target: A reference of the target element that will trigger the popover
 * icon: The class name to use for the icon
 * content: The popover's content: the title for the header, the description, articles and links for the body
 * labels: The popover labels
 * options: Popover customizations
 */
export class PopoverConfig {
    target: Element;
    icon: string;
    content: PopoverContent;
    labels: PopoverLabels;
    options?: IPopoverOptions;
}
```

Content is the popover main items: title, description, articles and links: 
```typescript

/**
 * This class will contain the different content parts of the popover
 *
 * title: Will be set to the header
 * description: The description for the brick, under the title
 * articles: list of articles belonging to the brick
 * links: list of related documents, linked to this specific brick
 *
 */
export class PopoverContent {

    constructor(public title = '',
                public description = '',
                public articles: PopoverItem[] = [],
                public links: PopoverItem[] = []) {
    }
}

```
You just can call the constructor, passing the configuration object

```javascript

const myPopoverInstance = new Popover(popoverConfig);

```

Available options are :
| Property | Type | Description | Default |
|---|---|---|---|
| placement | popper.js `Placement` | The popover placement | `bottom` |
| hideOnClick | `boolean` | If true, any click in the document will close the popover | `true` |
| interactive | `boolean` | Determine if we can interact with the popover content | `true` |
| trigger | `string` | Event that will trigger the opening of the popover | `click` |
| customClass | `string` | class name that will be added to the main popover container | undefined |
| appendTo | `parent | Element | (() => Element)` | Element that will receive the popover | `(() => documentation.body)` |
| dark | `boolean` | Use a dark preset theme for the popover  | `false` |

## Tests

### Unit

You can test the project by running:
```bash
npm run test
```
or
```bash
yarn test
```
