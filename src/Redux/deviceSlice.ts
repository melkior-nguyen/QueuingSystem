import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../Firebase/config";
import { collection, doc, addDoc } from "firebase/firestore";
import { deviceDataType } from "../type";