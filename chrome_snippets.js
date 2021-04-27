
// 关注 https://www.zhihu.com/people/ripwu/following

{
    setInterval(function(){
        location.reload();
    }, 3000);

    $$(".FollowButton").forEach(function(value,index,array) {
        value.click();
    })
}

// 问题 https://www.zhihu.com/question/following

function request(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.zhihu.com/question/following");
    xhr.onload = function() {
        callback(xhr.response);
    };
    xhr.send();
}

function next() {
    request(function(response) {
        var doc = new DOMParser().parseFromString(response, "text/html");

        var links = doc.getElementsByClassName("question_link");    // use doc instead of document (doc will be the newly requested document/page)
        if (links.length > 0) {
            for (let i = 0; i < links.length ; i++) {
                var question = links[i].getAttribute('data-id');
                console.log("question ", question);

                fetch("https://www.zhihu.com/node/QuestionFollowBaseV2", {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
                        "cache-control": "no-cache",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "pragma": "no-cache",
                        "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                        "x-xsrftoken": "QePG9CYBBihhR3r2UvOy5fQHvcbNHSq8",
                        "cookie": "_xsrf=QePG9CYBBihhR3r2UvOy5fQHvcbNHSq8; d_c0=\"ALDo621gVw-PTudI1Sqhcup4GMomED4XhyU=|1556341787\"; __utmc=51854390; __utmv=51854390.100-1|2=registration_date=20110520=1^3=entry_date=20110520=1; _ga=GA1.2.198496672.1558659812; tst=r; _zap=76eca5d9-f02f-4299-927d-233765eb271d; __snaker__id=eu64I4CoR1s25dfV; _9755xjdesxxd_=32; l_n_c=1; l_cap_id=\"NGY1YTJkNGU2ZDMxNDhiOTk5NmVjMGE0MDY5MTA2OTM=|1619485488|3791ba2eb4a897bc6ba8649f9d966575b750f140\"; r_cap_id=\"YThmOWZhN2M1NGZlNDY0YmFhZDcyMDcxNzkzZjE4OTU=|1619485488|1b9a71c2b2ec892f19234e2e6791b031e4c51586\"; cap_id=\"MjRhMDkxZDZjNmI4NDM5Y2JmNGNjNmMwYTNmYWM5ZDU=|1619485488|f88fc144453efdd75888a74bbca08cf7549b91fb\"; n_c=1; YD00517437729195%3AWM_NI=76Pj2HXivBsFtMOF96j471KYBPD1Ly7gmm78OkZbj6tTRJGZpx8pVyshGcHNPv3qJHdcssKEKYx4ekAgUctbnN15RYM3H78pWlhDCpmtjjHYxKT3Q2W2O%2BJUQp7TJ70BR2w%3D; YD00517437729195%3AWM_NIKE=9ca17ae2e6ffcda170e2e6ee8dee428eb3a788cd7489b48fa3d54a868f8aafae7df4928e90b72198969d9ac42af0fea7c3b92af5eaa08bb1449cb7baa3f24eb89381a7bc3eaaecf9d2ca5382908cd2cf73f5b9a38eb6348db59683e93eb88c9eabc652b4a8f891d573b1b88984cb4694aafd92c944a8bdbd94ca4f8987b8d5e86183b99b84f76aae92ffd6d1538fed88d8bb7c95b4a8a5c27cafaca68bcb53bc959cd4d43a95ee81ccc95f93b0f9b5c93df49e9ed3f637e2a3; YD00517437729195%3AWM_TID=iuF2ttNVHmlAFRBBUBN%2FwxYAo46TMXmQ; captcha_session_v2=\"2|1:0|10:1619501231|18:captcha_session_v2|88:eGZxMitlZVNHVlpuVmU4WXIxNXdJQnc0YjA2VzFNdElaY0IyZnY0cmQxYlYzQ3ArdVAzdmFyanN5d0RWZUFzaw==|f14eca11c740aac0bbf17530bb931d98d0d9c21eaf15d2a710c1485cef34589e\"; gdxidpyhxdE=Kn5AVPJ2rypuQyVl8UgwXMs5ZPOr9az%2FUpRfOEHecJ45UPrR%2Fqash0AZ%2FijI3z%2Fy8I5d0SzCoC1h99XvglZpl3s1%2B1QhAhN5hun5qmbQ3cXYoPzqxsSmqZlkY6Ze%2F8gVSZ1lKnc2NyOXcTw0sQjlsLeOHRQRKUpofKwA1lZltttEU3uM%3A1619502136265; captcha_ticket_v2=\"2|1:0|10:1619501243|17:captcha_ticket_v2|704:eyJ2YWxpZGF0ZSI6Ik5BTlBfenVHUWpDbW9iWUhTT1B5YnprQkZBLnJrUUNDaTZkeXlXaVFjbThDdmdCOG9jRE5yODhCeXoxZ2xjdjVLaWVIQzllQnZxSjFsalFucXllMmEuOVlORDl6YjRsOS1pN0xzVFl5WVFjR0Q2MU5mU0pWREs1MkxONUhQNnl3ai1maHNIbnA4eDFLcWtKUHplTlBDOUhhY2VoMF9OWmRHUWlEWWNaT1djcXBpSnAwc01nWWJoeU03TXJJaVlvSXphN21yTUw3LkFLT3plSzU0Z0pRbDdZTFg3QlFiMTVSOFk5TUlaNlZ2WXlNQ2dPUG90YjhyTjBaUUg5eGVpd3NKLldWejdJbEhUTWxVME5IRy5XOUQyNHdNQnVyYjFweGxpdmFZby56ZTlFalExdnVHMVllc1BaVk1LR2FkVTVKLnVjdFlNaktIQUNMV0hnTy1jd1p0cnUuTWxjZUFPRFBvMXVaR2JJWTA2NUUyVXJUUy5mRlNJcnp1b1ljNFBFdzRpQ1BfV2pnOFN0ZmhfTHl2a2VyLUJyWEVpMUNYVFRPbHpUNXJEQ3NaSzhOZFlLMTdBVEJOX3g4WDRVWU5OejhNOFFiMS04cTF6TDdiUUhVSXBEZHNBaS51eVBiQmljZ2E5dDJqYi5kU0hidExOTHFZcUw0TExYQXpvZ0lKVzJtMyJ9|9c577c976e8a841306250066c61a5af9efa6350119a0d53840245126fa38e1b1\"; z_c0=\"2|1:0|10:1619501243|4:z_c0|92:Mi4xTldVQUFBQUFBQUFBc09qcmJXQlhEeVlBQUFCZ0FsVk51LTUwWVFDNE93bTNsMi1zbjZEWDBGbVNhUk8yUm1raThR|33676927be0c0f6bd19c63e45b86f681c16923bd49049bca18dd66dbeb85979f\"; q_c1=555b9edf1df044018627e8c93ba46cfd|1619501310000|1557379083000; SESSIONID=OGARC7JxFd0dVPRTsDQuUSAu9ANxqitxcjFZPWj8PvU; JOID=U18cAEs2gjsDaqLvUzQlYAvmkKtKf8twUiiTqyFx4AVtP_O7CWUgtWFtqutaNGjC8icz5KcHVExG19W-HtZQxiY=; osd=VVgcC0wwhTsIbaToUz8iZgzmm6xMeMt7VS6Uqyp25gJtNPS9DmUrsmdqquBdMm_C-SA146cMU0pB1965GNFQzSE=; __utma=51854390.198496672.1558659812.1619505840.1619508358.6; __utmb=51854390.0.10.1619508358; __utmz=51854390.1619508358.6.2.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/question/following; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1619502113,1619502115,1619502127,1619510467; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1619516652; KLBRSID=031b5396d5ab406499e2ac6fe1bb1a43|1619516791|1619501229"
                    },
                    "referrer": "https://www.zhihu.com/question/following",
                    "referrerPolicy": "no-referrer-when-downgrade",
                    "body": "method=unfollow_question&params=%7B%22question_id%22%3A%22" + question + "%22%7D",
                    "method": "POST",
                    "mode": "cors"
                });
            }

            setTimeout(next, 3000);
        }
    });
}

