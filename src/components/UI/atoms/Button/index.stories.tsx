import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '.';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  label: 'Button',
  color: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
  color: 'primary',
};
