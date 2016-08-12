


var $wrSlider = $(".kirkin-slider");
var $imgMass = $wrSlider.find(".slider-items");//													блок с изображениями
var $sliderLayout = $wrSlider.find(".slider-layout");//										блок с элементами переключения
var imgLength = $imgMass.find("img").length;//														количество изображений
var leftElm, centrElm, rightElm, preLeft, preRight;
var state = false;//																											для фц-и задержки
var timeAnimationButton = 500;//																					время переключения слайдера с помощью кнопок переключения
var timeAnimationAuto = 3000;//																						время автоматического переключения элементов слайдера

var magic = 20; // 200 / 5 (slider-layout.width / slider-items.length)

var imageFunction = function(layout, nthType, imgMass, elemPos, height, topMargin, zIndex) {
	layout.find(":nth-of-type(" + nthType + ")").css({
		"background-image": "url(" + imgMass.find(":nth-of-type(" + elemPos + ")").attr("src") + ")",
		"height": height,
		"margin-top": topMargin,
		"z-index": zIndex
	});
};

var ctrlAnimation = function(layout, nthType, height, topMargin, timeAnimation) {
	layout.find(".slider-elm:nth-of-type(" + nthType + ")").animate({
		"height": height,
		"margin-top": topMargin,
	}, timeAnimation);
};

var refresh = function(dopPreLeft, preLeft, leftElm, centrElm, rightElm, preRight, dopPreRight) {//захват
	$sliderLayout.find(":nth-of-type(1)").css("background-image", "url(" + $imgMass.find(":nth-of-type(" + dopPreLeft + ")").attr("src") + ")");
	$sliderLayout.find(":nth-of-type(7)").css("background-image", "url(" + $imgMass.find(":nth-of-type(" + dopPreRight + ")").attr("src") + ")");

	imageFunction($sliderLayout, 2, $imgMass, preLeft, "65%", "4.5%", 4);
	imageFunction($sliderLayout, 3, $imgMass, leftElm, "80%", "2.5%", 5);
	imageFunction($sliderLayout, 4, $imgMass, centrElm, "100%", 0, 6);
	imageFunction($sliderLayout, 5, $imgMass, rightElm, "80%", "2.5%", 5);
	imageFunction($sliderLayout, 6, $imgMass, preRight, "65%", "4.5%", 4);

	$sliderLayout.css("margin-left", "-20%");
};

