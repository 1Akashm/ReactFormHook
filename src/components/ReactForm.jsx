import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ReactForm.css";

const ReactForm = () => {
  const { register, handleSubmit, control, formState, reset } = useForm({
    defaultValues: async () => {
      const randomNum = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${randomNum}`
      );
      const data = await response.json();

      const fullName = data.name.trim().split(" ");
      const last = fullName.slice(1).join(" ");

      return {
        firstName: data.username,
        lastName: last,
        email: data.email,
        social: {
          twitter: "",
          faceBook: "",
        },
        phone: ["", ""],
      };
    },
  });

  // const { errors } = formState;

  const onSubmit = (data) => {
    console.log("submitted form", data);
    toast.success("Form submitted successfully!");
    reset();
  };

  const onError = (errors) => {
    const extractMessages = (obj) => {
      let messages = [];
      for (let key in obj) {
        if (obj[key]?.message) {
          messages.push(obj[key].message);
        } else if (typeof obj[key] === "object") {
          messages = messages.concat(extractMessages(obj[key]));
        }
      }
      return messages;
    };

    const errorMessages = extractMessages(errors);

    if (errorMessages.length === 0) return;

    errorMessages.forEach((msg) => toast.error(msg));
  };

  return (
    <>
      <div className="form-custom">
        <h1>React Hook Form</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="form-userName">
            <label htmlFor="firstName">FirstName</label>
            <input
              type="text"
              {...register("firstName", {
                required: { value: true, message: "First is required" },
                minLength: {
                  value: 3,
                  message: "First Name must be at least 3 letters",
                },
              })}
            />

            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              {...register("lastName", {
                required: { value: true, message: "LastName is required" },
              })}
            />
          </div>

          <div className="form-userName">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid Email",
                },
                validate: {
                  notAdmin: (value) =>
                    value !== "admin@gmail.com" || "Use different email",
                  notDomain: (value) =>
                    !value.endsWith("baddomain.com") || "Domain not supported",
                },
              })}
            />
          </div>

          <div className="form-userName">
            <label htmlFor="channel">Channel</label>
            <input type="text" {...register("channel")} />

            <label htmlFor="twitter">Twitter</label>
            <input type="text" {...register("social.twitter")} />

            <label htmlFor="faceBook">FaceBook</label>
            <input type="text" {...register("social.faceBook")} />
          </div>

          <div className="form-userName">
            <label htmlFor="primary">Primary Phone</label>
            <input
              type="text"
              {...register("phone.0", {
                required: {
                  value: true,
                  message: "Primary Number is required",
                },
                minLength: {
                  value: 10,
                  message: "Number should be at least 10 digits",
                },
              })}
            />
          </div>

          <div className="form-userName">
            <label htmlFor="secondary">Secondary Phone</label>
            <input
              type="text"
              {...register("phone.1", {
                minLength: {
                  value: 10,
                  message: "Number should be at least 10 digits required",
                },
              })}
            />
          </div>

          <input type="submit" />
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <DevTool control={control} />
    </>
  );
};

export default ReactForm;
