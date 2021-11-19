import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '.';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  argTypes: {},
} as ComponentMeta <typeof Dropdown>

const Template: ComponentStory <typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
    options: ["English", "Spanish"]
};
