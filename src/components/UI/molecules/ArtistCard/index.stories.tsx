import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArtistCard from '.';

export default {
  title: 'Atoms/ArtistCard',
  component: ArtistCard,
  argTypes: {},
} as ComponentMeta<typeof ArtistCard>;

const Template: ComponentStory<typeof ArtistCard> = (args) => (
  <ArtistCard artist={args.artist} />
);

export const Default = Template.bind({});
Default.args = {
  artist: {
    name: 'John English',
    createdAt: new Date(),
    pubKeyHash: 'abcd1234',
    id: 123,
    imagePath: '',
  },
};
