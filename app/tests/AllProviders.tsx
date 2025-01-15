import { PropsWithChildren } from 'react';
import { Theme } from '@radix-ui/themes';

const AllProviders = ({ children }: PropsWithChildren) => {
  return (
    <Theme>
      {children}
    </Theme>
  );
};

export default AllProviders;