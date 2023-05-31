# react-until-interactive

Do somethings until user interactive

Somethings like:

- Third party libraries
- Heavy assets
- Complex computation
- Not so important actions
- ...

## Install

```js
npm install jyunhanlin/react-until-interactive
```

## Usage

### Vanilla JS

**example**

```js
// import { UntilInteractiveCore } from 'react-until-interactive/until-interactive-core';
import { UntilInteractiveCore } from 'react-until-interactive';

const untilInteractive = new UntilInteractiveCore({
  events: ['mousemove', 'click', 'scroll'],
  idle: true,
  cache: false,
  threshold: 10,
  interactiveFn: () => {
    // Do something until user interactive
  },
  onInteractive: (result) => {
    // Do something for the result
  },
  onError: (error) => {
    // Do something for the error
  },
});
```

`new UntilInteractiveCore(options: object): void`

**options**

- `events`: the events that trigger `interactiveFn`.
  - type: Array<keyof HTMLElementEventMap>;
  - default: ['mousemove', 'click', 'scroll']
  - optional
- `idle`: use `requestIdleCallback` to trigger `interactiveFn`.
  - type: boolean
  - default: true
  - optional
- `cache`: cache the return value from `interactiveFn`.
  - type: boolean
  - default: false
  - optional
- `threshold`: delay a number to trigger `interactiveFn`.
  - type: number
  - optional
- `interactiveFn`: interactive function.
  - type: () => any;
  - required
- `onInteractive`: on interactive function. take the result from `interactiveFn` as parameter. (optional)
  - type: (result: any) => any;
  - optional
- `onError`: on error function. take the error as parameter. (optional)
  - type: (error: Error) => any;
  - optional

### React Hook

**example**

```js
// import { useUntilInteractive } from 'react-until-interactive/use-until-interactive';
import { useUntilInteractive } from 'react-until-interactive';

const { isLoading } = useUntilInteractive(
  {
    interactiveFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log('useUntilInteractive');
          resolve('');
        }, 1000);
      }),
  },
  [],
);
```

`useUntilInteractive(options, deps)`

**options**

The same options with Vanilla JS

**deps**

- type: React.DependencyList
- optional

### React Component

```jsx
// import { UntilInteractive } from 'react-until-interactive/react-until-interactive';
import { UntilInteractive } from 'react-until-interactive';

<UntilInteractive
  untilInteractiveOptions={{
    interactiveFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log('UntilInteractive');
          resolve('');
        }, 2000);
      }),
  }}
>
  {({ isLoading }) => (isLoading ? 'wait for UntilInteractive' : 'UntilInteractive done')}
</UntilInteractive>;
```
