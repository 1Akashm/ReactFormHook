import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./ReactForm.css";

const ReactForm = () => {
  const { register, handleSubmit, control } = useForm();

  function onSubmit(data) {
    console.log("submitted form", data);
  }

  return (
    <>
      <div className="form-custom">
        <h1>React Hook Form</h1>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-userName">
            <label htmlFor="FirstName">FirstName</label>
            <input
              type="text"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "First is required",
                },
              })}
            />
            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "LastName is required",
                },
              })}
            />
          </div>

          <div className="form-userName">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required",
                },
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid Email",
                },
              })}
            />
          </div>
          <input type="submit" />
        </form>
      </div>

      <DevTool control={control} />
    </>
  );
};

export default ReactForm;
