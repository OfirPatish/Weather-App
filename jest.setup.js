/* eslint-disable @typescript-eslint/no-explicit-any */
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock motion components for testing
jest.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    input: (props) => <input {...props} />,
    button: (props) => <button {...props} />,
  },
  AnimatePresence: ({ children }) => children,
  useMotionValue: () => ({ get: () => 0, set: jest.fn() }),
  useSpring: (value) => value,
  useTransform: (value) => value,
  animate: jest.fn(() => ({
    stop: jest.fn(),
  })),
}));

