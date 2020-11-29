$(function () {
	//drawer.js
	$(".drawer").drawer();

	// スムーススクロール
	$('a[href^="#"]').click(function () {
		let speed = 500;
		let href = $(this).attr("href");
		let target = $(href == "#" || href == "" ? "html" : href);
		let position = target.offset().top;
		$("html, body").animate(
			{
				// トップからjs-headerクラスをつけたヘッダーの高さ分を引く
				scrollTop: position - $("#js-header").outerHeight(),
			},
			speed,
			"swing"
		);
		return false;
	});

	// wowjs
	new WOW().init();

	// google form
	// submitされたときにajaxが走る
	let $form = $("#js-form");
	$form.submit(function (e) {
		$.ajax({
			url: $form.attr("action"),
			data: $form.serialize(),
			type: "POST",
			dataType: "xml",
			statusCode: {
				0: function () {
					//送信に成功したときの処理
					$form.slideUp();
					$("#js-success").slideDown();
				},
				200: function () {
					//送信に失敗したときの処理
					$form.slideUp();
					$("#js-error").slideDown();
				},
			},
		});
		return false;
	});

	// formの入力確認
	let $submit = $("#js-submit");
	$("#js-form input, #js-form textarea").on("change", function () {
		if (
			$('#js-form input[type="text"]').val() !== "" &&
			$('#js-form input[type="email"]').val() !== "" &&
			$('#js-form input[name="entry.320107548"]').prop("checked") === true
		) {
			// すべて入力されたとき
			$submit.prop("disabled", false);
			$submit.addClass("-active");
		} else {
			// すべての項目が入力されていないとき
			$submit.prop("disabled", true);
			$submit.removeClass("-active");
		}
	});
});
