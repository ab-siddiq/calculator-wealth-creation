

const displayHide = (displayID = '', hideID = '', inputValueID = '', outputValueID = '') => {

    document.getElementById(displayID).style.display = 'block';
    document.getElementById(hideID).style.display = 'none';


    if (inputValueID != '' && outputValueID != '') {
        document.getElementById(outputValueID).innerHTML = document.getElementById(inputValueID).value;
        document.getElementById(outputValueID).style.fontWeight = 'bold';
        // document.querySelectorAll('li#'+outputValueID).style.color = 'red';

    }

}
const getSetRadioButtonValue = (inputID, outputID) => {
    let inputValue = document.getElementById(inputID).value;

    if (inputValue == 1) {
        document.getElementById(outputID).innerHTML = "Safe";
        document.getElementById(outputID).style.fontWeight = 'bold';
    } else if (inputValue == 2) {
        document.getElementById(outputID).innerHTML = "Moderate";
        document.getElementById(outputID).style.fontWeight = 'bold';
    }
    else if (inputValue == 3) {
        document.getElementById(outputID).innerHTML = "Aggressive";
        document.getElementById(outputID).style.fontWeight = 'bold';
    } else {
        console.log('errror');
    }
}
const getInputValue = () => {
    // 
    
    const getInputValues = Array.from(document.getElementsByClassName('display-output'));
    let storeInputValues = [];
    getInputValues.forEach(getValue => storeInputValues.push(getValue.innerText));

    [yourName,annualIncome,age,ageGoal,goalCost,possibleInvestment,risk] = storeInputValues;
    console.log(storeInputValues);
    const inputValues = {
        name: yourName,
        age: parseFloat(age),
        annualIncome: parseFloat(annualIncome),
        ageGoal: parseFloat(ageGoal),
        goalCost: parseFloat(goalCost),
        possibleInvestment: parseFloat(possibleInvestment),
        risk: risk,
    }
    console.log(inputValues);
    calculationInvestorInput(inputValues);
}

const callInputID = (id) => document.getElementById(id).innerHTML;

const calculationInvestorInput = (inputValues) => {
    
    
    const inflationPercent = 5.71;
    // const estimatedPercent = 11;
    if (inputValues.risk === "Safe") {
        estimatedPercent = 8;
    }
    else if (inputValues.risk === "Moderate") {
        estimatedPercent = 11;
    }
    else if (inputValues.risk === "Aggressive") {
        estimatedPercent = 15;
    }
    

    let ageDifference = inputValues.ageGoal - inputValues.age;
    let npr = ageDifference * 12;
    let r = (estimatedPercent / (100 * 12));
    console.log('agedif=>',ageDifference,'npr=>', npr, 'r=>',r);
    let fv1 = inputValues.goalCost * (Math.pow((1 + inflationPercent / 100), ageDifference));
    let fv2 = inputValues.possibleInvestment * (Math.pow((1 + estimatedPercent / 100), ageDifference));
    let fv = fv1 - fv2;
    let pmt = (fv*r)/(Math.pow((1+r),npr)-1);

    // let pmt = fv*Math.pow();
    
    console.log('fv1=>', fv1, 'fv2=>', fv2, 'fv=>', fv, 'pmt=>',pmt);



    const outputValues = {
        name: inputValues.name,
        ageGoal: inputValues.ageGoal,
        fv1: fv1.toFixed(2),
        fv2: fv2.toFixed(2),
        inflationPercent: inflationPercent,
        estimatedPercent: estimatedPercent,
        pmt: pmt.toFixed(2),
        possibleInvest: inputValues.possibleInvestment,
    }
    showOutput(outputValues);
}

