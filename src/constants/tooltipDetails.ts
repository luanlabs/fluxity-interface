const tooltipDetails = {
  createStream: {
    endDate:
      'By specifying the end date of your stream, the total amount to be streamed will be calculated',
    startDate: 'You can specify the date you want your stream to start',
    cliffDate:
      'Cliff time specifies the date until which the stream should be withheld. When this date arrives, the accumulated amount from the stream start date until cliff date will be sent at once and the rest of the stream continues normally',
    cancellableStream: 'Turn on this feature if you want to create a cancellable stream',
    flowRate: 'You can specify the rate of token transfer per various intervals',
    walletAddress: 'Identify the address you want to stream tokens to',
    streamingModel:
      'Choose your streaming model. Linear offers a steady flow, while Exponential adapts dynamically',
    summary: 'This section shows an overview of your stream order',
  },
};

export default tooltipDetails;
