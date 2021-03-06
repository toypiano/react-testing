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
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of the data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without error", () => {
  // test passes if /index.js renders App without error
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});
test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

describe("Increment", () => {
  test("renders increment button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "increment-button");
    expect(button.length).toBe(1);
  });

  test("clicking button increments counter display", () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, "increment-button");
    button.simulate("click");

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, "counter-display");
    expect(counterDisplay.text()).toContain(counter + 1); // this will not fail even if we change the display text
  });
});

describe("Decrement", () => {
  test("renders decrement button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "decrement-button");
    expect(button.length).toBe(1);
  });

  test("clicking decrement button decrements counter display", () => {
    const counter = 13;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, "decrement-button");
    button.simulate("click");

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, "counter-display");
    expect(counterDisplay.text()).toContain(counter - 1);
  });

  describe("counter is 0 and decrement is clicked", () => {
    let wrapper;
    beforeEach(() => {
      const counter = 0;
      wrapper = setup(null, { counter });
      const button = findByTestAttr(wrapper, "decrement-button");
      button.simulate("click");
      // to reflect click
      wrapper.update();
    });
    test("counter display can't go below zero", () => {
      const counterDisplay = findByTestAttr(
        wrapper,
        "counter-display"
      );
      expect(counterDisplay.text()).toContain("0");
    });
    test("display an error message when trying to go below zero", () => {
      const errorMessage = findByTestAttr(wrapper, "error-message");
      expect(errorMessage.text()).toMatch(/zero|0/i);
    });
    test("Error should clear on clicking increment button", () => {
      // click increment button after showing error message
      const incButton = findByTestAttr(wrapper, "increment-button");
      incButton.simulate("click");

      // message should be cleared
      const errorMessage = findByTestAttr(wrapper, "error-message");
      expect(errorMessage.text()).toEqual("");
    });
  });
});
