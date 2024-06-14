const router = require("express").Router();
const Employee = require("../../model/HR/employee");

router.route("/add").post((req,res)=>{
    const Employee_Name = req.body.Employee_Name;
    const NIC = req.body.NIC;
    const Gender = req.body.Gender;
    const Status= req.body.Status;
    const Start_Date= req.body.Start_Date;
    const Department = req.body.Department;

        const newemployee = new Employee({
            Employee_Name,
            NIC,
            Gender,
            Status,
            Start_Date,
            Department,
        })


        newemployee.save().then(()=>{
            res.json("Employee Data Added")
        }).catch((err)=>{
            console.log(err);
        })
    })
    

    router.route("/").get((req,res)=>{
        Employee.find().then((employee)=>{
            res.json(employee)
        }).catch((err)=>{
            console.log(err);
        })
    })

    router.get('/getemployee/:id', (req, res) => {
        const id = req.params.id;
        Employee.findById({ _id: id })
            .then(users => res.json(users))
            .catch(err => res.json(err))
    })
    

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Employee_Name, NIC, Gender, Status, Start_Date, Department } = req.body;

        // Ensure that all necessary fields are present
        if (!Employee_Name || !NIC || !Gender || !Status || !Start_Date || !Department) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updateEmployee = {
            Employee_Name,
            NIC,
            Gender,
            Status,
            Start_Date,
            Department,
        };

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateEmployee, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (err) {
        console.error("Error updating employee:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.route("/delete/:id").delete(async(req,res)=>{
    let employeeID = req.params.id;

    await Employee.findByIdAndDelete(employeeID).then(()=>{
        res.status(200).send({status: "user deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
})

module.exports = router;
