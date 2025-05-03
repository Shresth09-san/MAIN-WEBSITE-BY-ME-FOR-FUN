import React from 'react';

export const ServiceChoose = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {/* Your component's content here */}
      <h1>Service Choose Component</h1>
      <p>This is the service choose component.</p>
    </div>
  );
});

ServiceChoose.displayName = 'ServiceChoose';
