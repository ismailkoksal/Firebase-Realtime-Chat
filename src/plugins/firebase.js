import firebaseConfig from "../config/firebase";
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import Vue from "vue";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

Vue.prototype.$db = db;
