import React from "react";

const GeneralCheckBox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox checkbox-sm border-gray-500"
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-sm border-gray-500"
          />
        </label>
      </div>
    </div>
  );
};

export default GeneralCheckBox;