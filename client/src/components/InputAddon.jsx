import React from "react";

function InputAddon({text, icon, styles}) {
  return (
    <div className={`input-group-prepend`}>
      <span className="input-group-text">
        <i className={`${icon}`} style={styles}></i>
        {text}
      </span>
    </div>
  );
}

export default InputAddon;
