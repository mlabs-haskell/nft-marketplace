import { ComponentStory, ComponentMeta } from '@storybook/react';

import Box from '.';
import Button from '../Button'

export default {
  title: 'Atoms/Box',
  component: Box,
  argTypes: {},
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const Default = Template.bind({});

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: <Button label="Button" />,
};
