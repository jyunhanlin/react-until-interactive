# react-until-interactive

Do somethings until user interactive

Somethings like:

- Third party libraries
- Heavy assets
- ...

## Install

```js
npm install jyunhanlin/react-until-interactive
```

## Usage

**Vanilla JS**

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

**React Hook**

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

**React Component**

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
