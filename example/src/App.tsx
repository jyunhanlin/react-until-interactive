import { untilInteractive, useUntilInteractive, UntilInteractive } from '../../src';

untilInteractive({
  onInteractive: () => {
    console.log('untilInteractive');
  },
});

function App() {
  const { isLoading } = useUntilInteractive({
    onInteractive: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log('useUntilInteractive');
          resolve('');
        }, 1000);
      }),
  });

  return (
    <>
      <div>{isLoading ? 'wait for useUntilInteractive' : 'useUntilInteractive done'}</div>
      <UntilInteractive
        untilInteractiveOptions={{
          onInteractive: () =>
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
