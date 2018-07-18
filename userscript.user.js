// ==UserScript==
// @name         Упячкоскрипт
// @namespace    http://thirdwave.kl.com.ua/sub/wolfram00
// @version      0.1
// @description  ЧоЧо скриптэ
// @author       wolfram00 <wolfram00@bk.ru>
// @match        http://thirdwave.kl.com.ua/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	var access_token = getCookie("access_token");
	up4k.pages.comment = function () {
		if(up4kURL[1]) {
			$.ajax({
				"url": up4k.config.apiUrl,
				"data": {
					"method": "comment.info",
					"access_token": access_token,
					"id": up4kURL[1],
				},
				"success": function (data) {
					if(data.success) {
						var success = data.success;
						if(typeof success !== "object")
						{
							up4k.error("API какого-то хуя вернул не объект");
						}
						else
						{
							up4k.setTitle(`Комментарий #${up4kURL[1]}`);
							$("#up4k").html(`<div id="commentPage"></div>`);
							var commentTemplate = _.template(up4k.templates.comment);
							commentTemplate = commentTemplate({comment: success, misc: {idInLink: false, replyLink: false}});
							$("#commentPage").html(commentTemplate);
						}
					}
					else {
						var error = data.error || "Ответ пуст";
						up4k.error(error);
					}
				},
				"error": function (data)
				{
					var errorString = `Ошибка сервера: ${data.status} ${data.statusText}`;
					up4k.error(errorString);
				}
			});
		}
	};
})();
