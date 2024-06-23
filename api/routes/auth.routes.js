const express = require("express");
const router = express.Router();

const { getGmailAuthenticationURL } = require("../controller/auth.controller");

router.get("/gmail", getGmailAuthenticationURL);
