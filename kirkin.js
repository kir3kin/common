(function($) {

	var $wrSlider = $(".kirkin-slider");
	var $imgMass = $wrSlider.find(".slider-items");//													блок с изображениями
	var $sliderLayout = $wrSlider.find(".slider-layout");//										блок с элементами переключения
	var wrSliderBody = $(".slider-body");
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

	var posPrevLeft = function(firsElm, imgLength) {
		if ((firsElm - 1) > 0) return firsElm - 1;
		else return imgLength;
	};

	var posPrevRight = function(mainElm, imgLength) {
		if ((mainElm + 1) > imgLength) return 1;
		else if ((mainElm + 1) === imgLength) return imgLength;
		else return mainElm + 1;
	};

	var posNextRight = function(mainElm, imgLength) {
		if ((mainElm + 1) > imgLength) return  1;
		else return mainElm + 1;
	};

	var posNextLeft = function(mainElm, imgLength) {
		if (mainElm === 1) return imgLength;
		else return mainElm - 1;
	};

	var ctrlPrev = function(indexCurrent) {
		$sliderLayout.animate({
			"margin-left": "+=" + magic + "%"
		}, timeAnimationButton);

		$sliderLayout.find('.slider-elm:nth-of-type(3)').css("z-index", 7);
		ctrlAnimation($sliderLayout, 2, "80%", "2.5%", timeAnimationButton);
		ctrlAnimation($sliderLayout, 3, "100%", 0, timeAnimationButton);
		ctrlAnimation($sliderLayout, 4, "80%", "2.5%", timeAnimationButton);
		ctrlAnimation($sliderLayout, 5, "65%", "4.5%", timeAnimationButton);

		if (indexCurrent === 1) centrElm = imgLength;
		else centrElm = indexCurrent - 1;

		rightElm = indexCurrent;
		leftElm = posPrevLeft(centrElm, imgLength);
		preLeft = posPrevLeft(leftElm, imgLength);
		dopPreLeft = posPrevLeft(preLeft, imgLength);
		preRight = posPrevRight(rightElm, imgLength);
		dopPreRight = posPrevRight(preRight, imgLength);
	};

	var ctrlLeft = function(indexCurrent) {
		$sliderLayout.animate({
			"margin-left": "-=" + magic + "%"
		}, timeAnimationButton);

		$sliderLayout.find('.slider-elm:nth-of-type(5)').css("z-index", 7);
		ctrlAnimation($sliderLayout, 3, "65%", "4.5%", timeAnimationButton);
		ctrlAnimation($sliderLayout, 4, "80%", "2.5%", timeAnimationButton);
		ctrlAnimation($sliderLayout, 5, "100%", 0, timeAnimationButton);
		ctrlAnimation($sliderLayout, 6, "80%", "2.5%", timeAnimationButton);

		if (indexCurrent === imgLength) centrElm = 1;
		else centrElm = indexCurrent + 1;

		leftElm = indexCurrent;
		rightElm = posNextRight(centrElm, imgLength);
		preRight = posNextRight(rightElm, imgLength);
		dopPreRight = posNextRight(preRight, imgLength);
		preLeft = posNextLeft(leftElm, imgLength);
		dopPreLeft = posNextLeft(preLeft, imgLength);
	};

	var kirkinInit = function() {
		console.assert(imgLength > 3, "I NEED MORE COOKIES(IMAGES)!!!");// debug
		var delay = function() {
			if (state) return true;
			state = true;
			setTimeout(function() { state = false }, timeAnimationButton + 60);
		};

		refresh((imgLength - 2) ? imgLength - 2 : 1, imgLength - 1, imgLength, 1, 2, 3, (4 <= imgLength) ? 4 : imgLength - 1);

		$wrSlider.find(".controls div").click(function () {
			if (delay()) return;

			var indexCurrent = $(this).parent().siblings(".slider-items").find(".current").index() + 1;
			$(this).parent().siblings(".slider-items").find(".current").removeClass("current");

			if ($(this).attr("class") === "ctrl-prev") {
				ctrlPrev(indexCurrent);
			}
			else {
				ctrlLeft(indexCurrent);
			}

			$imgMass.find(":nth-of-type(" + centrElm + ")").addClass('current');
			setTimeout(refresh, timeAnimationButton, dopPreLeft, preLeft, leftElm, centrElm, rightElm, preRight, dopPreRight);
		});


		var k = $(".ctrl-prev");
		var l = $(".ctrl-next");
		var wrSlider = $(document);

		var automatClick = function() {
			return setInterval(function() {
				$(".ctrl-next").trigger('click');
			}, timeAnimationAuto);
		};

		var intervalID = automatClick();
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

		wrSlider = $(".kirkin-slider");

		wrSlider.hover(function() {
			clearInterval(intervalID);
		}, function() {
			intervalID = automatClick();
		});


		wrSliderBody.mousedown(function(e) {
			var start = e.offsetX;
			var satturn = Number($(".slider-layout").css("margin-left").slice(0, -2));

			wrSliderBody.mousemove(function(e) {
				if (delay()) return;
				var indexCurrent = $(this).parent().find(".current").index() + 1;
				$(this).parent().find(".current").removeClass("current");

				var needMe = e.offsetX - start;
				if (needMe > 0) {
					ctrlPrev(indexCurrent);
				}	else {
					ctrlLeft(indexCurrent);
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

	};//end kirkin


	kirkinInit();

}(jQuery));
