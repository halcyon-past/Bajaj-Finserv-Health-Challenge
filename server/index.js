const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.get("/bfhl",(req,res)=>{
    res.json({operation_code:1})
})

app.post("/bfhl", (req, res) => {
    const data = req.body.data;

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);

            if (item >= 'a' && item <= 'z') {
                if (highestLowercaseAlphabet === '' || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    const response = {
        "is_success": true,
        "user_id": "Aritro Saha",
        "email": "aritro.saha2021@vitstudent.ac.in",
        "roll_number": "21BLC1174",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    res.json(response);
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
});