var saveButton = $(".btn");
var row = $(".row");
var now = dayjs();

saveButton.on("click", function () {
  var timeStorage = $(this).parent().attr("id");
  var input = $(this).prev().val();
  localStorage.setItem(timeStorage, input);
});

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

function updateTime() {
  setInterval(function () {
    var currentDay = $("#currentDay");
    var currentDate = now.format("MM/DD/YYYY");
    var currentTime = now.format("h:mm A");
    currentDay.text(`Current time: ${currentDate} ${currentTime}`);
  }, 1000);
}

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

function run() {
  updateTime();
  getTime();
  updatedInputs();
}

run();
