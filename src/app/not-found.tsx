import { Metadata } from 'next';
import NotFoundContainer from 'src/containers/NotFound';

export const metadata: Metadata = {
  title: 'Fluxity - Page not found',
};

export default function NotFound() {
  return <NotFoundContainer />;
}
