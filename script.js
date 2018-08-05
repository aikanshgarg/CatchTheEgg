// declaring DOM objects
var basket = $('#basket')
var container = $('#container')
var hen = $('.hen')
var eggs = $('.egg')
var egg1 = $('#egg1')
var egg2 = $('#egg2')
var egg3 = $('#egg3')
var restart = $('#restart')
var score_span = $('#score')
var life_span = $('#life')
var floor = $('#floor')

// some other declarations
var basket_height = basket.height();
var container_height = container.height();
var egg_height = eggs.height();
var egg_initial_position = parseInt(eggs.css('top'));
var score = 0;
var life = 5;
var speed = 2;
var max_speed = 7;
var counter = 0;
var score_updated = false;
var the_game = 0;
var anim_id;
var egg_current_position = 0;
// var egg_top = 0;
var basket_top = container_height - basket_height;
var bullseye_num = 0;

//--------------------------------------------------Game Logic Starts--------------------------------

// everthing written inside document.ready($)
// the_game function is executed repeatedly(animation)
// requestAnimationFrame returns a id which can be later used to spo the game

$(function(){ 

	the_game = function() {

		if (check_egg_hits_floor(egg1) || check_egg_hits_basket(egg1)) {
			set_egg_to_initial_postion(egg1);
		} else {
			egg_down(egg1);
		}
		
		if (check_egg_hits_floor(egg2) || check_egg_hits_basket(egg2)) {
			set_egg_to_initial_postion(egg2);
		} else {
			egg_down(egg2);
		}

		if (check_egg_hits_floor(egg3) || check_egg_hits_basket(egg3)) {
			set_egg_to_initial_postion(egg3);
		} else {
			egg_down(egg3);
		}

		 anim_id = requestAnimationFrame(the_game); // making our the_game a recursive function, for animation
	};

	if (life > 0) {
	anim_id = requestAnimationFrame(the_game); // calling the recursive function requestAnimationFrame for the function the_game	
	} else {
		game_over();
	}
    

});

//-------------------------All Functions For The Game-------------------------------------------------------------------------
// mouse's x-position is set to basket's left
$(document).on('mousemove', function(e) {
	basket.css('left', e.pageX);
});


function egg_down(egg) {
	egg_current_position = parseInt(egg.css('top'));
	egg.css('top', egg_current_position + speed);	
}

function check_egg_hits_floor(egg) {
	if (collision(egg, floor)) {
		show_bullseye(egg);
		decrement_life();
		return true;
	}
	return false;
}

function check_egg_hits_basket(egg) {
	if (collision(egg, basket)) {
		if (parseInt(egg.css('top')) < basket_top) {
			increment_score();
		    return true;
		}
	}  
	return false;
}

function decrement_life() {
	if(life === 0){
		life_span.text(life);
		game_over();

	} else {
		life--;
	    life_span.text(life);
	}	
}

function increment_score() {
	score++;
	if (score % 5 === 0 && speed < max_speed) {
		speed++;
	}
	score_span.text(score);
}

function set_egg_to_initial_postion(egg) {
	egg.css('top', egg_initial_position);
}

function show_bullseye(egg) {
	bullseye_num = egg.attr('data-bullseye');
	$('#bullseye' + bullseye_num).show();
	hide_bullseye(bullseye_num);
}

function hide_bullseye(bullseye_num) {
	setTimeout(function() {
		$('#bullseye' + bullseye_num).hide();
	}, 800);
}

function game_over() {
	cancelAnimationFrame(anim_id);
	restart.slideDown();
}

$(document).ready(function(){
	restart.click(function() {
		window.location.reload();
		console.log('reload');
	});
});
//-------------------------Collision Detection function---------------------------------------------------------------------------
function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
