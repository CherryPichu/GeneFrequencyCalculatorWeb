const express = require('express')
const router = express.Router()
const fs = require("fs")

/**
 * @swagger
 * /api :
 *   
 *   () :
 *      summary : 
 * 
 */



router.post("/calcSexRatio", (req, res, next) => {

    

    try{
        // console.log(req.body)
        const male = parseFloat(req.body.male)
        const female = parseFloat(req.body.female)

        const ratio = Math.round(female / (male + female) * 100) // 반올림
        const data = '{ "result" : ' + ratio +' }'
        res.json(data);
    }catch(err){
        console.error(err)
        res.json({"error" : err})
    }


    
})


router.post("/calcMAF", (req, res, next) => {
    
    try{
        // console.log(req.body)
        const {alleleCaseMajor,alleleCaseMinor, alleleControlMajor, alleleControlMinor } = req.body
        const [CaseMajor, CaseMinor, ControlMajor, ControlMinor] = [alleleCaseMajor,alleleCaseMinor, alleleControlMajor, alleleControlMinor ].map((i)=>parseInt(i))
        console.log([CaseMajor, CaseMinor, ControlMajor, ControlMinor])
        const CaseMAF = (CaseMinor / (CaseMajor + CaseMinor)).toFixed(3)
        const ControlMAF = (ControlMinor / (ControlMajor + ControlMinor)).toFixed(3) // 반올림
        const data = `{"result": "${CaseMAF}/${ControlMAF}"}`
        res.json(data);
    }catch(err){
        console.error(err)
        res.json({"error" : err})
    }


    
})

router.post("/calcGenoFreq", (req, res, next) => {
    
    try{
        var {CaseAA, CaseAa, Caseaa, ControlAA, ControlAa, Controlaa} = req.body
        var [CaseAA, CaseAa, Caseaa, ControlAA, ControlAa, Controlaa] = [CaseAA, CaseAa, Caseaa, ControlAA, ControlAa, Controlaa].map((i)=>parseInt(i))
        const CaseFrAA = (CaseAA/(CaseAA + CaseAa + Caseaa)).toFixed(4)
        const CaseFrAa = (CaseAa/(CaseAA + CaseAa + Caseaa)).toFixed(4)
        const CaseFraa = (Caseaa/(CaseAA + CaseAa + Caseaa)).toFixed(4)

        const ContolFrAA = (ControlAA/(ControlAA + ControlAa + Controlaa)).toFixed(4)
        const ContolFrAa = (ControlAa/(ControlAA + ControlAa + Controlaa)).toFixed(4)
        const ContolFraa = (Controlaa/(ControlAA + ControlAa + Controlaa)).toFixed(4)

        res.json({"CaseFreqResult" : `${CaseFrAA}/${CaseFrAa}/${CaseFraa}`, 
        "ControlFreqResult" : `${ContolFrAA}/${ContolFrAa}/${ContolFraa}`} )


    }catch(err){
        console.error(err)
        res.json({"error" : err})
    }


    
})


module.exports = router



