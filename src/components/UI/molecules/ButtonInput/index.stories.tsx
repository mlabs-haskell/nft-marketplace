import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonInput from '.';

export default {
  title: 'Atoms/ButtonInput',
  component: ButtonInput,
  argTypes: {},
} as ComponentMeta <typeof ButtonInput>

const Template: ComponentStory <typeof ButtonInput> = (args) => <ButtonInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Join news letter',
};
