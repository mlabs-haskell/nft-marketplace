import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tab from '.';

export default {
  title: 'Atoms/Tab',
  component: Tab,
  argTypes: {},
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'tag',
};
