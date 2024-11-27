import Stories from "../../components/stories/stories";
import { useParams } from "react-router-dom";

export function StoriesPage() {
  const { storyType } = useParams();

  return <>{storyType ? <Stories /> : <div>No story selected</div>}</>;
}
