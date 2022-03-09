var tasks;
var currentHour = (new Date()).getHours();

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
    tasks = JSON.parse(localStorage.getItem("tasks"));
    var taskList = document.getElementById("8").textContent

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
        tasks = {
        toDo: [taskList]
      };
    }

    localStorage.setItem("hour" + currentHour, tasks);

    // loop over object properties
    $.each(tasks, function(list, arr) {
      console.log(list, arr);
      // then loop over sub-array
      arr.forEach(function(tasks) {
        createTask(task.text, task.date, list);
      });
    });
});