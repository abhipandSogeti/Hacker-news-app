import { BASE_API_URL } from "./constants";

interface Story {
  id: number;
  title: string;
  url: string;
  kids?: number[];
  deleted?: boolean;
}

/**
 * Fetches a story or comment by its ID from the API endpoint.
 *
 * @param {number} id - The ID of the story or comment to fetch.
 * @returns {Promise<Story | undefined>} A promise that resolves to the fetched story or comment, or undefined if an error occurs.
 * @catch Will log an error message if the fetch operation fails.
 */
const getStoryOrComment = async (id: number): Promise<Story | undefined> => {
  try {
    const response = await fetch(`${BASE_API_URL}/item/${id}.json`);
    const story: Story = await response.json();
    if (!story) {
      return undefined;
    }
    return story;
  } catch (error) {
    console.log(`Error while getting list of stories.${error}`);
  }
};

/**
 * Fetches a list of stories of a given type.
 *
 * @param {string} type - The type of stories to fetch (e.g., 'top', 'new', 'best').
 * @returns {Promise<Story[]>} A promise that resolves to an array of Story objects.
 *
 * @catch Will log an error message if the fetch operation fails and return an empty array.
 */
export const getStories = async (type: string): Promise<Story[]> => {
  try {
    const response = await fetch(`${BASE_API_URL}/${type}stories.json`);
    const storyIds: number[] = await response.json();
    const stories: (Story)[] = await Promise.all(
      storyIds.slice(0, 15).map(getStoryOrComment)
    );
    // Filter out undefined values
    const validStories: Story[] = stories.filter((story) => story !== undefined);

    return validStories;
  } catch (error) {
    console.log(
      `Error while getting list of stories/ Stories With Comments.${error}`
    );
    return [];
  }
};

/**
 * Retrieves comments for a specific story based on the provided type and id.
 *
 * @param {string} type - The type of stories to retrieve.
 * @param {string} id - The id of the story for which comments are to be retrieved.
 * @returns {Promise<Story[]>} A promise that resolves to an array of stories with their comments.
 *
 * @catch Will log an error message if there is an issue while retrieving comments.
 */
export const getComments = async (
  type: string,
  id: string
): Promise<Story[]> => {
  try {
    const stories: Story[] = await getStories(type);
    const storyComments = stories
      .filter((story) => story.id === Number(id))
      .map(async (story) => {
        if (story.kids && story.id === Number(id)) {
          const comments = await Promise.all(
            story.kids.map(async (itemId) => await getStoryOrComment(itemId))
          );
          return {
            ...story,
            comments: comments.filter(
              (comment) => comment !== undefined && !comment.deleted
            ),
          };
        }
        return story;
      });

    const resolvedComments: Story[] = await Promise.all(storyComments);
    return resolvedComments;
  } catch (error) {
    console.log(`Error while getting comments.${error}`);
    return [];
  }
};
