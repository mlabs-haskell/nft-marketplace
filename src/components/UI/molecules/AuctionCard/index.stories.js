import AuctionCard from '.';

export default {
  title: 'Atoms/AuctionCard',
  component: AuctionCard,
  argTypes: {},
}

const Template = (args) => <AuctionCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: "title", 
    amount: "300 ETH",
    quantity: "1/1",
    bid: "20",
    likes: "100",
    time: "22:14"
};
