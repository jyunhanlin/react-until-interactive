import { useState } from 'react';

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

  const [open, setOpen] = useState(true);

  const result = useUntilInteractive(
    {
      once: false,
      interactiveFn: () =>
        new Promise((resolve) => {
          setTimeout(() => {
            console.log('useUntilInteractive 2');
            resolve(Math.random());
          }, 1000);
        }),
    },
    [open],
  );

  console.log(result);

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

      <div>
        <button
          onClick={() => {
            setOpen(!open);
          }}
        >
          toggle
        </button>
        {JSON.stringify(result)}
      </div>
    </>
  );
}

export default App;
