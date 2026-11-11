import {ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {Providers} from '../../App';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: Providers, ...options});

export * from '@testing-library/react-native';
export {customRender as render};
