// src/app/_layout.test.tsx
import { render } from '@testing-library/react-native';
import RootLayout from './_layout';

// We only need to mock expo-router now
jest.mock('expo-router', () => {
  const MockStack = (props: { children: any }) => <>{props.children}</>;
  MockStack.Screen = (props: { children: any }) => <>{props.children}</>;
  return {
    Stack: MockStack,
  };
});

describe('<RootLayout />', () => {
  it('renders correctly', () => {
    render(<RootLayout />);
  });
});
