require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require("axios");
const moment = require("moment");
const User = require('../models/userSchema.js');
const Weight = require("../models/weightSchema.js");
const Food = require("../models/foodSchema.js");
const Exercise = require("../models/exerciseSchema.js");
var authHandler = require('./auth.js');

router.get("/dashboard", async(req,res)=>{
    try{
        let selectedDate = req.query.date;
        let selectedDateFormatted = new Date(moment(selectedDate).startOf("d").format().slice(0,10));
        let oneDayLater = new Date(moment(selectedDate).add(1,"d").startOf("d").format().slice(0,10));

        // Find the user and populate the weight, food, and exercise for the selected date
        let user = await User.findById(req.user._id)
            .populate("weight")
            .populate({
                path: "food",
                match: { 
                  date: {
                    $gte: selectedDateFormatted,
                    $lt: oneDayLater
                  }
                }
            })
            .populate({
                path: "exercise",
                match: { 
                  date: {
                    $gte: selectedDateFormatted,
                    $lt: oneDayLater
                  }
                }
            });
        return res.send(user)

    } catch(e){
        return console.log(e);
    }
})

router.get("/trends", async(req,res)=>{
    try{
        let todayDate = req.query.date;
        let range = req.query.range;
        let userID = req.user._id;

        // TODAY - BEGINNING TO END:
        let startOfToday = moment(todayDate).startOf("day");
        let endOfToday = moment(todayDate).endOf("day");
        // A WEEK - BEGINNING TO END:
        let weekAgo = moment(todayDate).endOf("day").subtract(6,"days");
        let endOfTodayFormatted = endOfToday.format().slice(0,10);
        let weekAgoFormatted = weekAgo.format().slice(0,10);
        // A MONTH - BEGINNING TO END:
        let aMonthAgo = moment(todayDate).endOf("day").subtract(1,"months").format().slice(0,10);

        let userInfo = await User.findById(userID)
            .populate("weight")
            .populate({
                path: "food",
                match: { 
                  date: {
                    $gte: range==6 ? weekAgoFormatted : aMonthAgo,
                    $lte: endOfTodayFormatted
                  }
                }
            })
            .populate({
                path: "exercise",
                match: { 
                  date: {
                    $gte: range==6 ? weekAgoFormatted : aMonthAgo,
                    $lte: endOfTodayFormatted
                  }
                }
            });
        
        let foodSums = await Food.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId(userID),
                    date: {
                        $gte: new Date(range==6 ? weekAgoFormatted : aMonthAgo),
                        $lte: new Date(endOfTodayFormatted)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    caloriesConsumed: { $sum: "$calories" }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        let exerciseSums = await Exercise.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId(userID),
                    date: {
                        $gte: new Date(range==6 ? weekAgoFormatted : aMonthAgo),
                        $lte: new Date(endOfTodayFormatted)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    caloriesExercise: { $sum: "$caloriesBurned" }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        let finalBurnedSums = (userInfo.bmr !== undefined) ? (exerciseSums.map((eachDay)=>({
            _id: eachDay._id, 
            totalBurned: eachDay.caloriesExercise + userInfo.bmr})
        )) : (exerciseSums.map((eachDay)=>({
            _id: eachDay._id, 
            totalBurned: eachDay.caloriesExercise})
        ))

        res.send({
            _id: userInfo._id,
            username: userInfo.username,
            bmr: (userInfo.bmr !== undefined ? userInfo.bmr : 0),
            startDate: range==6 ? weekAgoFormatted : aMonthAgo,
            foodSums: foodSums,
            exerciseSums: exerciseSums,
            finalBurnedSums: finalBurnedSums
        });
    } catch(e){
        return console.log(e)
    }
})

// BMR CONTAINER HANDLER:
// THIS WILL HANDLE THE USER'S CHANGES TO THEIR BMR PROFILE. WHEN SUBMITTED, IT GETS SAVED IN THIS ROUTE TO MONGODB THROUGH MONGOOSE.
router.post("/addBMR", async (req, res)=>{
    let genderInput = req.body.genderInput;
    let ageInput = req.body.ageInput;
    let ftInput = req.body.ftInput;
    let inInput = req.body.inInput;
    let weightInput = req.body.weightInput;
    let activityLevelInput = req.body.activityLevelInput;
    let userID = req.body.userID;

    let heightInInches = (ftInput *12)+(inInput);

    let finalBMR = "";

    function bmrCalc(){
        if(genderInput==="Male"){
            let BMR = 66.47+(6.24*weightInput)+(12.7*heightInInches)-(6.75*ageInput);
            if(activityLevelInput==="Little to no exercise: BMR x 1.2"){
                finalBMR = Math.round(BMR*1.2)
            } else if(activityLevelInput==="Light exercise (1-3 days/week): BMR x 1.375"){
                finalBMR = Math.round(BMR*1.375)
            } else if (activityLevelInput==="Moderate exercise (3-5 days/week): BMR x 1.55"){
                finalBMR = Math.round(BMR*1.55)
            } else if (activityLevelInput==="Heavy exercise (6-7 days/week): BMR x 1.725"){
                finalBMR = Math.round(BMR*1.725)
            } else {
                finalBMR = Math.round(BMR*2)
            }
            return finalBMR
        } else{
            let BMR = 65.51+(4.35*weightInput)+(4.7*heightInInches)-(4.7*ageInput);
            if(activityLevelInput==="Little to no exercise: BMR x 1.2"){
                finalBMR = Math.round(BMR*1.2)
            } else if(activityLevelInput==="Light exercise (1-3 days/week): BMR x 1.375"){
                finalBMR = Math.round(BMR*1.375)
            } else if (activityLevelInput==="Moderate exercise (3-5 days/week): BMR x 1.55"){
                finalBMR = Math.round(BMR*1.55)
            } else if (activityLevelInput==="Heavy exercise (6-7 days/week): BMR x 1.725"){
                finalBMR = Math.round(BMR*1.725)
            } else {
                finalBMR = Math.round(BMR*2)
            }
            return finalBMR
        }
    }
    try{
        let updatedUser = User.findByIdAndUpdate(userID, {$set: {
            gender: genderInput,
            age: ageInput,
            feet: ftInput,
            inches: inInput,
            height: heightInInches,
            activityLevel: activityLevelInput,
            bmr: bmrCalc(),
        }}).exec();

        let newWeight = await Weight.create({ weight: weightInput });
        let updatedUserWeight = await User.findByIdAndUpdate(userID, {$push: { weight: newWeight._id }}, { new: true });
    } catch(e){
        return console.log(e);
    }  
})

// DIARY TABLE REMOVAL ONLY:
// Note that the Food Modal and Exercise Modal sections of this handler.js page will handle the adding into the food diary. This ONLY handles removal.
router.post("/removeDiaryItem", async(req, res) => {
    try {
        let selected = req.body.selected;
        for (let i = 0; i < selected.length; i++) {
            if (selected[i].category === "Food") {
                await Food.findByIdAndDelete(selected[i]._id);
            } else if (selected[i].category === "Exercise") {
                await Exercise.findByIdAndDelete(selected[i]._id);
            }
        }
        return res.status(200).send({ message: "Selected items removed from diary" });
    } catch (error) {
        return res.status(500).send({ message: "Error removing selected items from diary" });
    }
});

// FOOD MODAL:
// This will handle the user's search query, makes the external API NINJA call, and send the API Response data back to the front-end.

router.post("/foodModal/apiCall", async (req, res) => {
    try {
      let foodInput = req.body.foodQuery;
      let foodServingAmount = req.body.servingAmount;
      let foodServingMetric = req.body.servingMetric;

      let foodAPIQuery = `${foodServingAmount} ${foodServingMetric} ${foodInput}`

      // make external API call here using userData
      const apiResponse = await axios.get('https://api.api-ninjas.com/v1/nutrition', {
        params: {
            query: foodAPIQuery,
        },
        headers: { 'X-Api-Key': process.env.API_KEY }
        })
        res.send(apiResponse.data);
    } catch (error) {
        console.log(error);
    }
});
// Once the user reviews the search results returned by the external API and pick the results they want to save to their diary, this will handle the user's selections and save them into MongoDB through Mongoose.
router.post("/foodModal/foodDiarySave", async (req, res) => {
    try {
        for(let i = 0; i < req.body.length; i++) {
            const { userID, selectedCalendarDate, food, servingAmount, calories, protein, carbs, fat } = req.body[i];
            let totalProteinCalories = Math.round(protein * 4);
            let totalCarbCalories = Math.round(carbs * 4);
            let totalFatCalories = Math.round(fat * 9);
            let totalOtherCalories = ""
            if((Math.round(calories) - totalCarbCalories - totalFatCalories - totalProteinCalories)>=0){
                totalOtherCalories = (Math.round(calories) - totalCarbCalories - totalFatCalories - totalProteinCalories)
            } else {
                totalOtherCalories = 0;
            }
            const momentDate = moment(selectedCalendarDate).format().slice(0,10);
            const newFood = new Food({
                date: momentDate,
                foodName: food,
                grams: servingAmount,
                calories: Math.round(calories),
                protein: protein,
                carbs: carbs,
                fat: fat,
                calProtein: Math.round(totalProteinCalories),
                calCarbs: Math.round(totalCarbCalories),
                calFat: Math.round(totalFatCalories),
                calOther: Math.round(totalOtherCalories),
                user: userID,
                category: "Food"
            });
        await newFood.save();
        const user = await User.findById(userID);
        user.food.push(newFood);
        await user.save();
    }
    res.status(200).send("Exercise successfully added to diary");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding exercise to diary");
    }
});



// EXERCISE MODAL:
// This will handle the user's search query, makes the external API NINJA call, and send the API Response data back to the front-end.

router.post("/exerciseModal/apiCall", async (req, res) => {
    try {
      let exerciseInput = req.body.exerciseQuery;
      let latestWeight = req.body.weight;
      let exerciseTime = req.body.exerciseTime;

      // make external API call here using userData
      const apiResponse = await axios.get('https://api.api-ninjas.com/v1/caloriesburned', {
        params: {
            activity: exerciseInput,
            weight: latestWeight,
            duration: exerciseTime
        },
        headers: { 'X-Api-Key': process.env.API_KEY }
        })
        res.send(apiResponse.data);
    } catch (error) {
        console.log(error);
    }
});
// Once the user reviews the search results returned by the external API and pick the results they want to save to their diary, this will handle the user's selections and save them into MongoDB through Mongoose.
router.post("/exerciseModal/exerciseDiarySave", async (req, res) => {
    try {
        for(let i = 0; i < req.body.length; i++) {
            const { userID, selectedCalendarDate, exercise, duration, calories } = req.body[i];
            const momentDate = moment(selectedCalendarDate).format().slice(0,10);
            const date = new Date(selectedCalendarDate);
            const newExercise = new Exercise({
                date: momentDate,
                exerciseName: exercise,
                duration,
                caloriesBurned: calories,
                user: userID,
                category: "Exercise"
            });
        await newExercise.save();
        const user = await User.findById(userID);
        user.exercise.push(newExercise);
        await user.save();
    }
    res.status(200).send("Exercise successfully added to diary");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding exercise to diary");
    }
});

module.exports = router;