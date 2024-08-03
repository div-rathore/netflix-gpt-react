import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [validationError, setValidationError] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    //form validations
    const errMessage = checkValidData(
      email.current.value,
      password.current.value
    );
    // console.log(errMessage);
    setValidationError(errMessage);
    //if the email or pwd is not valid then dont execute this function further
    if (errMessage) return;

    //Allow sign in or sign up
    if (!isSignInForm) {
      //sign up code
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setValidationError(error.message)
            });

          //   console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationError(errorMessage);
          console.log(errorCode + " - " + errorMessage);
        });
    } else {
      //sign in code
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationError(errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_medium.jpg"
          alt="banner"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-opacity-75 bg-black w-3/12 my-40 mx-auto right-0 left-0 text-white"
      >
        <h2 className="font-bold text-3xl py-4">
          {isSignInForm ? `Sign In` : `Sign Up`}
        </h2>
        {!isSignInForm && (
          <input
            type="text"
            placeholder=" Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            ref={name}
          />
        )}

        <input
          type="text"
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          ref={password}
        />
        <p className="text-red-500 my-2 font-bold text-lg p-2">
          {validationError}
        </p>

        <button
          className="p-4 my-4 bg-red-700 rounded-lg  w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? `Sign In` : `Sign Up`}
        </button>

        <p className="p-4 my-3 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? `Don't have an accound? Sign Up Now`
            : `Already an user? Sign In Now`}
        </p>
      </form>
    </div>
  );
};

export default Login;