next();

// 话题 https://www.zhihu.com/people/ripwu/following/topics

setInterval(function(){
    location.reload();
}, 3000);

$$(".TopicLink").forEach(function(value,index,array) {
    console.log("href ", value.href);

    var topic = value.href.replace("https://www.zhihu.com/topic/", "");
    var url = 'https://www.zhihu.com/api/v4/topics/' + topic + '/followers';
    console.log("url ", url);

    fetch(url, {
        "headers": {
          "accept": "*/*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-ab-param": "se_ffzx_jushen1=0;tp_topic_style=0;li_panswer_topic=0;pf_noti_entry_num=2;top_test_4_liguangyi=1;tp_zrec=1;li_edu_page=old;li_sp_mqbk=0;zr_slotpaidexp=1;zr_expslotpaid=4;qap_question_visitor= 0;tp_dingyue_video=0;li_paid_answer_exp=0;li_vip_verti_search=0;qap_question_author=0;pf_adjust=1;tp_contents=1",
          "x-ab-pb": "CnhqAVsCsQLsCtwLtAC5AuQKdAFPATsCtwDHAjQMiQy1C8ECaQFFAj8AZwBWDA8Lmwu6Am0CKgKEApACzALgCwoCTAuNAUMAGwDXC88LnwLCAlILiAG7AmsBtApHAEABfQLAAgELBwyMAr8CNwyJAqYBygJgC1gB9AsSPAAAAAEAAAsAAAAAAAAAAAMAAgAAAAEBAAAAAAAAAAAAAAAVAAALAAEBAAACAAABAQABAQAAAQAAAAAAAA==",
          "x-requested-with": "fetch",
          "x-xsrftoken": "QePG9CYBBihhR3r2UvOy5fQHvcbNHSq8",
          "x-zse-83": "3_2.0",
          "x-zse-86": "2.0_aXF8e49Br_NYFutBs0N0Hbr8Ng2YeXOyTBYBr09qFCSp",
          "x-zst-81": "3_2.0ae3TnRUTEvOOUCNMTQnTSHUZo02p-HNMZBO8YD706XtueT20K6P0ETuy-LS9-hp1DufI-we8gGHPgJO1xuPZ0GxCTJHR7820XM20cLRGDJXfgGCBxupMuD_Ie8FL7AtqM6O1VDQyQ6nxrRPCHukMoCXBEgOsiRP0XL2ZUBXmDDV9qhnyTXFMnXcTF_ntRueTh_X09hUGoBgsOwCMB9xMoQo9wB2KLbHMs9SCUgu9UJOszBgqjhpK2hw9ICLPvLc8FcSYYrVBk4csTCeL5GoB26x0khpVSQXGxDSBIUpBV9SfwqF10bXLfccLN9NYsDxmmHFYb6rMVwYGkMNYhGCLnvC0rrX8YCO9xgVmzhOycCe1YCXm4qfzCgLfihY1CCN0jBgf9gVCoUFMuU3M8BVyjqr1aGSp99c_ywO9kbS8huwKoBgmHqSVarp0jDcXe0of4UFK39S8fvNBSwYMGHe8ZvxmbB2Vw9YG-wHC6A9C"
        },
        "referrer": "https://www.zhihu.com/topic/" + topic + "/hot",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "DELETE",
        "mode": "cors",
        "credentials": "include"
    });
})


