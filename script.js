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
  var textInputArray = textInputValue.split("\n");
  var oldAndNewTasks = taskList[textId].concat(textInputArray);
  var uniqueTasks = [...new Set(oldAndNewTasks)];
  taskList[textId] = uniqueTasks;
  localStorage.setItem("tasks", JSON.stringify(taskList));
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
  //insert values into textareas.
  for (i = 8; i < 19; i++) {
    document.getElementById(i).value = retrievedTasks[i].join("\n");
  }
}


getTasks();