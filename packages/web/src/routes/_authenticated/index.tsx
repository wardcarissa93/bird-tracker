import { createFileRoute } from '@tanstack/react-router';
import '../../App.css';

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="App">
      <h3>Home Page</h3>
      <p>Add search for birds here if I can figure out the API</p>
    </div>
  );
}