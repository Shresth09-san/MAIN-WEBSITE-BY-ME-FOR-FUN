// import React, { useState } from "react";
// import { sendSignInLinkToEmail } from "firebase/auth";
// import { auth } from "../Firebase/firebaseConfig"; // Adjust the import path as necessary

// const EmailAuth = () => {
//   const [email, setEmail] = useState("");

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const sendOTP = async () => {
//     if (!email) {
//       alert("Please enter an email address!");
//       return;
//     }
  
//     try {
//       // Step 1: Check if user exists in the database
//       const response = await fetch(`${API_BASE_URL}/api/auth/getemailotp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
  
//       const data = await response.json();
//       console.log(data)
  
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to verify user");
//       }
  
//       // Step 2: If user exists, proceed with Firebase OTP
//       const actionCodeSettings = {
//         url: "http://localhost:8080/getEmail", // Update to production URL later
//         handleCodeInApp: true,
//       };
  
//       await sendSignInLinkToEmail(auth, email, actionCodeSettings);
//       window.localStorage.setItem("emailForSignIn", email);
//       alert("OTP link sent to your email!");
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       alert(error.message);
//     }
//   };
  

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
//           Email OTP Authentication
//         </h2>
//         <div className="space-y-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={sendOTP}
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
//           >
//             Send OTP
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailAuth;
