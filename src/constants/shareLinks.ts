import facebookLogo from '/public/images/social Network/facebook.svg';
import telegramLogo from '/public/images/social Network/telegram.svg';
import xLogo from '/public/images/social Network/X.svg';
import emailLogo from '/public/images/social Network/email.png';

const shareLinks = (id: string) => {
  const subjectEmail = encodeURIComponent('Fluxity');
  const url = `https://app.fluxity.finance/lockup/${id}`;
  const message = encodeURIComponent(`Stream #${id} in Fluxity`);
  const body = encodeURIComponent(`Stream #${id} in Fluxity` + '\n' + url);

  const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const telegramShareLink = `https://telegram.me/share/url?url=${url}&text=${message}`;
  const twitterShareLink = `https://twitter.com/intent/tweet?url=${url}&text=${message}`;
  const mailtoLink = `mailto:?subject=${subjectEmail}&body=${body}`;
  return [
    {
      name: 'Telegram',
      href: telegramShareLink,
      alt: 'Telegram',
      image: telegramLogo,
    },
    {
      name: 'Facebook',
      href: facebookShareLink,
      alt: 'Facebook',
      image: facebookLogo,
    },
    {
      name: 'Email',
      href: mailtoLink,
      alt: 'Email',
      image: emailLogo,
    },
    {
      name: 'X',
      href: twitterShareLink,
      alt: 'X',
      image: xLogo,
    },
  ];
};

export default shareLinks;
