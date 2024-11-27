import { getHoursAndMinutesFromNow } from "@/utils/helper";
import DOMPurify from "dompurify";

interface Comment {
  by: string;
  time: number;
  text: string;
}

const CommentForm = () => (
  <div className="story p-4" role="form" aria-labelledby="comment-form-title">
    <h2 id="comment-form-title" className="sr-only">
      Add a comment
    </h2>
    <textarea
      placeholder="Add a comment..."
      className="bg-white comment-textarea w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Add a comment"
    ></textarea>
    <button
      className="btn btn-primary mt-2 bg-orange-500"
      aria-label="Post Comment"
    >
      Post Comment
    </button>
  </div>
);

const Comments = (props: { data: Comment[] }) => {
  const { data = [] } = props;
  // Sort comments by time in descending order
  const sortedComments = [...data].sort((a, b) => b.time - a.time);

  if (data.length === 0) {
    return (
      <div className="story p-4">
        <h3>No Comments Yet</h3>
        <CommentForm />
      </div>
    );
  }
  return (
    <div className="story p-4">
      <strong className="text-lg font-semibold mb-4 block">Comments Section:</strong>
      {sortedComments.map((commentData, index) => (
      <div
        key={index}
        className="comment mb-4 p-4 border border-gray-200 rounded-md shadow-sm"
        role="article"
        aria-labelledby={`comment-${index}-author`}
        aria-describedby={`comment-${index}-time comment-${index}-text`}
      >
        <span id={`comment-${index}-author`} className="block text-sm font-medium text-gray-700">
        <strong>{commentData.by}</strong>
        </span>
        <span id={`comment-${index}-time`} className="block text-xs text-gray-500">
        {getHoursAndMinutesFromNow(commentData.time)}
        </span>
        <p
        id={`comment-${index}-text`}
        className="mt-2 text-gray-800"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(commentData.text),
        }}
        />
      </div>
      ))}
      <CommentForm />
    </div>
  );
};

export default Comments;
