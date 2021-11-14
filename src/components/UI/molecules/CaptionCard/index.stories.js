import CaptionCard from '.';

export default {
  title: 'Atoms/CaptionCard',
  component: CaptionCard,
  argTypes: {},
}

const Template = (args) => <CaptionCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'John English',
  title: 'hello'
};
