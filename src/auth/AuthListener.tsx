import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../config/firebase';
import { useAppDispatch } from '../store';
import { setUser } from '../store/slices/auth';

/**
 * Mirrors Firebase auth state into the Redux `auth` slice. Renders nothing.
 * If Firebase isn't configured (`auth` is null), resolves immediately as anonymous
 * so the launch gate doesn't hang on its splash.
 */
const AuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth) {
      dispatch(setUser(null));
      return;
    }
    return onAuthStateChanged(auth, (fbUser) => {
      dispatch(
        setUser(
          fbUser
            ? {
                uid: fbUser.uid,
                email: fbUser.email,
                displayName: fbUser.displayName,
              }
            : null,
        ),
      );
    });
  }, [dispatch]);

  return null;
};

export default AuthListener;
