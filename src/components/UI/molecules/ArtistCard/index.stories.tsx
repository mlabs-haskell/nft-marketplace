import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArtistCard from '.';

export default {
  title: 'Atoms/ArtistCard',
  component: ArtistCard,
  argTypes: {},
} as ComponentMeta<typeof ArtistCard>;

const Template: ComponentStory<typeof ArtistCard> = (args) => (
  <ArtistCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'John English',
};
