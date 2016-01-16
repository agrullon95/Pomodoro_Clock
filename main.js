$(document).ready(function() {
  changeTimer();
  startTimer();
  pauseTimer();
  stopTimer();
  timerMode();
  sound();
  soundCheck();
});
var started = false;
var paused = false;
var mins = $('#minutes').val();
var alarm = new Audio("http://soundbible.com/grab.php?id=2061&type=mp3");
var alarmOn = false;
var soundOn = true;

function sound() {
  $('.soundSwitch').attr('checked', 'checked');
}

function soundCheck() {
  if ($('.soundSwitch').prop("checked") === false) {
    soundOn = false;
  }
}

function timerMode() {
  if (started === true) {
    $('#pause, #stop').removeClass('disabled');
    $('#start').addClass('disabled');
  } else {
    $('#pause, #stop').addClass('disabled');
    $('#start').removeClass('disabled');
  }
}

function changeTimer() {
  $('#minutes').on('change', function() {
    if (started === true) {

      $('#minutes').attr('disabled', 'disabled');
    } else {
      $('#minutes').removeAttr('disabled');
      if (mins > 0) {
        mins = $('#minutes').val();
        $('span.timer').text(mins + ":00");
      }
    }
  });
}

function startTimer() {
  $('#start').on('click', function() {
    started = true;
    timerMode();
    if (paused === false) {
      $('.timer').timer({
        duration: 25 + 'mins',
        countdown: true,
        updateFrequency: 1000,
        callback: function() {
          soundCheck();
          if ($('.soundSwitch').prop('checked') === true) {
            alarm.play();
            alarmOn = true;
          }
        }
      });
    } else {
      $('.timer').timer('resume');
    }
  });
}

function pauseTimer() {
  $('#pause').on('click', function() {
    started == false;
    paused = true;
    changeTimer();
    if (alarmOn === true) {
      alarm.pause();
      alarmOn = false;
    }
    $('.timer').timer('pause');
    $('#pause').addClass('disabled');
    $('#start').removeClass('disabled');
  });
}

function stopTimer() {
  $('#stop').on('click', function() {
    started = false;
    paused = false;
    timerMode();
    if (alarmOn === true) {
      alarm.pause();
      alarmOn = false;
    }
    $('.timer').timer('remove');
    mins = $('#minutes').val();
    $('span.timer').text(mins + ":00");
  });
}
