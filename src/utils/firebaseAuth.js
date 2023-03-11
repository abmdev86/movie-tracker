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
    console.log(error);
  }
};

const signUserOut = (callback) => {
  signOut(firebaseAuth)
    .then(() => {
      console.log("Successfully signed out");

      return callback();
    })
    .catch((error) => {
      console.log(error);
    });
};

const createUserBasic = async (email, password) => {
  //const newUser = null;
  try {
    const response = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const newUser = await response.json();
    console.log(newUser);
  } catch (error) {
    console.error(error);
  }
};

export { signInUser, signUserOut, createUserBasic };
