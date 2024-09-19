const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error")

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application" })
})

app.use("/api/contacts", contactsRouter)

// handle 404 response 
app.use((req, res, next) => {
    // Kh co route duoc dinh nghia nao khop voi yeu cau
    // Call next() to transfer middleware solving prolem
    return next(new ApiError(404, "Resource not found"));
});

// define error-handling  middleware last after other app.use() and routes calls

app.use((error, req, res, next) => {
    // Middleware xu ly loi tap trung 
    // Trong cac doan xu ly o cac route, goi next(error) se chuyen ve middleware xu ly loi nay
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server errors",
    });
});
module.exports = app;