var kirkinInit = function() {
	console.assert(imgLength > 3, "I NEED MORE COOKIES(IMAGES)!!!");// debug
	var delay = function() {
		if (state) return true;
		state = true;
		setTimeout(function() { state = false }, timeAnimationButton + 60);
	};

	var refresh = function(dopPreLeft, preLeft, leftElm, centrElm, rightElm, preRight, dopPreRight) {//всё, кроме захвата
		$sliderLayout.find(":nth-of-type(1)").css("background-image", "url(" + $imgMass.find(":nth-of-type(" + dopPreLeft + ")").attr("src") + ")");
		$sliderLayout.find(":nth-of-type(7)").css("background-image", "url(" + $imgMass.find(":nth-of-type(" + dopPreRight + ")").attr("src") + ")");

		imageFunction($sliderLayout, 2, $imgMass, preLeft, "65%", "4.5%", 4);
		imageFunction($sliderLayout, 3, $imgMass, leftElm, "80%", "2.5%", 5);
		imageFunction($sliderLayout, 4, $imgMass, centrElm, "100%", 0, 6);
		imageFunction($sliderLayout, 5, $imgMass, rightElm, "80%", "2.5%", 5);
		imageFunction($sliderLayout, 6, $imgMass, preRight, "65%", "4.5%", 4);

		$sliderLayout.css("margin-left", "-20%");
	};

	refresh((imgLength - 2) ? imgLength - 2 : 1, imgLength - 1, imgLength, 1, 2, 3, (4 <= imgLength) ? 4 : imgLength - 1);

	$wrSlider.find(".controls div").click(function () {
		if (delay()) return;

		var indexCurrent = $(this).parent().siblings(".slider-items").find(".current").index() + 1;
		$(this).parent().siblings(".slider-items").find(".current").removeClass("current");

		if ($(this).attr("class") === "ctrl-prev") {
			$sliderLayout.animate({
				"margin-left": "+=" + magic + "%"
			}, timeAnimationButton);

			ctrlAnimation($sliderLayout, 2, "80%", "2.5%", timeAnimationButton);
			$sliderLayout.find('.slider-elm:nth-of-type(3)').css("z-index", 7);
			ctrlAnimation($sliderLayout, 3, "100%", 0, timeAnimationButton);
			ctrlAnimation($sliderLayout, 4, "80%", "2.5%", timeAnimationButton);
			ctrlAnimation($sliderLayout, 5, "65%", "4.5%", timeAnimationButton);

			if (indexCurrent === 1) centrElm = imgLength;
			else centrElm = indexCurrent - 1;

			if ((centrElm - 1) > 0) leftElm = centrElm - 1;
			else leftElm = imgLength;

			if ((leftElm - 1) > 0) preLeft = leftElm - 1;
			else preLeft = imgLength;

			if ((preLeft - 1) > 0) dopPreLeft = preLeft - 1;
			else dopPreLeft = imgLength;

			rightElm = indexCurrent;

			if ((rightElm + 1) > imgLength) preRight = 1;
			else if ((rightElm + 1) === imgLength) preRight = imgLength;
			else preRight = rightElm + 1;

			if ((preRight + 1) > imgLength) dopPreRight = 1;
			else if ((preRight + 1) === imgLength) dopPreRight = imgLength;
			else dopPreRight = preRight + 1;
		}

		if ($(this).attr("class") === "ctrl-next") {
			$sliderLayout.animate({
				"margin-left": "-=" + magic + "%"
			}, timeAnimationButton);

			ctrlAnimation($sliderLayout, 3, "65%", "4.5%", timeAnimationButton);
			ctrlAnimation($sliderLayout, 4, "80%", "2.5%", timeAnimationButton);
			$sliderLayout.find('.slider-elm:nth-of-type(5)').css("z-index", 7);
			ctrlAnimation($sliderLayout, 5, "100%", 0, timeAnimationButton);
			ctrlAnimation($sliderLayout, 6, "80%", "2.5%", timeAnimationButton);

			if (indexCurrent === imgLength) centrElm = 1;
			else centrElm = indexCurrent + 1;

			if ((centrElm + 1) > imgLength) rightElm =  1;
			else rightElm = centrElm + 1;

			if ((rightElm + 1) > imgLength) preRight = 1;
			else preRight = rightElm + 1;

			if ((preRight + 1) > imgLength) dopPreRight = 1;
			else dopPreRight = preRight + 1;

			leftElm = indexCurrent;

			if (leftElm === 1) preLeft = imgLength;
			else preLeft = leftElm - 1;

			if (preLeft === 1) dopPreLeft = imgLength;
			else dopPreLeft = preLeft - 1;

		}
		$imgMass.find(":nth-of-type(" + centrElm + ")").addClass('current');
		setTimeout(refresh, timeAnimationButton, dopPreLeft, preLeft, leftElm, centrElm, rightElm, preRight, dopPreRight);
	});

	var k = $(".ctrl-prev");
	var l = $(".ctrl-next");
	var wrSlider = $(document);
	
	wrSlider.keydown(function(e) {
		var ch = e.which;
		if (ch < 30) return true;
		switch(ch) {
			case 37: {
					clearInterval(intervalID);
					intervalID = automatClick();
					 k.trigger('click');
				}
			break;
			case 39:{
					clearInterval(intervalID);
					intervalID = automatClick();
					l.trigger('click');
				}
			break;
			default: break;
		}
	});

	var automatClick = function() {
		return setInterval(function() {
			$(".ctrl-next").trigger('click');
		}, timeAnimationAuto);
	};

	var intervalID = automatClick();

	wrSlider = $(".kirkin-slider");

	wrSlider.hover(function() {
		clearInterval(intervalID);
	}, function() {
		intervalID = automatClick();
	});

};//end kirkin

