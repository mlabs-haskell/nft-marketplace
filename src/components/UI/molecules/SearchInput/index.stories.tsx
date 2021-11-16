import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchInput from '.';

export default {
  title: 'Atoms/SearchInput',
  component: SearchInput,
  argTypes: {},
} as ComponentMeta <typeof SearchInput>

const Template: ComponentStory <typeof SearchInput> = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search"
};
