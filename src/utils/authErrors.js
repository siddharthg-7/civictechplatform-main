export function getAuthErrorMessage(error) {
  const code = error?.code || "";
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in or reset your password.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    default:
      return error?.message || "An error occurred. Please try again.";
  }
}
