
# 背景
知乎使用了几年，个人动态数量有很多，但知乎的隐私设置很让人无语：动态在 web 端无法删除；只能在 app 上逐条操作，没有批量接口  

# 实现
知乎识别了模拟器，因此无法直接抓包，必须借助手机  
我在电脑上通过 fiddler 设置代理并导出证书(.cer)，然后在手机上配置，最后使用 fiddler Custom Rules 根据接口批量爬取动态并删除

![Usage](ZhiHuDelete.png)

# 脚本

```js
    import System.Threading;

    static function OnBeforeResponse(oSession: Session) {
        if (m_Hide304s && oSession.responseCode == 304) {
            oSession["ui-hide"] = "true";
        }

		if(oSession.HostnameIs("api.zhihu.com") && oSession.uriContains("moments/activity?item_brief=")) {
			oSession["ui-backcolor"] = "lime";
		}

		if(oSession.HostnameIs("api.zhihu.com") && oSession.uriContains("moments/") && oSession.uriContains("/activities?") && oSession.uriContains("action_feed=true")) {
			oSession["ui-backcolor"] = "lime";

			oSession.utilDecodeResponse();
			var oBody = System.Text.Encoding.UTF8.GetString(oSession.responseBodyBytes);
			var rsp = Fiddler.WebFormats.JSON.JsonDecode(oBody);

			{
				var data = rsp.JSONObject["data"];
				for (var i = 0; i < data.Count; i++){
					var raw = "DELETE " + "https://api.zhihu.com/moments/activity?item_brief=" + Utilities.UrlEncode(data[i]['brief']) + " HTTP/1.1\r\n";
					FiddlerApplication.Log.LogString(raw);

					for (var j = 0; j < oSession.oRequest.headers.Count(); j++) {
						var header = oSession.oRequest.headers[j];
						raw += header + "\r\n";
					}

					raw += "\r\n" + oSession.GetRequestBodyAsString();
					FiddlerObject.utilIssueRequest(raw);
					Thread.Sleep(1000)
				}
			}

			{
				var raw = "GET " + rsp.JSONObject["paging"]['next'] + "&action_feed=true&reverse_order=0" + " HTTP/1.1\r\n";
				FiddlerApplication.Log.LogString(raw);

				for (var j = 0; j < oSession.oRequest.headers.Count(); j++) {
					var header = oSession.oRequest.headers[j];
					raw += header + "\r\n";
				}

				raw += "\r\n" + oSession.GetRequestBodyAsString();
				FiddlerObject.utilIssueRequest(raw);
				Thread.Sleep(1000)
			}
		}
    }
```

# 关注、话题、问题、专栏

知乎关注、话题、问题、专栏，在 web 端有取消接口，因此简单很多，使用 Chrome DevTools 分析后用 Console 跑脚本即可  
对应脚本在 chrome_snippets.js 中  
fetch 时 HTTP Header 相关参数，可以手动触发一条取消请求后抓包，然后 Copy as Node.js fetch