var stateD = false;

var delayD = function() {
		if (stateD) return true;
		stateD = true;
		setTimeout(function() { stateD = false }, timeAnimationButton + 60);
	};

	wrSliderBody = $(".slider-body");

	wrSliderBody.mousedown(function(e) {
		var start = e.offsetX;
		var satturn = Number($(".slider-layout").css("margin-left").slice(0, -2));

		wrSliderBody.mousemove(function(e) {
		if (delayD()) return;
		var indexCurrent = $(this).parent().find(".current").index() + 1;
		$(this).parent().find(".current").removeClass("current");

		var needMe = e.offsetX - start;

		if (needMe > 0) {
			$sliderLayout.animate({
				"margin-left": "+=" + magic + "%"
			}, timeAnimationButton);

			ctrlAnimation($sliderLayout, 2, "80%", "2.5%", timeAnimationButton);
			$sliderLayout.find('.slider-elm:nth-of-type(3)').css("z-index", 7);
			ctrlAnimation($sliderLayout, 3, "100%", 0, timeAnimationButton);
			ctrlAnimation($sliderLayout, 4, "80%", "2.5%", timeAnimationButton);
			ctrlAnimation($sliderLayout, 5, "65%", "4.5%", timeAnimationButton);

			if (indexCurrent === 1) centrElm = imgLength;
			else centrElm = indexCurrent - 1;

			if ((centrElm - 1) > 0) leftElm = centrElm - 1;
			else leftElm = imgLength;

			if ((leftElm - 1) > 0) preLeft = leftElm - 1;
			else preLeft = imgLength;

			if ((preLeft - 1) > 0) dopPreLeft = preLeft - 1;
			else dopPreLeft = imgLength;

			rightElm = indexCurrent;

			if ((rightElm + 1) > imgLength) preRight = 1;
			else if ((rightElm + 1) === imgLength) preRight = imgLength;
			else preRight = rightElm + 1;

			if ((preRight + 1) > imgLength) dopPreRight = 1;
			else if ((preRight + 1) === imgLength) dopPreRight = imgLength;
			else dopPreRight = preRight + 1;

		}	else {

			$sliderLayout.animate({
				"margin-left": "-=" + magic + "%"
			}, timeAnimationButton);

			ctrlAnimation($sliderLayout, 3, "65%", "4.5%", timeAnimationButton);
			ctrlAnimation($sliderLayout, 4, "80%", "2.5%", timeAnimationButton);
			$sliderLayout.find('.slider-elm:nth-of-type(5)').css("z-index", 7);
			ctrlAnimation($sliderLayout, 5, "100%", 0, timeAnimationButton);
			ctrlAnimation($sliderLayout, 6, "80%", "2.5%", timeAnimationButton);

			if (indexCurrent === imgLength) centrElm = 1;
			else centrElm = indexCurrent + 1;

			if ((centrElm + 1) > imgLength) rightElm =  1;
			else rightElm = centrElm + 1;

			if ((rightElm + 1) > imgLength) preRight = 1;
			else preRight = rightElm + 1;

			if ((preRight + 1) > imgLength) dopPreRight = 1;
			else dopPreRight = preRight + 1;

			leftElm = indexCurrent;

			if (leftElm === 1) preLeft = imgLength;
			else preLeft = leftElm - 1;

			if (preLeft === 1) dopPreLeft = imgLength;
			else dopPreLeft = preLeft - 1;

		}
		$imgMass.find(":nth-of-type(" + centrElm + ")").addClass('current');
		setTimeout(refresh, timeAnimationButton, dopPreLeft, preLeft, leftElm, centrElm, rightElm, preRight, dopPreRight);
	});
});

wrSliderBody.mouseup(function(e) {
	wrSliderBody.unbind('mousemove');
	$(this).css("cursor", "default");
});

wrSliderBody.mouseout(function(e) {
	wrSliderBody.unbind('mousemove');
	$(this).css("cursor", "default");
});

wrSliderBody.mousedown(function() {
	$(this).css("cursor", "pointer");
});

kirkinInit();
