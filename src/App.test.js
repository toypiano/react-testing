import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

configure({ adapter: new Adapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {Object} props - Component props specific to this setup.
 * @param {Any} state - initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />);
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of the data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByAttr = (wrapper, val) => {
  return wrapper.find(`[data-test]=${val}`);
};

test("renders without error", () => {
  // test passes if /index.js renders App without error
  const wrapper = setup();
  const appComponent = wrapper.find("[data-test='component-app']");
  expect(appComponent.length).toBe(1);
});
test("renders increment button", () => {
  const wrapper = setup();
  const button = wrapper.find("[data-test='increment-button']");
  expect(button.length).toBe(1);
});
test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = wrapper.find(
    "[data-test='counter-display']"
  );
  expect(counterDisplay.length).toBe(1);
});
test("counter starts at 0", () => {});
test("clicking button increments counter display", () => {});
