/* eslint:disable */
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
import "@testing-library/jest-dom/extend-expect";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
