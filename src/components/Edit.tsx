import React from "react";
import { useNavigate } from "react-router-dom";
import FormValidation from "./Form/FormValidation";

function Edit() {
  let navigate = useNavigate();
  return (
    <div>
      <FormValidation name="" link="" bucket="" editing={true} index={-1} />
    </div>
  );
}

export default Edit;
