import React from "react";
import { TitleText } from "../types/types";


const Title: React.FC<TitleText> = ({ titleText,classNames }: TitleText) =>  {
  return (
    <div className={`title ${classNames}`}>{titleText}</div>
  );
}

export default Title;