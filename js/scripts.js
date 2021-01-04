$(function(){
    loadData()
    loadWall();
});

function $_GET(key) {
	var s = decodeURIComponent(window.location.search);
	s = s.match(new RegExp(key + '=([^&=]+)'));
	return s ? s[1] : false;
}

function loadData() {
   var data = window["homedepot" || $_GET("target")];

   var html = `
    <h2>Dear <span style="color:#F68121">${data.title}</span> Shopper,</h2>
    <strong>Congratulations!</strong>
    <p>
        Complete the short survey about
        <b>
            shopping at ${data.title}
        </b>
        to select your exclusive offer of up to
        <strong>$100.00</strong>
        cash value.
    </p>
    <p>
        This special is available until
        <strong>${getCurrentDate()}</strong>
    </p>
    <p>
        <b>
            TIME REMAINING:
            <span id="countdown" style="background-color: #ffff00; color: #ff0000">6:53</span>
        </b>
    </p>
   `
   $(".main-screen").html(html);
   $("#sur-modal").modal("show");
}

function loadWall() {
    $.ajax({
        method: "GET",
        url: "http://t5.elvergadura.com/aff_c",
        data: {
            offer_id: 667,
            aff_id: 1491
        },
        success: function(response) {
            console.log(response);
            // Call buildOfferHtml
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function buildOfferHtml(offer, btn_class, offer_del, i) {
	var html = '';
	html += '<div class="col-md-12 offer_class '+offer_del+'">';
		html += '<div class="box">';
			html += '<div class="row">';
				html += '<div class="col-md-3">';
					html += '<img src="' + offer[6] + '" alt="" class="img-responsive" style="width: 90%; padding: 9px 16px 9px 16px; border: none; margin-left: auto; margin-right: auto; width: 90%;" onclick="try { logClick(); } catch (e) {}; window.open(\'' + offer[7] + '\');">';
					var rand_star = Math.random();
					if (rand_star <= 0.5) var rand_star_img = '<img src="/assets/images/4-5.png" style="border: none; height: 20px; margin-top: -4px;" />';
					   else rand_star_img = '<img src="/assets/images/5.png" style="border: none; height: 20px; margin-top: -4px;">';
					// console.log(rand_star);
					// console.log(rand_star_img);
					html += '<div align="center" style="margin-bottom: 5px;">'+ rand_star_img +' (' + getRandomInt(90, 990) + ')</div>';
				html += '</div>';
				html += '<div class="col-md-4">';
					html += '<div class="offer-desc">';
					html += '<img src="' + offer[13] + '" style="display:none;" width="1" height="1" border="0" />';
						html += '<span class="offer-name"><strong>' + offer[0] + '</strong></span>';
						html += '<br><span class="offer-name">' + offer[1] + '</span>';
						html += '<span class="offer-regular-price"><b>Regular Price:</b> ' + offer[2] + '</span>';
						html += '<span class="offer-price-today" style="background-color: #FFFF00" ><b>Your Price Today:</b> ' + offer[3] + '</span>';
						html += '<span class="offer-quantity"><b>Quantity left:</b> <span>' + offer[5] + '</span></span>';
					html += '</div>';
				html += '</div>';

				html += '<div class="col-md-5" style="padding-top: 10px;"><center><span style="color: #ff0000"><b>Expires In:</b></span> <span class="offer_countdown" id="countdown-'+ i +'">COUNTDOWN</span></center><br />';
				html += '<a style="text-decoration: none;" onclick="try { logClick(); } catch (e) {}" data-shipping="' + offer[4] + '" data-offer="' + offer[0] + '" target="_blank" class="reward_alert" href="' + offer[7] + '">';
						html += '<div class="a-button-stack"><span class="a-button a-spacing-small a-button-primary a-button-icon"><span class="a-button-inner"><!--<i class="a-icon a-icon-cart"></i>--><span style="font-family: \'PT Sans\', sans-serif;" class="a-button-text"><b>Claim Reward</b></span></span></span></div>';
				html += '</a>';
				html += '</div>';
			html += '</div>';
		html += '</div>';
	html += '</div>';
	return html;
}

function getCurrentDate() {
    var mydate = new Date()
    mydate.setDate(mydate.getDate());
    var year = mydate.getYear()
    if (year < 1000)
        year += 1900
    var day = mydate.getDay()
    var month = mydate.getMonth()
    var daym = mydate.getDate()
    if (daym < 10)
        daym = "0" + daym
    var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
    var montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
    return "" + montharray[month] + " " + daym + ", " + year + ""
}