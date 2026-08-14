import 'styled-components';
import theme from './theme';

// Teach styled-components about the shape of our theme so `({ theme }) => theme.colors.*`
// is fully typed. The theme is provided at runtime by <ThemeProvider> in app/layout.tsx.
type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
