const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");    



module.exports = {mongoose : mongoose, express : express, path : path, hbs : hbs, bcrypt : bcrypt, jwt : jwt}

