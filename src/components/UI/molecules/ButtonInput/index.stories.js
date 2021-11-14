import ButtonInput from '.';

export default {
  title: 'Atoms/ButtonInput',
  component: ButtonInput,
  argTypes: {},
}

const Template = (args) => <ButtonInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Join news letter',
};
