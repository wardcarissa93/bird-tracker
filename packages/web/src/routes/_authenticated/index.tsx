import { createFileRoute } from '@tanstack/react-router';
import '../../App.css';

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="App">
      <p className="temporary">Search for birds here</p>
    </div>
  );
}