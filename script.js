var currentHour = (new Date()).getHours();
var saveButton

var tasks = {
    "8": [],
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": [],
    "18": []
};

var setTasks = function() {
  /* add tasks to localStorage */
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// display current time
var datetime = null,
date = null;

var update = function () {
  date = moment(new Date())
  datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

// update current time each second
$(document).ready(function(){
    datetime = $('#currentDay')
    update();
    setInterval(update, 1000);
});

// color coding each hour
$('.edit_cont')
  .each(function(){
    var val = parseInt($(this).prop('id'));
    if(val > currentHour && val < currentHour + 24){
      $(this).css('background-color','Green');
    }else if(val < currentHour && val > currentHour - 24){
      $(this).css('background-color','LightGrey');
    }else if(val === currentHour){
      $(this).css('background-color','Red');
    }else{
      $(this).css('background-color','White');
    }
});

// TODO: when savebutton is clicked, submit content of task box to local storage
$(".saveBtn").on("click", function() {
  var taskList = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    var tasks = {
      "8": [],
      "9": [],
      "10": [],
      "11": [],
      "12": [],
      "13": [],
      "14": [],
      "15": [],
      "16": [],
      "17": [],
      "18": []
  };
    setTasks();
  }
  console.log(taskList);
  //if button id = "b" + textarea id then update localstorage...
});