const router = require("express").Router();
let Payroll = require("../../model/HR/payroll");

router.route("/add").post((req,res)=>{
    const Employee_Name = req.body.Employee_Name;
    const Status = req.body.Status;
    const Working_Hours = req.body.Working_Hours;
    const Monthly_Salary= req.body.Monthly_Salary;
    const EPF_Amount= req.body.EPF_Amount;
    const Net_Salary = req.body.Net_Salary;

    const newpayroll = new Payroll({
        Employee_Name,
        Status,
        Working_Hours,
        Monthly_Salary,
        EPF_Amount,
        Net_Salary,
    })

    newpayroll.save().then(()=>{
        res.json("Payroll Details Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Payroll.find().then((payroll)=>{
        res.json(payroll)
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/getpayroll/:id', (req, res) => {
    const id = req.params.id;
    Payroll.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Employee_Name, Status, Working_Hours, Monthly_Salary, EPF_Amount, Net_Salary } = req.body;

      

        const updatePayroll = {
            Employee_Name,
            Status,
            Working_Hours,
            Monthly_Salary,
            EPF_Amount,
            Net_Salary,
        };

        const updatedPayroll = await Payroll.findByIdAndUpdate(id, updatePayroll, { new: true });

        if (!updatedPayroll) {
            return res.status(404).json({ message: "Payroll not found" });
        }

        res.status(200).json({ message: "Payroll updated successfully", payroll: updatedPayroll });
    } catch (err) {
        console.error("Error updating payroll:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});


router.route("/delete/:id").delete(async(req,res)=>{
    let EmployeeID = req.params.id;

    await Payroll.findByIdAndDelete(EmployeeID).then(()=>{
        res.status(200).send({status: "user deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error: err.message});
    })
})


module.exports = router;