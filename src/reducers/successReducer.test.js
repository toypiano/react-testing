import { actionTypes } from "../actions/";
import successReducer from "./successReducer";

test("returns the initial state of false when no action is passed", () => {
  const newState = successReducer(undefined, {}); // passing null as 1st arg will set the state to null
  expect(newState).toBe(false);
});
test("returns the state of true upon receiving an action of type `CORRECT_GUESS`", () => {
  const newState = successReducer(undefined, {
    type: actionTypes.CORRECT_GUESS
  });
  expect(newState).toBe(true);
});