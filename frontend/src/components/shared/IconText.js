import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
  return (
    <Link to={targetLink} className="block">
      <div className="flex items-center justify-start cursor-pointer" onClick={onClick}>
        <div className="px-5 py-2">
          <Icon
            icon={iconName}
            color={active ? "gray" : "white"}
            fontSize={29}
          ></Icon>
        </div>
        <div
          className={`${
            active ? "text-gray-400" : "text-white"
          } text hover:text-gray-400`}
        >
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default IconText;
