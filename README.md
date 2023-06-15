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
    // Do something for the result from the interactiveFn
  },
  onError: (error) => {
    // Do something for the error from the interactiveFn
  },
});
```

The `UntilInteractiveCore(options: object)` class

**Parameters**

- options
  - `interactiveFn`: interactive function.
    - type: () => any;
    - required
  - `events`: the events that trigger `interactiveFn`.
    - type: array\<keyof HTMLElementEventMap\>
    - default: ['mousemove', 'click', 'scroll']
  - `idle`: use `requestIdleCallback` to trigger `interactiveFn`.
    - type: boolean
    - default: true
  - `cache`: cache the return value from `interactiveFn`.
    - type: boolean
    - default: false
  - `threshold`: delay a number to trigger `interactiveFn`.
    - type: number
    - optional
  - `onInteractive`: on interactive function. take the result from `interactiveFn` as parameter.
    - type: (result: any) => Promise\<any\>;
    - optional
  - `onError`: on error function. take the error from `interactiveFn` as parameter.
    - type: (error: Error) => void;
    - optional

### React Hook

**example**

```js
// import { useUntilInteractive } from 'react-until-interactive/use-until-interactive';
import { useUntilInteractive } from 'react-until-interactive';

const { isLoading, isError, data } = useUntilInteractive(
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

The `useUntilInteractive(options, deps)` hook

**Parameters**

- options

  The same options with Vanilla JS

- deps
  - type: React.DependencyList
  - optional

**Returns**

The hook expose the object

- isLoading
  - type: boolean
- isError
  - type: boolean
- data: the return value from `interactiveFn`
  - type: any

### React Component

**example**

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

**props**

- untilInteractiveOptions
  - The same options with Vanilla JS
- children
  - type: React.ReactNode | ((args: { isLoading: boolean; isError: boolean }) => React.ReactNode)
  - optional
