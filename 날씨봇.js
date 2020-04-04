function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
  var list_message = msg.split(" ")
  if(msg.indexOf("=날씨")==0){
    if(msg.replace("=날씨",'')=='' || msg.replace("=날씨",'')==' '){
      replier.reply("날씨는 다음과 같이 사용할수 잇습니다.\n=날씨 전국: 전국 날씨를 요약해서 보여줍니다.\n=날씨 (지역): 해당 지역의 날씨를 자세히 보여줍니다.");
      return;
    }
    else if(list_message[1] == '전국'){ //=날씨 전국으로 했을경우
      var html = Utils.getWebText("https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&query=%EC%A0%84%EA%B5%AD%EB%82%A0%EC%94%A8"); //"날씨 전국"을 통해 검색결과 휙득
      var local = html.split('<span>');
      var data = html.split('<span class="state state4">');
      var data_temp = html.split('<span class="dsc">');
      data_answer = "";
      for(var i=0;i<12;i++){
        data_answer = data_answer + local[22+i].split('</span>')[0] + "지역 | 온도: " + data_temp[1+i].split('</span>')[0] +  "ºC\n";
      }
      replier.reply("[전국 날씨 정보]\n" + data_answer);
    }
    else {
      try{
        var search_local = msg.replace("=날씨 ","");
        var html = Utils.getWebText("http://search.naver.com/search.naver?query=" + search_local + " 날씨"); //HTML 값 불러오기
        var title_weather = html.split('<h3 class="api_title">')[1].split('</h3>')[0];
        try{
          var international = html.split('오존지수</a>')[1].replace("dummy",""); //해외 날씨일 경우 오존지수의 값을 안주기 때문에, 이것을 응용하여 해외 인지 국내인지 분석.
          var status_weather = html.split('<p class="cast_txt">')[1].split('</p>')[0];
          var today_temp = html.split('<span class="todaytemp">')[1].split('</span>')[0];
          var data1 = html.split('<span class="num">')[1].split('</span>')[0];
          var data2 = html.split('<span class="num">')[2].split('</span>')[0];
          var data3 = html.split('<span class="num">')[3].split('</span>')[0];
          var data4 = html.split('<span class="num">')[4].split('</span>')[0];
          var data5 = html.split('<span class="num">')[5].replace('</span>','(').split('</dd>')[0].split('<span')[0].replace("\t","").replace(" ","").replace("\n","");
          var data6 = html.split('<span class="num">')[6].replace('</span>','(').split('</dd>')[0].split('<span')[0].replace("\t","").replace(" ","").replace("\n","");
          var data7 = html.split('<span class="num">')[7].replace('</span>','(').split('</dd>')[0].split('<span')[0].replace("\t","").replace(" ","").replace("\n","");
          var LastUpdate = html.split('<span class="update">')[1].split('</span>')[0];
          replier.reply('[' + title_weather + ']\n'+ status_weather +'\n현재온도: ' + today_temp +'℃(' + data1 + '℃/' + data2 + '℃)\n체감온도: ' + data3 + '℃\n시간당 강수량: ' + data4 + '\n미세먼지: ' + data5 + ')\n초미세먼지: ' + data6 + ')\n오존: ' + data7 + ')\n발표: 기상청 | 제공: 웨더아이 | 최근 업데이트: ' + LastUpdate);
        }
        catch(e) { //해외날씨
          var status_weather = html.split('<p class="cast_txt">')[1].split(', ')[0];
          var today_temp = html.split('<span class="todaytemp">')[1].split('</span>')[0];
          var data1 = html.split('체감온도')[1].split('</p>')[0];
          var data2 = html.split('<span class="num">')[1].split('</span>')[0];
          var data3 = html.split('<span class="num">')[2].split('</span>')[0];
          var data4_answer = "";
          try{
            var data4 = html.split('<span class="num">')[3].replace('<',')').split('/span>')[0].replace(' ','(');
            data4_answer = '\n자외선: ' + data4;
          }
          catch(e){
            var data4 = "미지원";
          }
          var LastUpdate = html.split('<span class="update">')[1].split('</span>')[0];
          replier.reply('[' + title_weather + ']'+ '\n날씨 상태: ' + status_weather +'\n현재온도: ' + today_temp + '℃\n체감온도: ' + data1 + '\n바람: ' + data2 + 'm/s\n습도: ' + data3 + '%' + data4_answer + '\n최근업데이트: ' + LastUpdate); //data2 = data3= data5 = data6 = data7 = "미지원(확인 불가능)"
        }
      }
      catch(e){
        replier.reply('해당 지역이 존재하지 않습니다. 다시 확인후 입력해 주시기 바랍니다.');
      }
      return;
    }
  }
}
