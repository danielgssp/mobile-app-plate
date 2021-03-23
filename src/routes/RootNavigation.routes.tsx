import {createRef, MutableRefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const isReadyRef: MutableRefObject<boolean | null> = createRef();

export const navigationRef = createRef<NavigationContainerRef>();

export function navigate(name: string, params = {}) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}