const showOutput = (outputValues) => {
    console.log(outputValues);
    document.querySelector('.output-top').innerHTML = `
        <p class="text-justify"> 
        Dear Mr/ Mrs. <strong> ${outputValues.name} </strong>When your Child will be at the Age of <strong> ${outputValues.ageGoal}</strong> You are to have <strong>${outputValues.fv1} Taka </strong>For the Education Plan
        The Inflation is considered at <strong>${outputValues.inflationPercent}%</strong> , And The return is Estimated to be <strong>${outputValues.estimatedPercent}%</strong>
        </p>
        `
    document.querySelector('.output-bottom-left').innerHTML = `
        <p class = "text-justify">   
        Your monthly SIP investment of <strong> ${outputValues.pmt} Taka </strong> 
        </p>
        `
        document.querySelector('.output-bottom-right').innerHTML = `
        '+ initial investment of  <strong>${outputValues.possibleInvest} Taka</strong> Taka will help you to achieve the goal of <strong>${outputValues.fv1} Taka </strong>at the age of   <strong>${outputValues.ageGoal}</strong> <br>
        
        </p>
    `
    document.querySelector('.fv2').innerHTML = `
        <p>
        <strong>${outputValues.fv2}
        </p>
    
    `
}


// ===========================================Need Help Questions==================================

function needHelpQuestionButtonEvent(displayID, hideID, condition) {
    let itemDisplay;
    let itemHide;
    let questionWeight;
    if (condition == true) {
        itemDisplay = document.getElementById("wealth-question-" + displayID);
        itemHide = document.getElementById("wealth-question-" + hideID);

    }
    if (condition == false) {
        itemDisplay = document.getElementById(displayID);
        itemHide = document.getElementById(hideID);
    }

    itemDisplay.style.display = "block";
    itemHide.style.display = "none";
    riskCalculation();
}
// get question value
function getNeedHelpQuestionValue(optionID, optionScoreID, questionOptionID, questionWeight) {
    let getInputValue = parseFloat(document.getElementById(optionID).value);

    let calculateQuestionWeight = getInputValue * questionWeight;
    document.getElementById(optionScoreID).innerHTML = questionWeight;
    document.getElementById(questionOptionID).innerHTML = getInputValue;
    console.log(getInputValue * questionWeight + " pressed ", typeof (getInputValue));
}
function riskCalculation() {

    const demoWeight = .24;
    const w1 = .15;
    const w2 = .18;
    const w3 = .15;
    const w4 = .18;
    const w5 = .1;
    const highestScore = w1 * 4 + w2 * 4 + w3 * 4 + w4 * 4 + w5 * 4 + demoWeight * 24;
    const lowestScore = w1 + w2 + w3 + w4 + w5 + demoWeight * 12;
    let questionOneOption = getQuestionWeight('question-one-option');
    let questionTwoOption = getQuestionWeight('question-two-option');
    let questionThreeOption = getQuestionWeight('question-three-option');
    let questionFourOption = getQuestionWeight('question-four-option');
    let questionFiveOption = getQuestionWeight('question-five-option');
    let questionOneWeight = (questionOneOption * w1);
    let questionTwoWeight = (questionTwoOption * w2);
    let questionThreeWeight = (questionThreeOption * w3);
    let questionFourWeight = (questionFourOption * w4);
    let questionFiveWeight = (questionFiveOption * w5);
    const demographicScore = (18 * demoWeight);
    let sumRiskValue = questionOneWeight + questionTwoWeight + questionThreeWeight + questionFiveWeight + questionFiveWeight + demographicScore;
    console.log(sumRiskValue, '=>risk', highestScore, '=>high', lowestScore, '=>low', demographicScore, 'demo');
    if (sumRiskValue >= 3.64 && sumRiskValue <= 6) {
        document.getElementById('risk-id').innerHTML = 'Safe Risk';
        setRisk('risk1');
    } else if (sumRiskValue > 6 && sumRiskValue <= 7.5) {
        setRisk('risk2');
        document.getElementById('risk-id').innerHTML = 'Moderate Risk';
    } else if (sumRiskValue > 7.5 && sumRiskValue <= 8.8) {
        setRisk('risk3');
        document.getElementById('risk-id').innerHTML = 'Aggressive Risk';
    } else { console.log('false'); }
}

function getQuestionWeight(id) {
    let questionWeight = parseFloat(document.getElementById(id).innerHTML);

    console.log(questionWeight, typeof (questionWeight));
    return questionWeight;
}
function setRisk(id) {
    document.getElementById(id).click();
}


