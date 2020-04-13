function corona(msg){
  var list_message = msg.split(' ');
  var html = Utils.getWebText("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=");
  var data_count = 1;
  var data_cache = 0;
  try{
    var local_search = list_message[1].replace(" ","");
    var total_count = html.split('td header="status_con s_type1" class="number"');
    if (local_search == "전국"){
      data_count = 1;
    }
    else if (local_search == "검역대"){
      data_count = len(total_count)-1;
    }
    else {
      data_cache = 1;
      for (var i=0;i<total_count.length-2;i++){
        if (local_search == html.split('<th scope="row">')[i+1].split('</th>')[0]) {
          data_count = i+1;
          break;
        }
      }
    }
  }
  catch(e){
    local_search = "전국";
    data_cache = 0;
  }
  if (data_count == 1 && data_cache){
    return '=코로나 [지역(선택)] 으로 사용이 가능합니다.\n지역목록: 서울,부산,대구,인천,광주,대전,울산,세종,경기,강원,충북,충남,전북,전남,경북,경남,제주';
  }
  var Increased = html.split('<td class="number">')[data_count].split('</td>')[0];
  var Confirmator = html.split('<td header="status_con s_type1" class="number">')[data_count].split('</td>')[0];
  var Healer = html.split('<td header="status_con s_type4" class="number">')[data_count].split('</td>')[0];
  var Dead = html.split('<td header="status_con s_type2" class="number">')[data_count].split('</td>')[0];
  var Persent = html.split('<td header="status_con s_type3" class="number">')[data_count].split('</td>')[0];
  var LastUpdate = html.split('<p class="info"><span>')[1].split('</span>')[0];
  return local_search + "의 코로나바이러스감염증-19의 현황]\n확진환자: "  + Confirmator + "명(+" + Increased + "명)" + "\n 완치자: " + Healer + "명\n 사망자: " + Dead + "명\n 발생률: " + Persent + "%\n 최근 업데이트: " + LastUpdate + "기준";
}
