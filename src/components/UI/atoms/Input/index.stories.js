import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from '.';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {},
}

const Template = (args) => <Input {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  label: 'text',
};
