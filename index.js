"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const buttons = document.querySelectorAll('.activity-tracker__option');
let data = [];
const listenToButtons = (array) => {
    array.forEach((button) => {
        button.addEventListener('click', () => {
            activateClickedButton(button);
            const clickedOption = button.dataset.option;
            renderCards(clickedOption);
        });
    });
};
const activateClickedButton = (button) => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
};
const loadData = () => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch data
    const response = yield fetch('./data.json');
    const fetchedData = yield response.json();
    data = fetchedData;
    buttons[1].dispatchEvent(new Event('click')); // Dispatching click event
});
const clearActivities = () => {
    //Clear all activities from html
    const activities = document.querySelectorAll('.activity-tracker__activity');
    activities.forEach(a => a.remove());
};
const renderCards = (clickedOption) => __awaiter(void 0, void 0, void 0, function* () {
    clearActivities();
    const activityTracker = document.querySelector('section.activity-tracker');
    const calcTimeframe = (option) => {
        if (option === 'daily') {
            return 'Yesterday';
        }
        else if (option === 'weekly') {
            return 'Last Week';
        }
        else if (option === 'monthly') {
            return 'Last Month';
        }
        return '';
    };
    data.forEach(activity => {
        const name = activity.title;
        const activityClass = name.toLowerCase().replace(' ', '-');
        const timeframeData = activity.timeframes[clickedOption];
        const previousTimeframe = calcTimeframe(clickedOption);
        const section = document.createElement('section');
        section.classList.add('activity-tracker__activity', activityClass);
        const stringToInject = `
        <div class="activity__bg">
            <img src="./images/icon-${activityClass}.svg" alt="">
        </div>
        <div class="activity__info">
         <header class="activity__header">
          <h2 class="activity__name">
            ${name}
          </h2>
          <div class="activity__options">
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill="#BBC0FF" fill-rule="evenodd" />
            </svg>
           </div>
         </header>
        <div class="activity__timeframes">
          <h3 class="activity__current-timeframe">
            ${timeframeData.current}hrs
          </h3>
          <div class="activity__previous-timeframe">
            <p class="time-window">${previousTimeframe}</p>
            <p> - </p>
            <p class="time">${timeframeData.previous}hrs</p>
          </div>
         </div>
        </div>
        `;
        section.innerHTML = stringToInject;
        activityTracker.appendChild(section);
    });
});
listenToButtons(Array.from(buttons));
loadData();
