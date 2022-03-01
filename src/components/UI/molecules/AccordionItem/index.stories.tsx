import { ComponentStory, ComponentMeta } from '@storybook/react';
import AccordionItem from '.';

export default {
  title: 'Atoms/AccordionItem',
  component: AccordionItem,
  argTypes: {},
} as ComponentMeta<typeof AccordionItem>;

const Template: ComponentStory<typeof AccordionItem> = (args) => (
  <AccordionItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'How do I find my funds on Polygon?',
  text: 'There are two ways to view your funds on Polygon',
  isActive: true,
  id: '',
};
