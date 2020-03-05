$(function(){
	var $slide = $('.slide');

	//获取所以的幻灯片
	var $li = $('.slide_list li');
    //获取幻灯片的个数
	var $len = $li.length;

	var $prev = $('.prev');
	var $next = $('.next');

	//获取小圆点的容器
	var $points_con = $('.points');

	//获取小圆点
	var $points = $('.points li');

	//要运动过来的幻灯片索引值
	var nowli = 0;

	//要离开的幻灯片索引值
	var prevli = 0;

	var timer = null;

	var ismove = false;

	//第一个幻灯片不动，将其它的幻灯片放到右边去
	//排除第一个幻灯片，给其余幻灯片设置样式
	$li.not(':first').css({'left':996});


	//点击小圆点切换幻灯片,绑定click事件
	$points.click(function(){
		nowli = $(this).index();

		//修复重复点击小圆点的bug
		//注意是==
		if(nowli == prevli)
		{
			return;
		}
		$(this).addClass('active').siblings().removeClass('active');
		//底下有专门定义的move()函数
		move();
	})

	//点击向前的按钮切换幻灯片
	$prev.click(function(){
		//防止暴力操作
		if(ismove)
		{
			return;
		}
		ismove = true;

		nowli--;
		move();

		$points.eq(nowli).addClass('active').siblings().removeClass('active');

	})

	//点击向后的按钮切换幻灯片
	$next.click(function(){
		if(ismove)
		{
			return;
		}
		ismove = true;

		nowli++;
		move();
		$points.eq(nowli).addClass('active').siblings().removeClass('active');
	})


	//设置定时器，2000ms自动播放
	timer = setInterval(autoplay,3000);

	$slide.mouseenter(function(){
		clearInterval(timer);
	})
	$slide.mouseleave(function(){
		timer = setInterval(autoplay,3000);
	})

	function autoplay(){
		nowli++;
		move();
		$points.eq(nowli).addClass('active').siblings().removeClass('active');
	}

	//幻灯片运动函数，通过判断nowli和prevli的值来移动对应的幻灯片
	function move(){
		//第一张幻灯片再往前的时候，也就是最后一张幻灯片要过来
		if(nowli<0)
		{
			//最后一张幻灯片的索引值等于$len-1
			nowli = $len-1;
			prevli = 0;
			//从左边过来
			$li.eq(nowli).css({'left':-996});
			$li.eq(nowli).animate({'left':0});
			$li.eq(prevli).animate({'left':996},function(){
				ismove = false;
			});
			prevli = nowli;
			return;
		} 

		//最后一张幻灯片再往后的时候
		if(nowli>$len-1)
		{
			nowli = 0;
			prevli = $len-1;
			//从右边过来
			$li.eq(nowli).css({'left':996});
			$li.eq(nowli).animate({'left':0});
			$li.eq(prevli).animate({'left':-996},function(){
				ismove = false;
			});
			prevli = nowli;
			return;
		}

		//幻灯片从右边过来,从小到大
		if(nowli > prevli)
		{
			//首先把要过来的幻灯片放到右边去
			$li.eq(nowli).css({'left':996});
			
			//要离开的幻灯片移到左边去
			$li.eq(prevli).animate({'left':-996});
			
		} 
		//幻灯片从左边过来 ！！ 
		else{
			//把要过来的幻灯片先放在左边去
			$li.eq(nowli).css({'left' :-996});
			
			$li.eq(prevli).animate({'left':996});
			
		}

		//默认显示的幻灯片是0
		$li.eq(nowli).animate({'left':0},function(){
			ismove = false;
		});
		prevli = nowli;

	}
	
})