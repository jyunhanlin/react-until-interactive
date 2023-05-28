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

`new UntilInteractiveCore(options)`

**Options**

- options.events: the events that trigger `interactiveFn`. (default: ['mousemove', 'click', 'scroll'])
- options.idle: use `requestIdleCallback` to trigger `interactiveFn`. (default: true)
- options.cache: cache the return value from `interactiveFn`. (default: false)
- options.threshold: a number to trigger `interactiveFn`. (sections, optional)
- options.interactiveFn: interactive function (required).
- options.onInteractive: on interactive function. take the result from `interactiveFn` as parameter. (optional)
- options.onError: on error function. take the error as parameter. (optional)

**example**

```js
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

### React Hook

`useUntilInteractive(options, deps)`

**Options**

The same with the options in Vanilla JS

- options.once: just one time hook or get the updated value according to the deps

```js
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

### React Component

```jsx
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
</UntilInteractive>
```
