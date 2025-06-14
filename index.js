import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routers/userRoutes.js";
import newsRoutes from "./routers/newsRoutes.js";
import productRoutes from "./routers/productRoutes.js";
import consultationRoutes from "./routers/consultationRoutes.js";
import commentRoutes from "./routers/commentRoutes.js";
import cartRoutes from "./routers/cartRoutes.js";
import orderRoutes from "./routers/orderRoutes.js";
import cors from "cors";

dotenv.config();
const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../LawProjectF/dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../LawProjectF/dist/index.html"));
});

const port = process.env.PORT || 5001;

connectDB();

app.listen(port, () => console.log(`Server is running on port ${port}`));
