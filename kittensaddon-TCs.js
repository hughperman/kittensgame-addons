leftTCShatter = {

	divName: "leftTCShatterContainer",

	interFace: "",
	
    setup: function() {
		var tempCont=document.getElementById(this.divName);
		if (tempCont){
			tempCont.parentNode.removeChild(tempCont);
		}
	
		this.interFace+="<div id=\"" + this.divName + "\" style=\"padding-left: 5px; visibility: visible;\">";
		this.interFace+="<a href=\"#\" onclick=\"leftTCShatter.buyItems(1);\">Shatter TC</a> <a href=\"#\" onclick=\"leftTCShatter.buyItems(5);\">x5</a>";
		this.interFace+="</div>";
		
		var fastPraiseContainer = document.getElementById("fastPraiseContainer");
		fastPraiseContainer.insertAdjacentHTML("afterEnd",this.interFace);
	},

	getPricesMultiple: function(amt) {
		var pricesTotal = 0;
		var impedance = game.getEffect("timeImpedance") * (1+ game.getEffect("timeRatio"));
		var isDarkFuture = game.calendar.isDarkFuture();
		var heatMax = game.getEffect("heatMax");
		var heatPrice = (game.time.heat * 10 - heatMax) * 0.01;
		var startPrice = 1;
		if (heatPrice>0) {
			startPrice += heatPrice;
		}
		var priceLoop = startPrice;
		if (isDarkFuture) {
			priceLoop = priceLoop + ((game.calendar.year - 40000 - game.time.flux - impedance) / 1000) * 0.01;
		}
		
		for (var k = 0; k < amt; k++) {
			if ((game.time.heat + k * 10) > heatMax) {
				priceLoop *= (1 + (game.time.heat + k * 10 - heatMax) * 0.01);  //1% per excessive heat unit
			}
			pricesTotal += priceLoop;
		}

		return pricesTotal;
	},

	buyItems: function(amt){
	var price = this.getPricesMultiple(amt);
		if (this.canAfford(price)) {
			game.resPool.addResEvent("timeCrystal", -price);
			this.doShatter(amt);
		}
	},

	canAfford: function(price) {
		return (Math.floor(game.resPool.get("timeCrystal").value / price) > 0);
	},

	doShatter: function(amt){

		game.time.heat += amt*10;
		game.time.shatter(amt);

	}

};
leftTCShatter.setup();