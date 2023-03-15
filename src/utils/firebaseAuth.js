import { app } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { initialUser } from "../contexts/FirebaseAuthContext";

const firebaseAuth = getAuth(app);

const signInUser = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.log(error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    console.log(error);
  }
};

const createUserWithEmail = async (email, password) => {
  try {
    const newUser = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    return newUser;
  } catch (error) {
    console.error(error);
  }
};

const verifyEmail = async (user) => {
  await sendEmailVerification(user);
};

const updateDisplayName = async (value) => {
  try {
    await updateProfile(firebaseAuth.currentUser, {
      displayName: value,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserEmail = async (value) => {
  try {
    await updateEmail(firebaseAuth.currentUser, value);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  let currentUser = firebaseAuth.currentUser;
  if (id === currentUser.uid) {
  }
};

function onAuthStateChange(callback, loginBoolCallback) {
  return firebaseAuth.onAuthStateChanged((user) => {
    let updatedUser = {
      id: null,
      email: "",
      accessToken: "",
      displayName: "Guest",
      emailVerified: false,
      photoURL: "",
    };
    if (user) {
      updatedUser = {
        ...updatedUser,
        id: user.uid,
        email: user.email,
        accessToken: user.accessToken,
        displayName: user.displayName ?? `${user.email}`,
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL,
      };
      callback({ ...updatedUser });
      loginBoolCallback(true);
    } else {
      loginBoolCallback(false);
      return callback({
        ...initialUser,
      });
    }
  });
}

export {
  firebaseAuth,
  signInUser,
  signOutUser,
  createUserWithEmail,
  onAuthStateChange,
  updateDisplayName,
  updateUserEmail,
  verifyEmail,
  deleteUser,
};
