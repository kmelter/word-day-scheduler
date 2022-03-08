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
var currentHour = (new Date()).getHours();
$('.edit_cont')
  .each(function(){
    var val = parseInt($(this).prop('id'));
    if(val > currentHour && val < currentHour + 12){
      $(this).css('background-color','Green');
    }else if(val < currentHour && val > currentHour - 12){
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
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
        tasks = {
        toDo: []
      };
    }
  
    // loop over object properties
    $.each(tasks, function(list, arr) {
      console.log(list, arr);
      // then loop over sub-array
      arr.forEach(function(tasks) {
        createTask(task.text, task.date, list);
      });
    });
});