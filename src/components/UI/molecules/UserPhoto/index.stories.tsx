import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserPhoto from '.';

export default {
  title: 'Atoms/UserPhoto',
  component: UserPhoto,
  argTypes: {},
} as ComponentMeta<typeof UserPhoto>;

const Template: ComponentStory<typeof UserPhoto> = (args) => (
  <UserPhoto {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imgUrl: '',
};
