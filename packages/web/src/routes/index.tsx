import { createFileRoute } from '@tanstack/react-router';
import '../App.css';

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="App">
      <p>Search for birds here if I can figure out the API</p>
    </div>
  );
}