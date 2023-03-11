import { app } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const firebaseAuth = getAuth(app);

const signInUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    throw error;
    //console.log("firebasAuth::ERROR::SignIn-> ", error);

    // todo redirect user to login page and display the error.
  }
};

const signUserOut = (callback = null) => {
  signOut(firebaseAuth)
    .then(() => {
      console.log("Successfully signed out");
      if (callback !== null) {
        return callback();
      }
      return;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createUserBasic = async (email, password) => {
  //const newUser = null;
  try {
    const newUser = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    console.log(newUser);
  } catch (error) {
    console.error(error);
  }
};

export { signInUser, signUserOut, createUserBasic };
