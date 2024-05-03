import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const LoginPage = () => {
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
      setSubmissionError("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("email")} placeholder="Email" />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        {submissionError && <p className="error-message">{submissionError}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="link-section">
        <p>Dont Have an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
