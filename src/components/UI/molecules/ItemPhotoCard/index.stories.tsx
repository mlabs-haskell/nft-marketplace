import { ComponentStory, ComponentMeta } from '@storybook/react';
import ItemPhotoCard from '.';

export default {
  title: 'Atoms/ItemPhotoCard',
  component: ItemPhotoCard,
  argTypes: {},
} as ComponentMeta<typeof ItemPhotoCard>;

const Template: ComponentStory<typeof ItemPhotoCard> = (args) => (
  <ItemPhotoCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imgUrl: '',
  likeCount: '0',
};
