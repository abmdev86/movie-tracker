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

function onAuthStateChange(callback) {
  return firebaseAuth.onAuthStateChanged((user) => {
    let updatedUser = initialUser;
    if (user) {
      updatedUser = {
        id: user.uid,
        name: user.email,
        token: user.accessToken,
        displayName: user.displayName ?? `${user.email}`,
        isVerified: user.emailVerified,
        photoUrl: user.photoURL,
        online: user.auth.currentUser ? true : false,
      };
      callback((prev) => {
        return {
          ...prev,
          ...updatedUser,
        };
      });
    } else {
      callback({
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
};
