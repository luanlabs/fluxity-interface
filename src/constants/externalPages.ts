export const ExternalPages = {
  LANDING: process.env.NEXT_PUBLIC_LANDING || 'https://fluxity.finance',
  DOCUMENTATION: process.env.NEXT_PUBLIC_DOCUMENTATION || 'https://docs.fluxity.finance',
  COMMUNITY: process.env.NEXT_PUBLIC_COMMUNITY || 'https://discord.gg/JnT7KPEuQs',
  FLUXITY_API: process.env.NEXT_PUBLIC_FLUXITY_API || 'https://api.fluxity.finance',
  FRIENDBOT: process.env.NEXT_PUBLIC_FRIENDBOT || 'https://friendbot.stellar.org/?addr=',
  WHITEPAPER:
    process.env.NEXT_PUBLIC_WHITEPAPER ||
    'https://docs.google.com/document/d/1Yh4wI4RR2WK4CN48HRHJMX78OHcVOYST7MN_U2KSm_4/edit?usp=sharing',
};
