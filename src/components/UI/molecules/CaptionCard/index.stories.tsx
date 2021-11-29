import { ComponentStory, ComponentMeta } from '@storybook/react';
import CaptionCard from '.';

export default {
  title: 'Atoms/CaptionCard',
  component: CaptionCard,
  argTypes: {},
} as ComponentMeta<typeof CaptionCard>;

const Template: ComponentStory<typeof CaptionCard> = (args) => (
  <CaptionCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'John English',
  title: 'hello',
};
