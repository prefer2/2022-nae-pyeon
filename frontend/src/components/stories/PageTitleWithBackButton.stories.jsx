import React from "react";
import { MemoryRouter } from "react-router-dom";
import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";

export default {
  component: PageTitleWithBackButton,
  title: "PageTitleWithBackButton",
};

const Template = (args) => (
  <MemoryRouter initialEntries={["/teams/1"]}>
    <PageTitleWithBackButton {...args}></PageTitleWithBackButton>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  children: "모임 추가하기",
};
