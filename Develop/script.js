var saveButton = $(".btn");
var row = $(".row");
var now = dayjs();

// event listener for each save button. getting the id for each parent by using $(this). getting the input value by getting the pervious childs input value and then saving to local storage. the key is the id and the value is the input text.
saveButton.on("click", function () {
  var timeStorage = $(this).parent().attr("id");
  var input = $(this).prev().val();
  localStorage.setItem(timeStorage, input);
});

// this function loops through each row while getting the id of each row. i'm getting the current hour with day js and then compare the id to the current hour. were then setting the input's class depending the hour of the day.

function getTime() {
  row.each(function () {
    var timeHour = $(this).attr("id").split("-")[1];
    var currentHour = now.hour();
    var inp = $(this).children().eq(1);

    if (timeHour < currentHour) {
      inp.addClass("past");
    } else if (timeHour > currentHour) {
      inp.addClass("future");
    } else {
      inp.addClass("present");
    }
  });
}

// this function updates the time with the set interval function. i'm updating the time by 1 second.

function updateTime() {
  setInterval(function () {
    var currentDay = $("#currentDay");
    var currentDate = now.format("MM/DD/YYYY");
    var currentTime = now.format("h:mm A");
    currentDay.text(`Current time: ${currentDate} ${currentTime}`);
  }, 1000);
}

// this function updates the inputs from local storage. were setting the index at 9 becasue the ids go from 9 to 15 (3pm).

function updatedInputs() {
  var index = 9;

  row.each(function () {
    var storage = "hour-" + index;
    var lastInputs = localStorage.getItem(storage);

    if ($(this).attr("id") === storage) {
      if (lastInputs !== null) {
        $(this).children().eq(1).text(lastInputs);
        console.log(lastInputs);
      }
    }

    index++;
  });
}

// this function calls everything so it will run in order.
function run() {
  updateTime();
  getTime();
  updatedInputs();
}

run();
