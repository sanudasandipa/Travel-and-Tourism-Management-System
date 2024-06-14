const router = require("express").Router();
let Loan = require("../../model/HR/loan");

router.route("/add").post((req,res)=>{
    const Employee_Name  = req.body.Employee_Name;
    const Department = req.body.Department;
    const Loan_Amount= req.body.Loan_Amount;
    const Interest_rate= req.body.Interest_rate;
    const Premium= req.body.Premium;
    const Repayment_period= req.body.Repayment_period;
    const Conditions= req.body.Conditions;

    const newloan = new Loan({
        Employee_Name,
        Department,
        Loan_Amount,
        Interest_rate,
        Premium,
        Repayment_period,
        Conditions,
    })

    newloan.save().then(()=>{
        res.json("Loans are Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Loan.find().then((loan)=>{
        res.json(loan)
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/getloan/:id', (req, res) => {
    const id = req.params.id;
    Loan.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})


router.put("/update/:id", async (req, res) => {
try {
    const { id } = req.params;
    const {  Employee_Name, Department,Loan_Amount, Interest_rate, Premium,Repayment_period,Conditions } = req.body;

    // Ensure that all necessary fields are present
    if (!Employee_Name || !Department || !Loan_Amount || !Interest_rate || !Premium || !Repayment_period || !Conditions) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const updateLoan = {
        Employee_Name,
        Department,
        Loan_Amount,
        Interest_rate,
        Premium,
        Repayment_period,
        Conditions,             
    };

    const updatedLoan = await Loan.findByIdAndUpdate(id, updateLoan, { new: true });

    if (!updatedLoan) {
        return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ message: "Loan updated successfully", loan: updatedLoan });
} catch (err) {
    console.error("Error updating Loan:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
}
});

router.route("/delete/:id").delete(async(req,res)=>{
let loanID = req.params.id;

await Loan.findByIdAndDelete(loanID).then(()=>{
    res.status(200).send({status: "loan deleted"});
}).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status: "Error with delete loan",error: err.message});
})
})

module.exports = router;