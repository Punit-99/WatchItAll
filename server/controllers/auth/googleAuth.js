import * as arctic from "arctic";
import { google } from "../../utils/googleOauth.js";
import User from "../../models/User.js";
import { Profiler } from "react";

export const googleLoginPage = async (req, res) => {
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "email", "profile"];

  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  res.cookie("google_oauth_state", state, {
    secure: false,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 10 * 1000,
  });

  res.cookie("google_oauth_code_verifier", codeVerifier, {
    secure: false,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 10 * 1000,
  });

  return res.redirect(url);
};

export const googleCallback = async (req, res) => {
  try {
    // const { code, state } = req.query;

    const state = req.cookies.google_oauth_state;
    const codeVerifier = req.cookies.google_oauth_code_verifier;
    const code = req.query.code;

    if (!state || !codeVerifier || !code) {
      return res.status(400).send("Missing OAuth parameters");
    }

    const tokens = await google.validateAuthorizationCode(
      code,
      codeVerifier,
      state
    );
    console.log("Tokens:", tokens);
    const user = await google.getUser(tokens.accessToken);

    const claims = arctic.decodeIdToken(tokens.idToken());
    const { sub: googleUserId, name, email } = claims;

    // if user is new
    const checkUser = User.find({
      provider: "google",
      email,
    });

    if (!checkUser) {
      

    }

    res.send(`Hello ${user.name}, Google OAuth successful`);
    // res.redirect("/api/v1/auth/me");
  } catch (err) {
    console.error(err);
    res.status(500).send("OAuth failed");
  }
};
