import { Icon } from "@iconify/react";

const IconText = ({ iconName, displayText, active }) => {
  return (
    <div className="flex items-center justify-start cursor-pointer">
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
  );
};

export default IconText;
