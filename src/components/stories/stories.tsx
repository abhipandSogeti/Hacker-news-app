import { useLocation, useParams } from "react-router-dom";
import useFetchData from "../../hooks/fetchData";
import Story from "../story/story";
import { useEffect, useState } from "react";

interface StoryData {
  id: number;
  title: string;
  url: string;
  time: number;
  score: number;
  by: string;
  descendants: number;
}

/**
 * The `Stories` component fetches and displays a list of stories based on the URL parameters.
 * It uses the `useParams` hook to get the `storyType` and `adminType` from the URL.
 * Depending on these parameters, it fetches the appropriate stories using the `useFetchData` hook.
 * The stories are then sorted by time in descending order and displayed in a list.
 *
 * @component
 * @returns  The rendered component.
 *
 * @hook
 * @name useParams
 * @description Retrieves the `storyType` and `adminType` from the URL parameters.
 *
 * @hook
 * @name useFetchData
 * @description Fetches the stories data based on the `storyType` or `adminType`.
 *
 * @typedef {Object} StoryData
 * @property {number} id - The unique identifier of the story.
 * @property {number} time - The timestamp of the story.
 *
 * @typedef {Object} FetchDataResult
 * @property {StoryData[]} data - The fetched stories data.
 * @property {boolean} loading - The loading state.
 * @property {string} error - The error message, if any.
 *
 * @returns JSX The rendered component, which includes a loading spinner, an error message, or the list of stories.
 */

const Stories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");

    return () => {
      // any cleanup
    };
  }, [location]);

  const { storyType, adminType } = useParams<{
    storyType: string;
    adminType: string;
  }>();

  const { data, error, loading } = useFetchData(
    storyType || (adminType ? "best" : "top"),
    false,
    ""
  ); // TODO : refactor params soon

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const sortedStories = [...(data as StoryData[])].sort(
    (a, b) => b.time - a.time
  );

  const filteredStories = [...(sortedStories as StoryData[])].filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search stories..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 p-2 border bg-white border-gray-300 rounded-md w-full"
      />
      <ul className="divide-y divide-gray-200 p-1">
        {filteredStories &&
          filteredStories.map((story: any) => (
            <Story key={story.id} story={story} />
          ))}
      </ul>
    </div>
  );
};

export default Stories;
