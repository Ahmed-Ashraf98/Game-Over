"use strict"; // Defines that JavaScript code should be executed in "strict mode"

//* ===================[ Import ]===================================

import { Games } from "./games.js";

//* ===================== [ Get Elements ] ============================

const defaultCategory = document.querySelector(".category-link.active");

//* ===================== [ Start Of The App ] =======================

// call the games constructor to start the app
// we pass the defaultCategory to start the app with our default category and display the list of the games in this category
new Games(defaultCategory.id); 



