import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bird/$birdId')({
  component: BirdDetailPage,
})

function BirdDetailPage() {
  const { birdId } = Route.useParams();
  console.log(birdId);
  return (
    <div>
      <div>Nando</div>
    </div>
  )
}