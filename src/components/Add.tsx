import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormValidation from "./Form/FormValidation";

function Add() {
  useEffect(() => {
    console.log("add page useEffect running");
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <FormValidation name="" link="" bucket="" add={true} index={-1} />
    </div>
  );
}

export default Add;
