$(document).ready(function() {
	var list;
	var randomList = [];
	var sum = 0;
	$.ajax({
		type: "get", //使用get方式
		url: "json/recipe.json", //json文件相对于这个HTML的路径
		dataType: "json",
		success: function(rtn) {
			list = rtn;
			for (let i = 0; i < list.length; i++) {
				sum += parseInt(list[i].WEIGHT);
				for (let j = 0; j < list[i].WEIGHT; j++) {
					randomList.push(i);
				}
			}
		}
	});
	
	var run = 0,
		heading = $("h1"),
		timer;
	
	$("#start").click(function() {
		if (!run) {
			heading.html(heading.html().replace("吃这个！", "吃什么？"));
			$(this).val("停止");
			timer = setInterval(function() {
				var a = Math.floor((Math.random()*sum));
				console.log(randomList[a]);
				food = list[randomList[a]].FOOD_NAME;	
				$("#what").html(food);
				var rTop = Math.ceil(Math.random() * $(document).height()),
					rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
					rSize = Math.ceil(Math.random() * (37 - 14) + 14);
				$("<span class='temp'></span>").html(food).hide().css({
					"top": rTop,
					"left": rLeft,
					"color": "rgba(0,0,0,." + Math.random() + ")",
					"fontSize": rSize + "px"
				}).appendTo("body").fadeIn("slow", function() {
					$(this).fadeOut("slow", function() {
						$(this).remove();
					});
				});
			}, 50);
			run = 1;
		} else {
			heading.html(heading.html().replace("吃什么？", "吃这个！"));
			$(this).val("不行，换一个");
			clearInterval(timer);
			run = 0;
		};
	});
})

document.onkeydown = function enter(e) {
	var e = e || event;
	if (e.keyCode == 13) $("#start").trigger("click");
};


