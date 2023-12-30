const FAQContent = [
  {
    title: 'About token streaming',
    questions: [
      {
        question: 'What is token streaming?',
        answer:
          'Token streaming is a continuous, real-time flux of tokens from a sender to a receiver. In this scenario, instead of a lump-sum transfer of money for a task to be done over a time span, the payment becomes distributed across every fraction of time over the span.',
      },
      {
        question: 'What are the major use cases for token streaming?',
        answer:
          'Token streaming is useful to incentivize consistent quality work of a service provider, while the service consumer can still have control over the portion of money not yet sent. Additionally, for subscription-based services, token streaming creates the opportunity to monetize even on seasonal users, creating a pay-as-you-go option without handling financial overhead.',
      },
      {
        question: 'Where is token streaming better than traditional payment solutions?',
        answer:
          'Token streaming makes sense for scenarios where one party pays for services offered by the other one. Reward programs, payrolls, freelancers, and subscription services are among the prominent examples of where token streaming is more favorable.',
      },
    ],
  },
  {
    title: 'Using Fluxity',
    questions: [
      {
        question: 'What do I need to do to start streaming with Fluxity? ',
        answer:
          'First, you need to install the Freighter Wallet extension. Secondly, you need to make sure you add the Futurenet network to your wallet.',
      },
      {
        question: 'What is the Freighter extension, and how can I install it? ',
        answer:
          'Freighter is a wallet extension to interact with Stellar and Soroban. You can install it from the Firefox Add-ons section or Google Chrome Store.',
      },
      {
        question: 'Can I use Fluxity on my mobile phone? ',
        answer:
          'Due to the limitations of the Freighter extension, you can only use Fluxity on a desktop or any other device that supports it. Fluxity will be available on all devices in the near future, so you can leave your email [here] to be there first to hear about it.',
      },
      {
        question: 'How can I get test tokens to try token streaming on Fluxity? ',
        answer:
          'You can receive test tokens to try out Fluxity at no cost by clicking the Claim Test Tokens button from the Home page of the app.',
      },
      {
        question: 'What kinds of tokens can I use in Fluxity? ',
        answer:
          'All ERC20-like tokens available on Soroban or Stellar tokens bridged to Soroban can be used to create streams in Fluxity.',
      },
      {
        question: 'Why can’t I see my test tokens in my wallet? ',
        answer:
          'You need to manually add the test token’s address to your Freighter Wallet. You can find the relevant addresses from the stream details on the Activity History page.',
      },
      {
        question: 'What networks does Fluxity support? ',
        answer: 'Fluxity currently supports standard Futurenet networks supported by Stellar.',
      },
      {
        question: 'Can I stream between different blockchains? ',
        answer: 'No. However, you can use your trustline in Stellar on Futurenet.',
      },
    ],
  },
  {
    title: 'Creating token streams',
    questions: [
      {
        question: 'What is the difference between linear and exponential streaming? ',
        answer:
          'In the linear streaming model, the rate of streaming stays the same throughout the process; however, in the exponential model, the rate increases over time following a certain formula. Note that exponential streaming is not currently available on Fluxity.',
      },
      {
        question: 'What happens if I don’t set a start time for my streams? ',
        answer: 'Without picking a start time, the stream starts immediately after it is created.',
      },
      {
        question: 'What is vesting?',
        answer:
          'Vesting is a type of token streaming with the lump-sum transfer of tokens according to your desired parameters.',
      },
      {
        question: 'What is the application of vesting?',
        answer:
          'Vesting is a method for distributing tokens over time to stakeholders, incentivizing long-term involvement and reducing the risk of market volatility by preventing large, immediate sell-offs.',
      },
      {
        question: 'What happens if I set a cliff time? ',
        answer:
          'After setting a cliff time, the amount of stream from the stream start time will be withheld until the arrival of the cliff time, at which the accrued amount is sent immediately. The remaining of the stream will continue normally. To understand it better, see the figures below.',
      },
      {
        question: 'When do I need to set a cliff time? ',
        answer:
          'Depending on the intended purpose, setting cliff times could be useful for times when the stream is created to provide proof of funds for the sender, but it is withheld until certain criteria are met by the stream receiver until a specific time.',
      },
      {
        question: 'Can I create vested or normal streams without an end time? ',
        answer:
          'It is currently not possible to create a stream without picking an end time for it, but indefinite streams will be possible with Fluxity in the near future.',
      },
      {
        question: 'Do I need to have the total amount of a stream to be able to start streaming? ',
        answer:
          'Yes. The total amount of a vested/normal stream should be available in your wallet when you create it. The amount will be locked in Fluxity’s smart contract after creating the stream as proof of funds.',
      },
      {
        question:
          'What is the advantage of token streaming when all the tokens required for the stream are taken from the wallet in advance?',
        answer:
          'By locking all the required tokens in the contract at once, token streaming acts as proof of funds for the service provider (payee), while the service consumer (payer) would still be in control of their funds.',
      },
      {
        question:
          'How can I stream tokens that are in my wallet but do not show on the token selection window?',
        answer:
          'By entering the token’s contract address, you can stream tokens available in your wallet that do not show on the token selection window.',
      },
      {
        question: 'Where can I track the streams I created?',
        answer:
          'You can navigate to the Activity History page to easily track all the active, pending, and expired streams. Alternatively, you can click on the wallet icon in the app and click Open in Explorer to see your wallet activity. ',
      },
    ],
  },
  {
    title: 'Tracking your activity',
    questions: [
      {
        question: 'How can I see the streams I created?',
        answer:
          'The easiest way is to navigate to the Activity History page and easily find all the past, present, and future streams you created. Additionally, you can see your streams in the Explorer using your wallet address.',
      },
      {
        question:
          'Where can I find a record of token streams sent from another address to my address?',
        answer:
          'You need to navigate to the Activity History page and easily find all the past, present, and future incoming streams. ',
      },
      {
        question: 'How can I cancel a stream that I created?',
        answer:
          'If you enabled the “Cancellable” option for your stream at the time of creating the stream, you could find the desired ongoing or pending stream in the Activity History section and click the Cancel Stream button from the stream details page.',
      },
      {
        question: 'Do assets automatically transfer to the wallet after canceling a stream?',
        answer:
          'Yes. After canceling a stream, the remaining tokens of the sending end and withdrawable tokens for the receiving end will be automatically transferred to their corresponding wallets.',
      },
      {
        question: 'Why can’t I see the streams I receive from another address in my wallet?',
        answer:
          'You can only see the tokens you have withdrawn from the incoming streams. If you still cannot see those tokens, you need to add their address in Freighter manually.',
      },
      {
        question: 'How can I find all the expired streams with withdrawable tokens?',
        answer:
          'All streams with withdrawable tokens are marked with the [coin] icon on the Activity History page. By navigating to the expired tab of the page, you can select the “Unclaimed tokens” filter to find them.',
      },
      {
        question: 'How can I withdraw tokens from streams?',
        answer:
          'By entering the details page of all the active streams you receive, you can click the Withdraw button to transfer the received tokens to your wallet. For expired received streams, of course, the Withdraw button would only work for streams with unclaimed tokens.',
      },
    ],
  },
];

export default FAQContent;
