tradeOnLeft = {

  interFace: "",

  tradeLeft: function(race, ratio) {
    var tradeMax = game.diplomacy.getMaxTradeAmt(race);
    var tradeAmount = Math.floor(tradeMax * ratio);
    game.diplomacy.tradeMultiple(race, tradeAmount);
  },

  setup: function() {
    this.interFace += "<div id=\"leftTradeContainer\" style=\"padding-top:10px;width:100%\"><br>";
	this.interFace += "<div style=\"text-align:center;width:100%;\">TRADE</div>";
	this.interFace += "<table id=\"leftTradeTable\" style=\"width: 100%;\">";
	
    var races = game.diplomacy.races;

    for (var i = 0; i < 8; i++) {
	  this.interFace += "<tr class=\"resourceRow\" style=\"opacity: 1;\">";
	  this.interFace += "<td style=\"width: 75px;\">" + races[i].name + ":</td>";
	  this.interFace += "<td>"+races[i].sells.reduce(function(acc, val){return acc + ", " + val.name;},"").substring(2);+"</td>";
	  this.interFace += "<td style=\"width: 20px;\"><a href=\"#\" id=\"" + races[i].name + "_trade_10\" onclick=\"tradeOnLeft.tradeLeft(game.diplomacy.races[" + i + "],0.1)\">10%</a></td>";
	  this.interFace += "<td style=\"width: 20px;\"><a href=\"#\" id=\"" + races[i].name + "_trade_50\" onclick=\"tradeOnLeft.tradeLeft(game.diplomacy.races[" + i + "],0.5)\">50%</a></td>";
	  this.interFace += "<td style=\"width: 20px;\"><a href=\"#\" id=\"" + races[i].name + "_trade_100\" onclick=\"tradeOnLeft.tradeLeft(game.diplomacy.races[" + i + "],1.0)\">100%</a></td></tr>";
    }
    this.interFace += "</table></div>";

	var tempCont=document.getElementById("leftTradeContainer");
	if (tempCont){
		tempCont.parentNode.removeChild(tempCont);
	}
	
	var resHeadL=document.getElementById("resourceHeaderLeft");
	if (resHeadL){
		resHeadL.parentNode.removeChild(resHeadL);
	}

	var craftContainer = document.getElementById("craftContainer");
	craftContainer.insertAdjacentHTML("beforebegin",this.interFace);
	craftContainer.insertAdjacentHTML("afterbegin","<div id=\"resourceHeaderLeft\" style=\"text-align:center;width:100%;\">RESOURCES</div>");
  }

};
tradeOnLeft.setup();
