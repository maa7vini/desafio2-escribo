import mongoose from "mongoose";

async function connectUsers(){
    mongoose.connect(`mongodb+srv://maa7vini:WGpoPwq8KVmsd6TF@cluster0.1p8lvrs.mongodb.net/`)
}

export default connectUsers