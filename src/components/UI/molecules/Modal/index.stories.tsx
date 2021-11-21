import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from '.';
import Button from '../../atoms/Button';

export default {
  title: 'Atoms/Modal',
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    children: <Button label='button'/>,
    title: "hello",
    showModal: true,
};
