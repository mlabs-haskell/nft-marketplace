import { ComponentStory, ComponentMeta } from '@storybook/react';
import ItemDetails from '.';

export default {
  title: 'Atoms/ItemDetails',
  component: ItemDetails,
  argTypes: {},
} as ComponentMeta<typeof ItemDetails>;

const Template: ComponentStory<typeof ItemDetails> = (args) => (
  <ItemDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'SPIRIT SEED - SYNTHETIC',
  saleValue: '250ETH',
  topBidValue: '1.123WETH',
  description:
    'Syntertic Seeds cannot be bought on the primary marktet and can only be earned or gifted. Synthetic Seeds do not belong to any Tessellation Class, cannot be incubated and are not eligible to be ...',
  creatorValue: '10% royalties',
  creatorName: 'Defacer#od',
};
