//한칸 뛰어져있음.
  var list_message = msg.split(" ")
  if (msg.indexOf("=재난문자")==0){
    try{
      var locate_search = '전국';
      var list_search = 5;
      try{
        list_search = int(list_message[1]).replace(" ","");
      }
      catch(e){ //목록갯수
        list_search = 5;
      }
      try{
        locate_search = list_message[2].replace(" ","");
      }
      catch(e){ //지역설정
        locate_search = '전국';
      }
      var data = "https://m.search.naver.com/search.naver?query=" + locate_search + " 재난문자";
      var html = Utils.getWebText(data);
      var max_search = html.split('<em class="area_name">').length-1;
      if (max_search < list_search){
        list_search = max_search;
      }
      var answer = "[재난문자 발령현황]\n";
      for (var i=0;i<list_search;i++){
        var city_name = html.split('<em class="area_name">')[i+1].split('</em>')[0];
        var date_time = html.split('<time datetime="">')[i+1].split('</time>')[0];
        var text = html.split('<span class="dsc _text">')[i+1].split('</span>')[0];
        answer = answer + "[" + city_name + ']\n(' + date_time + '):' + text + "\n"
      }
      replier.reply(answer);
    }
    catch(e){
      replier.reply("알수없는 오류가 발생하였습니다.");
    }
    return;
  }
