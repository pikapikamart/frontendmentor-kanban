import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DefaultHeader as Header } from '.';


export default {
  title: 'Client/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;


export const Stale = Template.bind({})