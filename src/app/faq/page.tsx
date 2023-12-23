import React from 'react';

import { Metadata } from 'next';
import FaqContainer from 'src/containers/FaqContainer';

export const metadata: Metadata = {
  title: 'Fluxity - FAQs',
  description:
    'Find answers to common questions about token streaming on the Stellar network with Fluxity’s detailed FAQ section.',
  keywords: 'FAQ, questions, token streaming, help, support, Stellar network',
};

const Faq = () => {
  return <FaqContainer />;
};

export default Faq;
