// To connect with your mongoDB database
const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect(
            "mongodb+srv://samirAbbass:0R0r0OEnGxlabjad@cluster0.go1dxyo.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

connectToDatabase();