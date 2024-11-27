import { getHoursAndMinutesFromNow } from "@/utils/helper";
import { useParams, useNavigate} from "react-router-dom";

 // TODO : refactor interface in 1 file
interface LinkProps {
  url: string;
  title: string;
  id: number;

  storyType?: string;
  story?: any;
  navigate: any;
}

interface StoryProps {
  story: {
    id: number;
    by: string;
    title: string;
    kids: number[];
    time: number;
    url: string;
    score: number;

    story: any;
    storyType?: string;
  };
}

const detailsHandler = (story: StoryProps['story'], navigate: (path?: string) => void, storyType: string, id: number) => {
  return navigate(`/stories/${storyType}/${id}`,{state: story});
};

const LinkElement = ({ title, id, storyType,story, navigate}: LinkProps) => (
  <button
    className="text-black-500 bg-transparent font-bold text-xl p-0 hover: border-none outline-none focus:outline-none"
    onClick={() => detailsHandler(story, navigate, storyType, id)}
    aria-label={`News heading: ${title}`}
  >
    {title}
  </button>
);


const Story = ({
  story: { id, by, title, kids, time, url, score },
}: StoryProps) => {
  const formattedDate = getHoursAndMinutesFromNow(time);
  const { storyType } = useParams<{ storyType: string }>();
  const navigate = useNavigate();

  const storyData = { id, by, title, kids, time, url, score };

  return (
    <div className="story p-4" aria-labelledby={`story-title-${id}`}>
      <div className="story-title" id={`story-title-${id}`}>
        <LinkElement
          url={url}
          title={title}
          id={id}
          story={storyData}
          storyType={storyType}
          navigate={navigate}
        />
      </div>
      <div className="story-info mt-2 flex flex-row text-gray-700">
        <span className="text-sm mr-1">{`${score} points `}</span>
        <span className="text-sm mr-1">
          {`by `}<strong className="text-black-500" aria-label={`View comments for ${title}`}>{by}</strong>
        </span> 
        <span className="text-sm mr-1">{formattedDate}</span>
        <span className="text-sm mr-1">
        <span className="text-black-500 font-bold" aria-label={`View comments for ${title}`}> {`${kids && kids.length > 0 ? kids.length : 0} comments`} </span>
        </span>
      </div>
    </div>
  );
};

export default Story;

