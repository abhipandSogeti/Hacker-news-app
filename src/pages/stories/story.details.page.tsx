/**
 * StoryDetailsPage component fetches and displays the details of a story along with its comments.
 *
 * This component uses the `useParams` hook from `react-router-dom` to extract the `storyType` and `id` parameters from the URL.
 * It also uses the `useLocation` hook to access the current location object, which contains the state passed from the previous route.
 *
 * The `useFetchData` custom hook is used to fetch the story data based on the `storyType` and `id`. The hook returns the loading state, any error encountered, and the fetched data.
 *
 * The component handles three states:
 * 1. Loading: Displays a loading spinner while the data is being fetched.
 * 2. Error: Displays an error message if there was an error fetching the data.
 * 3. Success: Displays the story details and its comments once the data is successfully fetched.
 *
 * @returns The rendered components.
 */
import Comments from "@/components/comments/comments";
import { useParams, useLocation } from "react-router-dom";
import Story from "@/components/story/story";
import useFetchData from "../../../src/hooks/fetchData";

interface CommentData {
  id: string;
  text: string;
  by: string;
  time: number;
}

interface StoryData {
  comments: CommentData[];
}

export function StoryDetailsPage() {
  const { storyType, id } = useParams<{ storyType: string; id: string }>();
  const location = useLocation();

  const {
    loading,
    error,
    data,
  }: { loading: boolean; error: string | null; data: StoryData[] } =
    useFetchData(storyType || "top", true, id);

  const comment: CommentData[] =
    data && data.length > 0 ? data[0].comments : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <Story story={location.state} />
        <a
          href={location.state.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 underline pl-4 font-bold"
          aria-label={`Read more about ${location.state.title}`}
        >
          Read the full story here: {location.state.url}
        </a>
        <Comments data={comment} aria-label="Comments section" />
      </div>
    </>
  );
}
