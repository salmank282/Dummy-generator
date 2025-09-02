import express from "express";
import mongoose from "mongoose";
import { Employee } from "./models/employee.js";
import cors from "cors";
import ejs from "ejs";

const app = express();
const port = 3000;

// app.use(cors({
//     origin:"http://127.0.0.1:3000",
//     methods: ["GET", "POST", "DELETE"],
// }))

app.set('view engine','ejs');

app.use(express.json());

function getRandomSalary(min = 400000, max = 5000000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/company");
    console.log("✅ DB connected successfully");

    app.get("/", (req, res) => {
      res.render('index');
    });

    app.get("/generate", async (req, res) => {
      try {
        let employee = new Employee({
          name: "Salman",
          salary: 1200000,
          language: "Full stack",
          city: "japan",
          isManager: false,
        });
        await employee.save();
        res.send("generated successfully");
      } catch (err) {
        console.error(`Error genereating employee details: ${err}`);
        res.status(500).send("Internal server error");
      }
    });

    app.get("/generateMany",async (req,res)=>{
        try{
            const baseEmployees = [
                { name: "Salman",  language: "Full stack", city: "Japan", isManager: false },
                { name: "Ayesha",  language: "Python", city: "Delhi", isManager: true },
                { name: "Rahul",  language: "Java", city: "Mumbai", isManager: false },
                { name: "Neha",  language: "React", city: "Pune", isManager: false },
                { name: "Vikram",  language: "Angular", city: "Hyderabad", isManager: true },
                { name: "Arjun",  language: "Node.js", city: "Bangalore", isManager: false },
                { name: "Meena",  language: "C++", city: "Chennai", isManager: false },
                { name: "Kiran",  language: "Machine Learning", city: "Kolkata", isManager: true },
                { name: "Simran",  language: "Data Science", city: "Jaipur", isManager: false },
                { name: "Ankit",  language: "Full Stack", city: "Lucknow", isManager: true }
              ];

              const employees= baseEmployees.map(emp=>({
                ...emp,
                salary: getRandomSalary()
              }));

            await Employee.insertMany(employees);
            res.send("✅ 10 employees generated successfully!");
        }catch(err){
            console.error("Error inserting employees:", err);
            res.status(500).send("Internal server error")
        }
    });

    app.get("/empDelete", async (req, res) => {
      try {
        let empDel = await Employee.deleteMany({});
        if (empDel.deletedCount > 0) {
          res.send(`Successfully deleted the empoyees details of ${empDel.deletedCount}`);
        } else {
          res.send("No employee record found");
        }
      } catch (err) {
        console.error(`Error deleting the employee details:${err}`);
        res.status(500).send("Internal server error");
      }
    });

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
  }
}

startServer();
