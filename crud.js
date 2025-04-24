const express = require('express')
const mongoose = require('mongoose')
const app = express();

app.use(express.json())
const StudentSchema = mongoose.Schema({
    name:String,
    age:Number,
    Subjects:Array
})

const StudentModel = mongoose.model('Student',StudentSchema)

app.get("/find",async(request,response) => {
    try {
        let studentName = request.query.name;
        await mongoose.connect("mongodb://localhost:27017/My-DB", {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        const result = await StudentModel.find({name:studentName})
        
        response.status(200).send(result)

    } catch(error) {
        response.status(500).send("Something went wrong")

    }

    finally {
        await mongoose.disconnect();

    }
})

app.post("/insert",async(request,response) => {
    try {
        const studentName = request.body.name;
        const age = request.body.age;
        const Subjects = request.body.subjects;

        await mongoose.connect("mongodb://localhost:27017/My-DB", {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        const result = await StudentModel.insertOne({
            "name":studentName,"age":age,"Subjects":Subjects
        })
        response.status(200).send("Inserted successfully...!")


    } catch(error) {

        response.status(500).send("Something went wrong")
    }

    finally {
        await mongoose.disconnect();

    }
})

app.put("/update",async(request,response) => {
    try {
        const studentName = request.body.name;
        const age = request.body.age;

        await mongoose.connect("mongodb://localhost:27017/My-DB", {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        const result = await StudentModel.updateOne(
            {"name":studentName},
            {$set:{"age":age}}
        )
        response.status(200).send("Updated successfully...!")
    } catch(error) {
        response.status(500).send("Something went wrong")

    }

    finally {
        await mongoose.disconnect();

    }
})

app.delete("/delete",async(request,response) => {
    try {
        const studentName = request.body.name;

        await mongoose.connect("mongodb://localhost:27017/My-DB", {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        const result = await StudentModel.deleteOne({
            "name":studentName
        })
        response.status(200).send("Deleted successfully...!")

    } catch(error) {
        response.status(500).send("Something went wrong")

    }

    finally {
        await mongoose.disconnect();
    }
})

const PORT = 3000;
app.listen(PORT,()=> console.log("Port running on http://localhost:3000"))