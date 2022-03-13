var currentHour = (new Date()).getHours();

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

//function to get localstorage object, parse it, then update array content
var updateTasks = function(textId) {
  var taskList = JSON.parse(localStorage.getItem("tasks"));
  var textInputValue = $("#" + textId).val();
  console.log(textInputValue);
  var textInputArray = textInputValue.split("\n"); //"this\nis\na\nstring" -> ["this","is","a","string"]
  var oldAndNewTasks = taskList[textId].concat(textInputArray); //["oldTask1", "oldTask2"] + ["newTask1", "newTask2"] -> ["oldTask1", "oldTask2","newTask1", "newTask2"]
  var uniqueTasks = [...new Set(oldAndNewTasks)]; //creates a new array of unique values from concat 'o' nated arrays
  taskList[textId] = uniqueTasks; // update taskList array at the specified hour with the new array of unique values
  localStorage.setItem("tasks", JSON.stringify(taskList)); // update local storage
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
      $(this).css('background-color','LimeGreen');
    }else if(val < currentHour && val > currentHour - 24){
      $(this).css('background-color','LightGrey');
    }else if(val === currentHour){
      $(this).css('background-color','Crimson');
    }else{
      $(this).css('background-color','White');
    }
});



// TODO: when savebutton is clicked, submit content of task box to local storage
$(".saveBtn").on("click", function() {
  var taskList = JSON.parse(localStorage.getItem("tasks"));
  if (!taskList) {
    setTasks();
  }
  console.log(taskList);
  //if button id = "b" + textarea id then update localstorage
  //if ($(this).attr("id") === "b" + document.getElementsByName("textarea").id) {
    //get the save button id and slice off the "b". textAreaId will then hold the resulting number
    var textAreaId = $(this).attr("id").slice(1); //"b15" -> "15"
    var textIdInt = parseInt(textAreaId);
    updateTasks(textIdInt);
  //}
  
});


var getTasks = function() {
  //parse local storage
  var retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (retrievedTasks) {
    //insert values into textareas.
    for (i = 8; i < 19; i++) {
      document.getElementById(i).value = retrievedTasks[i].join("\n");
    }
  }
}


getTasks();