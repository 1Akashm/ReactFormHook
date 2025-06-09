import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./ReactForm.css";

const ReactForm = () => {
  const { register, handleSubmit, control, formState, reset } = useForm();
  // destructuring form
  const { errors } = formState;

  function onSubmit(data) {
    console.log("submitted form", data);
    reset(); // clear the form value on submit
  }

  return (
    <>
      <div className="form-custom">
        <h1>React Hook Form</h1>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-userName">
            <label htmlFor="firstName">FirstName</label>
            <div className="input-error">
              <input
                type="text"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "First is required ",
                  },
                  minLength: {
                    value: 3,
                    message: "First Name must be at least 3 letter",
                  },
                })}
              />
              <p className="error">{errors.firstName?.message}</p>
            </div>
            <label htmlFor="lastName">LastName</label>
            <div className="input-error">
              <input
                type="text"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "LastName is required",
                  },
                })}
              />
              <p className="error">{errors.lastName?.message}</p>
            </div>
          </div>

          <div className="form-userName">
            <label htmlFor="email">Email</label>
            <div className="input-error">
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
                  // custom validation
                  // validate: (fieldValue) => {
                  //   return (
                  //     fieldValue !== "admin@gmail.com" || "Use different email"
                  //   );
                  // },

                  validate: {
                    notAdmin: (fieldValue) => {
                      return (
                        fieldValue !== "admin@gmail.com" ||
                        "use different email"
                      );
                    },
                    notDomain: (fieldValue) => {
                      return (!fieldValue.endsWith("baddomain.com") || "Domain not supported");
                    },
                  },
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>
          </div>
          <input type="submit" />
        </form>
      </div>

      <DevTool control={control} />
    </>
  );
};

export default ReactForm;
