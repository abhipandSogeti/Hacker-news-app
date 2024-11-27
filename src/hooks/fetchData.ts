import { getComments, getStories } from "@/utils/story-service";
import { useState, useEffect } from "react";

export default function useFetchData(
  storyType: string,
  storiesWithComments: boolean,
  storyId : string,
) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

     /**
     * @function fetchData Fetches data based on the provided story type and whether to include comments.
     *
     * @param {string} storyType - The type of story to fetch. This could be a category or tag that identifies the type of stories to retrieve.
     * @param {boolean} storiesWithComments - A flag indicating whether to fetch stories with their associated comments. 
     *                                         If true, the function will fetch comments for the stories; otherwise, it will fetch only the stories.
     *
     * @returns {Promise<void>} - A promise that resolves when the data fetching is complete.
     *
     * @throws {Error} - Throws an error if the data fetching fails.
     *
     * @remarks
     * This function sets the loading state to true at the beginning of the fetch operation and resets it to false once the operation is complete,
     * regardless of whether it succeeded or failed. If an error occurs during the fetch, it sets the error state with the caught error.
     *
     */
  useEffect(() => {
    async function fetchData(storyType: string, storiesWithComments: boolean,) {
      try {
        setLoading(true);
        const results = storiesWithComments
          ? await getComments(storyType, storyId)
          : await getStories(storyType);
        setData(results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData(storyType, storiesWithComments, );
  }, [storyType, storiesWithComments, storyId]);

  return { data, error, loading };
}
