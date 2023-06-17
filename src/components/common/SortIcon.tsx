import React from "react";

interface ISortIconProps {
  sort: boolean;
}

export default function SortIcon({ sort }: ISortIconProps) {
  return (
    <>
      {sort ? (
        <i className="fa-solid fa-caret-up" />
      ) : (
        <i className="fa-solid fa-caret-down" />
      )}
    </>
  );
}
