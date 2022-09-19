process.env.NODE_ENV = 'test';
import { render, screen } from '@testing-library/react';
import App from './App';
import TextEditor from './components/TextEditor';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const docs = [
  { title: "First", content: "First content" },
  { title: "Second", content: "Second content" },
  { title: "Third", content: "Third content" }
]

const setDocs = () => false;

test('renders title React Text Editor', () => {
  const { container } = render(<App />);

  expect(screen.getByText(/React Text Editor/i)).toBeInTheDocument();
});

test('List should contain three documents', async () => {

  const { getByText } = render(<TextEditor docs={docs} setDocs={setDocs} />);

  const docOne = await getByText('First', { exact: false });
  const docTwo = await getByText('Second', { exact: false });
  const docThree = await getByText('Third', { exact: false });



  expect(docOne).toBeDefined();
  expect(docTwo).toBeDefined();
  expect(docThree).toBeDefined();
});

test('renders save button', () => {
  const { container } = render(<App />);

  expect(screen.getByText(/Save/i)).toBeInTheDocument();
});
