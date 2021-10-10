"use strict"
const temporalityButtons = document.querySelectorAll(".btn");
const timespan = [...document.querySelectorAll(".time")];
const previous = [...document.querySelectorAll(".previous")];

getValue("weekly");

async function getValue(value){
  if (!['weekly', 'daily', 'monthly'].includes(value)) 
    throw new Error('Flasheaste ' + value + ' no esxiste')
  const response = await fetch("./data.json");
  const data = await response.json();
  const [work, play, study, exercise, social, selfCare] = data.map((x)=> x.timeframes);
  const times = {
    daily: "Day",
    weekly: "Week",
    monthly: "Month"
  };
  const time = times[value];
  timespan[0].textContent = work[value].current + "hs";
  timespan[1].textContent = play[value].current + "hs";
  timespan[2].textContent = study[value].current + "hs";
  timespan[3].textContent = exercise[value].current + "hs";
  timespan[4].textContent = social[value].current + "hs";
  timespan[5].textContent = selfCare[value].current + "hs";
  previous[0].textContent = `Last ${time} - ` + work[value].previous + "hs";
  previous[1].textContent = `Last ${time} - ` + play[value].previous + "hs";
  previous[2].textContent = `Last ${time} - ` + study[value].previous + "hs";
  previous[3].textContent = `Last ${time} - ` + exercise[value].previous + "hs";
  previous[4].textContent = `Last ${time} - ` + social[value].previous + "hs";
  previous[5].textContent = `Last ${time} - ` + selfCare[value].previous + "hs";
}


function displayInfo() {
    getValue(this.value); 
}

for (let temporality of temporalityButtons) {
  temporality.addEventListener("click", displayInfo);
}