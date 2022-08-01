import React from "react";
import MessageForm from "@/pages/RollingpaperPage/components/MessageForm";

export default {
  component: MessageForm,
  title: "RollingpaperPage/MessageForm",
};

const Template = (args) => <MessageForm {...args}></MessageForm>;

export const Default = Template.bind({});
Default.args = {};
