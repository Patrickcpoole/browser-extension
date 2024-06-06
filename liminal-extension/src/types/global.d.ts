export {};

declare global {
  interface Window {
    Chat: React.FC;
    React: typeof import('react');
    ReactDOM: typeof import('react-dom');
  }
}
