import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [submissionError, setSubmissionError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setSubmissionError(null);
      console.log("Submitting...", data);
    } catch (error) {
      setSubmissionError("An error occurred during registration.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("username")} placeholder="username" />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>
        <div>
          <input {...register("email")} placeholder="email" />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="password"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        {submissionError && <p className="error-message">{submissionError}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="link-section">
        <p>Have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
