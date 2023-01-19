$(document).ready(function () {
	$("body").css({'visibility': "visible", "opacity": "1"});


	
	SmoothScroll({
		// Время скролла 400 = 0.4 секунды
		animationTime: 1000,
		// Размер шага в пикселях 
		stepSize: 100,
	
		// Дополнительные настройки:
	
		// Ускорение 
		accelerationDelta: 3,
		// Максимальное ускорение
		accelerationMax: 2,
	
		// Поддержка клавиатуры
		keyboardSupport: true,
		// Шаг скролла стрелками на клавиатуре в пикселях
		arrowScroll: 50,
	
		// Pulse (less tweakable)
		// ratio of "tail" to "acceleration"
		pulseAlgorithm: true,
		pulseScale: 4,
		pulseNormalize: 1,
	
		// Поддержка тачпада
		touchpadSupport: true,
	})


	new WOW().init();

	$(".m-bg-cont").each(function() {
		var img = $(this).find("img:first-of-type").attr("src");
		$(this).css("background-image", "url(" + img + ")");
	});


	$(".start__road").css( "height", "" + $(".start__road").height() + "px" )

	function positionTheDot() {

		// ROAD1
		var osvg = document.querySelector(".start__road")
		var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (osvg.offsetHeight + osvg.offsetTop - document.documentElement.clientHeight);
		
		
		var path = document.getElementById("theMotionPath");
		var pathLen = path.getTotalLength();
		
		var pt = path.getPointAtLength(scrollPercentage * pathLen);

		var dot = document.getElementById("dot");
		
		var xCor = pt.x
		var yCor = pt.y

		dot.style.top = yCor
		dot.style.left = xCor

		
		// FIXED ROAD
		var rSvg = document.querySelector('.start__road-path')
		if ( scrollPercentage <= 1 && scrollPercentage >= 0 ) {
			rSvg.style.position = "relative";
			rSvg.style.right = "unset";
			rSvg.style.bottom = "unset";
		} else if (scrollPercentage >= 1) {
			rSvg.style.position = "fixed";
			rSvg.style.right = "15px";
			rSvg.style.bottom = "0px";
			rSvg.style.paddingBottom = "50px";
		}


		//CIRCLE
		var startCir = document.querySelector(".start__circle")
		var startSvg = document.querySelector(".start__circle-container")
		var scrollPercentageCir = (document.documentElement.scrollTop + document.body.scrollTop - startCir.offsetTop + (document.documentElement.clientHeight - startSvg.offsetHeight) / 2) / (startCir.offsetHeight - startSvg.offsetHeight);
		
		var pathCir = document.getElementById("cirRoad");
		var pathCirLen = pathCir.getTotalLength();
		
		
		var ptCir = pathCir.getPointAtLength(scrollPercentageCir * pathCirLen);

		
		var cirMarker = document.getElementById("cirMarker");
		
		
		var xCorCir = ptCir.x
		var yCorCir = ptCir.y
		
		cirMarker.setAttribute("cx", xCorCir);
		cirMarker.setAttribute("cy", yCorCir);
		// cirMarker.style.top = yCorCir
		// cirMarker.style.left = xCorCir

		
		// FIX 0 BUG
		if (scrollPercentageCir <= 0) {
			cirMarker.setAttribute("cx", "414.375");
			cirMarker.setAttribute("cy", "219.375");
		}

		// FIXED
		if ( scrollPercentageCir <= 1 && scrollPercentageCir >= 0 ) {
			startSvg.style.position = "fixed";
			startSvg.style.left = "50%";
			startSvg.style.top = "50%";
			startSvg.style.bottom = "unset";
			startSvg.style.transform = ("translateX(-50%) translateY(-50%)");
		} else if (scrollPercentageCir >= 1) {
			startSvg.style.position = "fixed";
			startSvg.style.left = "50%";
			startSvg.style.top = "50%";
			startSvg.style.bottom = "unset";
			startSvg.style.transform = ("translateX(-50%) translateY(-50%)");
		} else {
			startSvg.style.position = "relative";
			startSvg.style.left = "unset";
			startSvg.style.top = "unset";
			startSvg.style.bottom = "unset";
			startSvg.style.transform = ("translateX(0%) translateY(0%)");
		}


		// PERSENTAGE
			
		var prog = document.getElementById("prog");
		var progLength = prog.getTotalLength();

		var curDash = ((progLength * scrollPercentageCir) - progLength) * -1
		
		if( scrollPercentageCir <= 1 && scrollPercentageCir >= 0 ) {
			prog.setAttribute("stroke-dashoffset", "" + curDash + "");
		} else if ( scrollPercentageCir <= 1) {
			prog.setAttribute("stroke-dashoffset", "1225.393310546875");
		} else if ( scrollPercentageCir >= 0) {
			prog.setAttribute("stroke-dashoffset", "0");
		}

		// TEXT
		if ( scrollPercentageCir <= 0.25) {
			$('.start__circle-container-text').removeClass('active')
			$('#start__text1').addClass('active')
		} else if ( scrollPercentageCir <= 0.5 && scrollPercentageCir >= 0.251 ) {
			$('.start__circle-container-text').removeClass('active')
			$('#start__text2').addClass('active')
		} else if ( scrollPercentageCir <= 0.75 && scrollPercentageCir >= 0.51 ) {
			$('.start__circle-container-text').removeClass('active')
			$('#start__text3').addClass('active')
		} else if ( scrollPercentageCir >= 0.751 ) {
			$('.start__circle-container-text').removeClass('active')
			$('#start__text4').addClass('active')
		}

		// SECOND
		var startSec = document.querySelector(".sec")
		var startSecRoad = document.querySelector(".cbig")
		var startSecCont = document.querySelector(".second")
		var scrollPercentageSec = (document.documentElement.scrollTop + document.body.scrollTop - startSec.offsetTop + document.documentElement.clientHeight) / (startSec.offsetHeight);
		var scrollPercentageSecRoad = (document.documentElement.scrollTop + document.body.scrollTop - startSecRoad.offsetTop + document.documentElement.clientHeight) / (startSecRoad.offsetHeight);
		
		var currRight = (scrollPercentageSec * 100) - 100
		if ( scrollPercentageSec <= 1 && scrollPercentageSec >= 0 ) {
			startSecCont.style.right = "" + currRight + "vw";
		} else if (scrollPercentageSec <= 0 ) {
			startSecCont.style.right = "-100vw";
		} else if (scrollPercentageSec >= 1 ) {
			startSecCont.style.right = "0vw";
		} 

		
		var path2 = document.getElementById("second__road");
		var path2Len = path2.getTotalLength();
		
		var pt2 = path2.getPointAtLength(scrollPercentageSecRoad * path2Len);

		var ship = document.getElementById("ship");
		var air = document.getElementById("air");
		
		var xCor2 = pt2.x
		var yCor2 = pt2.y

		ship.style.top = yCor2
		ship.style.left = xCor2
		air.style.top = yCor2
		air.style.left = xCor2

		if ( scrollPercentageSecRoad >= 0.25 ) {
			air.style.opacity = "1";
			ship.style.opacity = "0";
		} else {
			air.style.opacity = "0";
			ship.style.opacity = "1";
		}
	};
	
	
	window.addEventListener("scroll", positionTheDot);
	
	
	positionTheDot();


	// SWIPER 
	
	var swiper = new Swiper(".second__container-swiper", {
        spaceBetween: 300,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
	});


})