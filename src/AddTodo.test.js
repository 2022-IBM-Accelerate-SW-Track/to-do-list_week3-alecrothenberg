import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const dueDate = "02/28/2023";

  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const arbDate = "02/28/2023";
    
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: arbDate}});
  fireEvent.click(element);

  const check = screen.getByText(/Test/i);
  expect(check).toBeInTheDocument();
  
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const dueDate = "02/28/2023";

  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
    
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const checkDate = screen.getByText(new RegExp("2/28/2023", "i"));
  expect(checkDate).toBeInTheDocument();




 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const dueDate = "02/28/2023";

  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
    
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.click(element);

  const check = screen.getByText(/Test/i);
  expect(check).toBeInTheDocument();

 });



 test('test that App component can be deleted thru checkbox', async () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const dueDate = "02/28/2023";

  fireEvent.change(inputTask, { target: { value: "Test1"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  
  
  
  const checkBox = screen.getByRole('checkbox');
  fireEvent.click(checkBox);

  const noTodo = screen.getByText(/You have no todo's left/i)

  expect(noTodo).toBeInTheDocument();

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const oldDate = "02/28/2002";
  const testInput = "Old Date";

  fireEvent.change(inputTask, { target: { value: testInput}});
  fireEvent.change(inputDate, { target: { value: oldDate}});

  fireEvent.click(element);

  const futureDate = "02/28/2030";
  const secTestInput = "Future Date";

  fireEvent.change(inputTask, { target: { value: secTestInput}});
  fireEvent.change(inputDate, { target: { value: futureDate}});

  const historyCheck = screen.getByTestId(/Old Date/i).style.background;
  //const futureCheck = screen.getByTestId(/Future Date/i).style.background;

  expect(historyCheck).toBe("rgb(255, 0, 255)");



 });