// 专栏 https://www.zhihu.com/people/ripwu/following/columns

function request(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.zhihu.com/people/ripwu/following/columns");
    xhr.onload = function() {
        callback(xhr.response);
    };
    xhr.send();
}

function next() {
    request(function(response) {
        var doc = new DOMParser().parseFromString(response, "text/html");

        var links = doc.getElementsByClassName("ColumnLink");    // use doc instead of document (doc will be the newly requested document/page)
        if (links.length > 0) {
            for (let i = 0; i < links.length ; i++) {
                var column = links[i].href.replace("https://www.zhihu.com/column/", "");
                var url = 'https://zhuanlan.zhihu.com/api/columns/' + column + '/followers';
                console.log("url ", url);

                fetch(url, {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
                        "cache-control": "no-cache",
                        "pragma": "no-cache",
                        "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "x-ab-param": "tp_contents=1;li_paid_answer_exp=0;zr_slotpaidexp=1;li_edu_page=old;zr_expslotpaid=4;li_sp_mqbk=0;qap_question_visitor= 0;se_ffzx_jushen1=0;qap_question_author=0;top_test_4_liguangyi=1;li_vip_verti_search=0;pf_noti_entry_num=2;tp_dingyue_video=0;tp_zrec=1;tp_topic_style=0;li_panswer_topic=0;pf_adjust=1",
                        "x-ab-pb": "CnhDAIgBPwD0C7ULTwGQApsLZwB9AroCtwBFAlsCAQvHAuwKawGfArkCygLkCsACwgI0DL8CUguxAokMRwC7AjsCBwyEAkABKgLgC2kBVgx0AbQKGwAKAmoBbQLcC7QAjQHPC0wLpgHMAjcMjAJYAcEC1wtgC4kCDwsSPBUAAAADAAAAAAEAAAAAAQABAgALAAAAAQAAAQAAAAAAAQABAAACAQAAAAAAAAAAAAsAAAABAAAAAAAAAQ==",
                        "x-requested-with": "fetch",
                        "x-xsrftoken": "QePG9CYBBihhR3r2UvOy5fQHvcbNHSq8",
                        "x-zse-83": "3_2.0",
                        "x-zse-86": "2.0_a_t0NrLy6LYfQ0Y8GHF8bAXBNCtpFwNBZBO8HJLBUhtf",
                        "x-zst-81": "3_2.0ae3TnRUTEvOOUCNMTQnTSHUZo02p-HNMZBO8YD706XtueT20K6P0ETuy-LS9-hp1DufI-we8gGHPgJO1xuPZ0GxCTJHR7820XM20cLRGDJXfgGCBxupMuD_Ie8FL7AtqM6O1VDQyQ6nxrRPCHukMoCXBEgOsiRP0XL2ZUBXmDDV9qhnyTXFMnXcTF_ntRueTh_CLe0oLhB2Bjw3O3qL_2gcfQvx8nBNMK_Xmibw1bwwmb7g9Gwcfkq3_iGVPveX91BH01UUCtJLYc_wf8DCMZCHCDCXKorSMWcXMyreqD9OOb7V1JwL1tvU8LwgLIvgKXbXmNruyxCVVgDLqd9YCkuo_9gLKLBpOsGofXCLYDuY1YJxm5qfzFbpMXBtM2Tc9mUNqXhOMBgpp-hCK5hg0Qgg_h93Vg9YKy9pyQgo9wgVKc_NBdG3Yo6VmzwtYoHtBzGV81DCLJHwOBGLCw9CLsh3G6qwL-gLKuqLC-BHC"
                    },
                    "referrer": "https://www.zhihu.com/column/" + column,
                    "referrerPolicy": "no-referrer-when-downgrade",
                    "body": null,
                    "method": "DELETE",
                    "mode": "cors",
                    "credentials": "include"
                });
            }

            setTimeout(next, 3000);
        }
    });
}

next();