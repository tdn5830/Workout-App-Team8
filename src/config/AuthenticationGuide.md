
React + Firebase Authentication Guide (By Peter Kim)

This guide explains how to handle Firebase user authentication in a React app. It shows how to check for a user's login status and redirect users to the homepage if they try to access a protected page without being logged in.

# Brief overview
The React project uses authentication with firebase and specifically uses Google auth. This means that Google handles the login and logout flows for us. Upon pressing "Login" a simple popup
from Google login page is displayed. Since Google handles the Authentication for us, the only logic we have to handle is the following: 

1. Checking for Authentication Status

2. Logging out

3. Redirecting Users to the homepage if they access a web page that requires a user account (Like the gym profiles page)


# Guide

1. Checking User Authentication Status 

You can use Firebase's onAuthStateChanged method to track the user's authentication status. Here’s an example:

```javascript

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current authenticated user
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  return (
    <div>
      {user ? <p>Welcome, {user.displayName}</p> : <p>Please log in.</p>}
    </div>
  );
}

```

Notice the very first useState hook sets the current user to null, this means that by default, there is no user associated with the user variable.

The useEffect hook is responsbile for listening to the event of a sign in. When a sign in is succesful, the useEffect hook sets the user variable.

2. Accessing user data and userID

With the user variable now set from our sign-in process, we can access the following properites in our code

1. user.displayName
2. user.email
3. user.uid (unique identifer)
4. user.providerData

The following example shows how we can conditionally render whether or not to display a username or display a login button depending if the user is logged in
This works as a ternary operator. If user is not null, it will render the welcome message. If it is null, it will render the Login button.

```javascript
function HomePage() {
  const [user, setUser] = useState(null);
  

  return (
    <div>
      {user ? <p>Welcome, {user.displayName}</p> : <button>Login.</button>}
    </div>
  );
}

```
3. Protecting routes 

Some of our webpages, like our Gym profiles page, should only be accessed if a user is logged in. Therefore, on protected routes like these
we should check for user authentication status. If the function returns null, then we should redirect the person to our homepage.

Additionally, since retrieving the authentication status from onAuthStateChanged() can take a moment, we display a "Loading Screen" while waiting for the user status. Without this, the app might attempt to access user properties (like user.displayName) before the user is authenticated, which could lead to crashes or incorrect behavior.

Example

```javascript
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

function ProtectedPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading when auth state is determined
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while checking auth
  }

  // If no user is logged in, redirect to the homepage
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Only visible to logged-in users.</p>
    </div>
  );
}

export default ProtectedPage;
```