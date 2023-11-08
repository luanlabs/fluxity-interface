import { Metadata } from 'next';
import NotFoundContainer from 'src/containers/NotFound';

export const metadata: Metadata = {
  title: 'Fluxity - Page not found',
  description: 'Your command center to create, monitor, and manage your token streams.',
};

export default function NotFound() {
  return <NotFoundContainer />;
}
