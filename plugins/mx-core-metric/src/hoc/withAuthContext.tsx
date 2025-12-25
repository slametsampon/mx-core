// plugins/mx-core-metric/src/hoc/withAuthContext.tsx

'use client';

import { ComponentType } from 'react';
import { useAuthContext } from '../context/AuthContext';

export function withAuthContext<P extends object>(
  Wrapped: ComponentType<P & { authUser?: ReturnType<typeof useAuthContext> }>
) {
  return function WrapperComponent(props: P) {
    const user = useAuthContext();

    return <Wrapped {...props} authUser={user} />;
  };
}
