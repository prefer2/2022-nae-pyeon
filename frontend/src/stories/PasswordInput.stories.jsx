import React from "react";
import PasswordInput from "@/pages/LoginPage/components/PasswordInput";

export default {
  component: PasswordInput,
  title: "PasswordInput",
};

const Template = (args) => <PasswordInput {...args}></PasswordInput>;

export const Default = Template.bind({});
Default.args = {};
