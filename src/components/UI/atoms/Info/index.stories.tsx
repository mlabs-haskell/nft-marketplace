import { ComponentStory, ComponentMeta } from '@storybook/react';

import Info from '.';

export default {
  title: 'Atoms/Info',
  component: Info,
  argTypes: {},
} as ComponentMeta<typeof Info>;

const Template: ComponentStory<typeof Info> = (args) => <Info {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    infoText: "This is an info"
};
