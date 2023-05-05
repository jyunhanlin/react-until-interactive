import { UntilInteractiveCore, useUntilInteractive, UntilInteractive } from '../../src';

new UntilInteractiveCore({
  interactiveFn: () => {
    console.log('UntilInteractiveCore');
  },
});

function App() {
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

  return (
    <>
      <div>{isLoading ? 'wait for useUntilInteractive' : 'useUntilInteractive done'}</div>
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
    </>
  );
}

export default App;
