import { ComponentStory, ComponentMeta } from '@storybook/react';
import AuctionCard from '.';

export default {
  title: 'Atoms/AuctionCard',
  component: AuctionCard,
  argTypes: {},
} as ComponentMeta<typeof AuctionCard>;

const Template: ComponentStory<typeof AuctionCard> = (args) => <AuctionCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: "title", 
    amount: "300 ETH",
    quantity: "1/1",
    bid: "20",
    likes: "100",
    time: "22:14"
};
