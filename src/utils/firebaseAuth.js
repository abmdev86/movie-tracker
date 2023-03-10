import { app } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseAuth = getAuth(app);

const signInUser = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const createUserBasic = async (email, password) => {
  //const newUser = null;
  try {
    const response = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export { signInUser, createUserBasic };
