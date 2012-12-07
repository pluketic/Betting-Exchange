﻿var national_list = "World cup,Asian cup";
betex247 = {
    Url: 'http://localhost:4262/',
    tempCountryId: 0,
    tempLeagueId: 0,
    cache: {},
    init: function () { },
    //#region common function
    //#region Sport GUI        

    getallsport: function () {
        $('#top_events').show();
        $.ajax({
            type: "GET",
            url: this.Url + 'common/getListSport', // {"content"="Hello!"}
            dataType: 'json',
            ifModified: true,
            cache: true,
            async: false,
            success: function (dataSportList) {
                betex247.getsubdata(dataSportList);
                betex247.showhidedata();
            }
        });
    },

    getsubdata: function (dataSportList) {
        var sb = new StringBuilder();
        $("div.loadoffermenu").html('');
        sb.append("<div>");
        sb.append("    <div class=\"ChooseSportsHeader\">");
        sb.append("        <span class=\"orange\">Sports offer</span>");
        sb.append("    </div>");
        sb.append("</div>");

        $("div.loadoffermenu").html(sb.toString());
        for (var a = 0; a < dataSportList.length; a++) {
            var id = dataSportList[a].id;
            var name = dataSportList[a].sn;

            $.ajax({
                type: "GET",
                url: betex247.Url + 'common/getAllSport/' + id, // {"content"="Hello!"}
                dataType: 'json',
                ifModified: true,
                cache: true,
                async: false,
                success: function (data) {
                    //betex247.excutejsonData(data);
                    $("div.loadoffermenu").append(betex247.bindsportnew(data, id, name));
                }
            });
        }
    },

    showhidedata: function () {

        //hide all league
        $(".navsports").slideUp(500);
        $(".navsportssub").slideUp(500);
        //toggle the componenet with class msg_body
        $(".sport-heading").click(function () {
            //$(".navsports").hide();                
            $(this).next(".navsports").slideToggle(500);
            //$('html,body').animate({ scrollTop: $(this).offset().top - 200 }, 1000);
        });

        $(".league-heading").click(function () {
            //$(".navsportssub").slideUp(500);
            $(this).next(".navsportssub").slideToggle(500);
            //$('html,body').animate({ scrollTop: $(this).offset().top - 200 }, 1000);
            //$('html,body').animate({ scrollTop: $('body').offset().top - 500 }, 1000);
        });
    },

    gettopevent: function () {
        $.ajax({
            type: "GET",
            url: this.Url + 'common/getTopEvent', // {"content"="Hello!"}
            dataType: 'json',
            ifModified: true,
            cache: true,
            success: function (data) {
                if (data != null && data.length > 0) {
                    var sb = new StringBuilder();
                    sb.append("<div id=\"top_events\" class=\"module\">");
                    sb.append("<h3 class=\"bdr_tr\">Top Events</h3>");
                    sb.append("<div class=\"inner bdr_btm\">");
                    sb.append("     <ul class=\"listings\">");
                    for (var i = 0; i < data.length; i++) {
                        var twt = data[i];
                        var urlLeague = betex247.Url + "league/byleague/" + twt.ID + "/" + twt.CountryID + "/" + twt.SportID;
                        sb.append("<li class=\"sesame\"><a href=\"javascript:void(0)\" onclick=\"betex247.loadleague('" + urlLeague + "',1)\"  class=\"level1\">" + twt.LeagueName_WebDisplay + "(" + twt.SportName + ")</a> </li>");
                    }
                    sb.append("     </ul>");
                    sb.append("</div>");
                    sb.append("</div>");

                    $('#top_eventstop').html(sb.toString());
                }

                $('#top_events').find('.listings > li:last').addClass('last');
            }
        });
    },

    stripJsonToString: function (json) {
        return JSON.stringify(json);
    },

    excutejsonData: function (data) {
        var output = betex247.bindsportnew(data);
        $('#top_events').show();
        $("div.loadoffermenu").html(output);
        //hide all league
        $(".navsports").slideUp(500);
        $(".navsportssub").slideUp(500);
        //toggle the componenet with class msg_body
        $(".sport-heading").click(function () {
            //$(".navsports").hide();                
            $(this).next(".navsports").slideToggle(500);
            //$('html,body').animate({ scrollTop: $(this).offset().top - 200 }, 1000);
        });

        $(".league-heading").click(function () {
            //$(".navsportssub").slideUp(500);
            $(this).next(".navsportssub").slideToggle(500);
            //$('html,body').animate({ scrollTop: $(this).offset().top - 200 }, 1000);
        });
    },

    getsport: function (id) {
        $.ajax({
            type: "GET",
            url: this.Url + 'common/getSport', // {"content"="Hello!"}
            dataType: 'json',
            cache: true,
            success: function (data) {
                var outPut = betex247.bindbet(data);
                $("div.highlights-content").html(outPut);
            }
        });
    },

    myaccount: function () {
        $.ajax({
            type: "GET",
            url: this.Url + 'common/MyAccount',
            cache: true,
            success: function (data) {
                $("#left_column").html(data);

                $(".accordion-header").click(function () {
                    //$(".accordion-content").hide();
                    $(this).next(".accordion-content").slideToggle(500);
                    //$('html,body').animate({ scrollTop: $(this).offset().top - 200 }, 1000);
                });
            }
        });
    },

    myaccountindex: function () {
        $.ajax({
            type: "GET",
            url: this.Url + 'common/MyAccountIndex',
            cache: true,
            success: function (data) {
                $("#accountpanel").html(data);

                $(".accordion-header").click(function () {
                    //$(".accordion-content").hide();
                    $(this).next(".accordion-content").slideToggle(500);
                    //$('html,body').animate({ scrollTop: $(this).offset().top - 200 }, 1000);
                });
            }
        });
    },

    excuteaccountype: function (type) {
        switch (type) {
            case 1:
                betex247.accountpage(betex247.Url + "account/balances");
                setTimeout(function () { $('#displayblock1').show() }, 800);
                break;
            case 2:
                betex247.accountpage(betex247.Url + "account/statement");
                setTimeout(function () { $('#displayblock1').show() }, 800);
                break;
            case 3:
                betex247.accountpage(betex247.Url + "account/exposure");
                setTimeout(function () { $('#displayblock2').show() }, 800);
                break;
            case 4:
                betex247.accountpage(betex247.Url + "account/unmatchedbets");
                setTimeout(function () { $('#displayblock2').show() }, 800);
                break;
            case 5:
                betex247.accountpage(betex247.Url + "account/unsettledbets");
                setTimeout(function () { $('#displayblock2').show() }, 800);
                break;
            case 6:
                betex247.accountpage(betex247.Url + "account/bettingpl");
                setTimeout(function () { $('#displayblock3').show() }, 800);
                break;
            case 7:
                betex247.accountpage(betex247.Url + "account/settledbets");
                setTimeout(function () { $('#displayblock3').show() }, 800);
                break;
            case 8:
                betex247.accountpage(betex247.Url + "account/cancelledbets");
                setTimeout(function () { $('#displayblock3').show() }, 800);
                break;
            case 9:
                betex247.accountpage(betex247.Url + "account/lapsedbets");
                setTimeout(function () { $('#displayblock3').show() }, 800);
                break;
            case 10:
                betex247.accountpage(betex247.Url + "account/voidbets");
                setTimeout(function () { $('#displayblock3').show() }, 800);
                break;
            default:
                betex247.accountpage(betex247.Url + "account/balances");
                setTimeout(function () { $('#displayblock1').show() }, 800);
                break;
        }
    },
    //#endregion

    //#region account
    login: function () {
        var uNick = $('#LoginName').val();
        var uPass = $('#Password').val();
        $.ajax({
            type: "GET",
            url: this.Url + 'account/loginajax',
            data: { userName: uNick, userPass: uPass },
            cache: true,
            success: function (data) {
                if (data != null) {
                    var arrData = data.split('|');
                    $('#LoginName').val('');
                    $('#Password').val('');
                    if (arrData[0] == "success") {
                        //window.location.href=betex247.Url+"";
                        betex247.myaccountindex();
                        $("div.regFormTop").hide();
                        $("div.header-login-panel").show();
                        $("p strong").html(arrData[1]);
                        var arrIndex = 2;
                        var rowIndex = 0;
                        var myballance = new Array();
                        myballance[0] = "Available";
                        myballance[1] = "Exposure";
                        myballance[2] = "Balance";

                        $("ul.account-balance li").each(function () {
                            var t = $(this);
                            t.html("<em>" + myballance[rowIndex] + ":</em><strong>$" + arrData[arrIndex] + "</strong>");
                            rowIndex++;
                            arrIndex++;
                        });
                        //                        $("ul.account-balance li")[0].html();
                        //                        $("ul.account-balance li")[1].html("<em>Exposure:</em><strong>"+arrData[3]+"</strong>");
                        //                        $("ul.account-balance li")[2].html("<em>Balance:</em><strong>"+arrData[4]+"</strong>");
                    } else {
                        alert(data);
                    }
                }
            }
        });
    },

    accountpanel: function () {
        window.location.href = betex247.Url + "account/account";
    },

    accountpage: function (surl) {
        $.ajax({
            type: "GET",
            url: surl, // {"content"="Hello!"}     
            cache: true,
            success: function (data) {
                $("#middle_column_1").html(data);
            }
        });
    },

    logout: function () {
        $.ajax({
            type: "GET",
            url: this.Url + 'account/logoutajax',
            cache: true,
            success: function (data) {
                if (data == "success") {
                    $("div.regFormTop").show();
                    $("div.header-login-panel").hide();
                    window.location.href = betex247.Url;
                }
            }
        });
    },
    //#endregion
    //#endregion

    //#region support function
    //#region Sport GUI
    bindsport: function (data) {
        var sb = new StringBuilder();
        sb.append("<div>");
        sb.append("    <div class=\"ChooseSportsHeader\">");
        sb.append("        <span class=\"orange\">Sports offer</span>");
        sb.append("    </div>");
        sb.append("</div>");
        var obj = data;
        for (var i = 0; i < obj.length; i++) {
            var twt = obj[i];
            //check sport name
            if (twt.SportName.length > 0) {
                var listCountry = "";
                var listNational = "";
                var countLeague = twt.Bet247xSoccerCountries.length;
                var activeCountLeague = 0;
                //count active league on sport
                if (countLeague > 0) {
                    for (var j = 0; j < countLeague; j++) {
                        var twtLeague = twt.Bet247xSoccerCountries[j];
                        if (twtLeague.Bet247xSoccerLeagues.length != null) {
                            activeCountLeague += twtLeague.Bet247xSoccerLeagues.length;
                        }
                    }
                }
                //add sport name to list menu
                sb.append(this.addStringSport(twt.SportName, activeCountLeague));
                if (countLeague > 0) {
                    //                    listCountry = this.bindLeagueCountry(twt.Leagues);
                    //                    listNational = this.bindLeagueNational(twt.Leagues);
                    //add start div league
                    sb.append(this.addStringStartLeague());

                    for (var k = 0; k < countLeague; k++) {
                        var Country = twt.Bet247xSoccerCountries[k];
                        var sCountry = Country.Country;
                        var contentLeague = Country.Bet247xSoccerLeagues.length;
                        var urlcountry = '';
                        var urlleague = '';
                        if (sCountry.length > 0 && contentLeague > 0) {
                            urlcountry = betex247.Url + 'league/bycountry/' + Country.Bet247xSoccerLeagues[0].CountryID;
                            sb.append(this.addStringLeague(urlcountry, sCountry));
                            sb.append(this.addStringStartSubLeague());
                            for (var j = 0; j < contentLeague; j++) {
                                var twtLeagueDetail = Country.Bet247xSoccerLeagues[j];
                                if (twtLeagueDetail.LeagueName_WebDisplay != null) {
                                    urlleague = betex247.Url + 'league/byleague/' + twtLeagueDetail.ID + "/" + twtLeagueDetail.CountryID + "/" + twtLeagueDetail.SportID;
                                    if (twtLeagueDetail.LeagueName_WebDisplay.length > -1) {
                                        sb.append(this.addStringSubLeague(urlleague, twtLeagueDetail.LeagueName_WebDisplay));
                                    }
                                }
                            }
                            sb.append(this.addStringEndSubLeague());
                            sb.append("</li>");
                        }
                    }

                    //add end div league
                    sb.append(this.addStringEndLeague());
                }
            }
        }
        return sb.toString();
    },

    bindsportnew: function (data, id, name) {
        var sb = new StringBuilder();
        var obj = data;
        var urlcountry = '';
        var urlleague = '';
        var countrycount = 0;
        if (obj != null) {
            for (var i = 0; i < obj.length; i++) {
                countrycount = parseInt(obj[i].sc);
                //add sport name to list menu
                //temp for data
                //sb.append(this.addStringSport(obj[i].sn, 187));

                sb.append(betex247.addStringSport(name, obj.length));
                //add start div league
                sb.append(this.addStringStartLeague());

                for (var k = 0; k < countrycount; k++) {
                    if (i < obj.length) {
                        var sCountry = obj[i].cn;
                        var contentLeague = parseInt(obj[i].cl);

                        if (sCountry.length > 0 && contentLeague > 0) {
                            urlcountry = betex247.Url + 'league/bycountry/' + obj[i].cid + "/" + obj[i].sid;
                            //add countryleague
                            sb.append(this.addStringLeague(urlcountry, sCountry));
                            //start sub league
                            sb.append(this.addStringStartSubLeague());
                            for (var j = 0; j < contentLeague; j++) {
                                if (obj[i].ln != null) {
                                    urlleague = betex247.Url + 'league/byleague/' + obj[i].lId + "/" + obj[i].cid + "/" + obj[i].sid;
                                    //league
                                    sb.append(this.addStringSubLeague(urlleague, obj[i].ln));
                                    i++;
                                }
                            }
                            //i--;
                            //end subleague
                            sb.append(this.addStringEndSubLeague());
                            sb.append("</li>");
                        }
                    }
                }
                //add end div league
                sb.append(this.addStringEndLeague());
            }
        }
        return sb.toString();
    },

    //    bindsportnew: function (bindsportnew,data) {
    //        var sb = new StringBuilder();
    //        sb.append("<div>");
    //        sb.append("    <div class=\"ChooseSportsHeader\">");
    //        sb.append("        <span class=\"orange\">Sports offer</span>");
    //        sb.append("    </div>");
    //        sb.append("</div>");        
    //        var urlcountry = '';
    //        var urlleague = '';
    //        var countrycount = 0;
    //        
    //        for (var a = 0; a < bindsportnew.length; a++) {
    //            var sport = bindsportnew[a];
    //                      
    //            //var jsontemp = betex247.parsteData(data,bindsportnew[a].id);
    //            $(function(){ 
    //                //add sport name to list menu
    //                sb.append(betex247.addStringSport(bindsportnew[a].sn, 187));  
    //                
    //                window.setTimeout($(function(){sb.append(betex247.bindluague(data,bindsportnew[a].id));}),2000);         
    //            });                                                  
    //        }
    //        return sb.toString();
    //    },

    parsteData: function (data, id) {
        var jsonObj = [];
        for (var b = 0; b < data.length; b++) {
            if (data[b].sid == id) {
                jsonObj.push(data[b]);
            }
        }
    },

    bindluague: function (data, id) {
        var jsonObj = [];
        for (var b = 0; b < data.length; b++) {
            if (data[b].sid == id) {
                jsonObj.push(data[b]);
            }
        }

        var sb = new StringBuilder();
        var obj = jsonObj;
        for (var i = 0; i < obj.length; i++) {
            countrycount = parseInt(obj[i].sc);
            //add start div league
            sb.append(this.addStringStartLeague());
            for (var k = 0; k < countrycount; k++) {
                var sCountry = obj[i].cn;
                var contentLeague = parseInt(obj[i].cl);

                if (sCountry.length > 0 && contentLeague > 0) {
                    urlcountry = betex247.Url + 'league/bycountry/' + obj[i].cid + "/" + obj[i].sid;
                    //add countryleague
                    sb.append(this.addStringLeague(urlcountry, sCountry));
                    //start sub league
                    sb.append(this.addStringStartSubLeague());
                    for (var j = 0; j < contentLeague; j++) {
                        if (obj[i].ln != null) {
                            urlleague = betex247.Url + 'league/byleague/' + obj[i].lId + "/" + obj[i].cid + "/" + obj[i].sid;
                            //league
                            sb.append(this.addStringSubLeague(urlleague, obj[i].ln));
                        }
                        i++;
                    }
                    //i--;
                    //end subleague
                    sb.append(this.addStringEndSubLeague());
                    sb.append("</li>");
                }
            }
            //add end div league
            sb.append(this.addStringEndLeague());
            return sb.toString();
        }
    },

    bindLeagueCountry: function (jLeagueData) {
        var list = "";
        var countLeague = jLeagueData.length;
        if (countLeague > 0) {
            for (var i = 0; i < countLeague; i++) {
                var twtLeague = jLeagueData[i];
                if (twtLeague.Matches != null) {
                    var name = twtLeague.Name;
                    if (name.indexOf(national_list) < 0) {
                        var arrName = name.split(' ');
                        if (arrName.length > 0) {
                            if (list.indexOf(arrName[0]) < 0) {
                                list += arrName[0] + ",";
                            }
                        } else {
                            if (list.indexOf(name) < 0) {
                                list += name + ",";
                            }
                        }
                    }
                }
            }
        }
        return list;
    },

    bindLeagueNational: function (jLeagueData) {
        var list = "";
        var countLeague = jLeagueData.length;
        if (countLeague > 0) {
            for (var i = 0; i < countLeague; i++) {
                var twtLeague = jLeagueData[i];
                if (twtLeague.Matches != null) {
                    var name = twtLeague.Name;
                    if (national_list.indexOf(name) > -1) {
                        list += name + ",";
                    }
                }
            }
        }
        return list;
    },

    addStringSport: function (sportname, leagueCount) {
        var className = "";
        switch (sportname) {
            case "Soccer":
                className = "sports-soccer";
                break;
            case "Baseball":
                className = "sports-baseball";
                break;
            case "Tennis":
                className = "sports-tennis";
                break;
            case "Horse Racing":
                className = "sports-horse";
                break;
            case "American Football":
                className = "sports-usfootball";
                break;
            case "Cricket":
                className = "sports-cricket";
                break;
            case "sports-hockey":
                className = "Ice Hockey";
                break;
            case "Handball":
                className = "sports-handball";
                break;
            case "Volleyball":
                className = "sports-volleyball";
                break;
            case "Rugby League":
                className = "sports-rugby";
                break;
            case "Rugby Union":
                className = "sports-rugby";
                break;
            default:
                className = "sports-soccer";
                break;
        }
        var sb = new StringBuilder();
        sb.append("<div class=\"sport-heading\">");
        sb.append("<a href=\"javascript:void(0)\" class=\"sportlnk\">");
        sb.append("    <div style=\"padding: 6px 0px\">");
        sb.append("        <span class=\"" + className + "\"></span>" + sportname + " <span style=\"float: right; margin-right: 4px;\">" + leagueCount + "</span>");
        sb.append("    </div>");
        sb.append("</a></div>");
        return sb.toString();
    },

    addStringStartLeague: function () {
        var sb = new StringBuilder();
        sb.append("<div class=\"navsports\" style=\"display:none\">");
        sb.append("    <ul>");
        return sb.toString();
    },

    addStringEndLeague: function () {
        var sb = new StringBuilder();
        sb.append("    </ul>");
        sb.append("</div>");
        return sb.toString();
    },

    addStringLeague: function (url, leagueName) {
        var sb = new StringBuilder();
        sb.append("        <li><a  class=\"league-heading\" onclick=\"betex247.loadleague('" + url + "',0);\" href=\"javascript:void(0)\">");
        sb.append("            <div style=\"padding: 3px 0px 3px 8px;\">+&nbsp;<b>");
        sb.append("                " + leagueName + "</b></div>");
        //sb.append("        </a></li>");
        sb.append("        </a>");
        return sb.toString();
    },

    addStringSubLeague: function (url, leagueName) {
        var sb = new StringBuilder();
        sb.append("        <li><a onclick=\"betex247.loadleague('" + url + "',1)\" href=\"javascript:void(0)\">");
        sb.append("            <div style=\"padding: 3px 0px 3px 26px;\">");
        sb.append("                <i>" + leagueName + "</i></div>");
        sb.append("        </a></li>");
        return sb.toString();
    },

    addStringStartSubLeague: function () {
        var sb = new StringBuilder();
        sb.append("<div class=\"navsportssub\">");
        sb.append("    <ul>");
        return sb.toString();
    },

    addStringEndSubLeague: function () {
        var sb = new StringBuilder();
        sb.append("    </ul>");
        sb.append("</div>");
        return sb.toString();
    },

    bindbet: function (data) {
        var obj = data;
        var sb = new StringBuilder();
        if (obj.Name.length > 0) {
            sb.append(this.betTitle(obj.Name));

            var countLeague = obj.Leagues.length;
            if (countLeague > 0) {
                for (var j = 0; j < countLeague; j++) {
                    var twtLeague = obj.Leagues[j];
                    var leagueName = twtLeague.Name;
                    var countMatch = twtLeague.Matches != null ? twtLeague.Matches.length : 0;

                    if (countMatch > 0) {
                        sb.append(this.betdetailStart());
                        //test just get 5 record. 
                        var rowControl = countMatch > 3 ? 3 : countMatch;
                        for (var i = 0; i < rowControl; i++) {
                            var twtMatch = twtLeague.Matches[i];
                            if (twtMatch.Periods.length > 0 && (twtMatch.Periods[0].Spreads != null || twtMatch.Periods[0].Totals != null || twtMatch.Periods[0].MoneyLines != null)) {
                                sb.append(this.betdetail(leagueName, twtMatch));
                            }
                        }
                        sb.append(this.betdettailEnd());
                    }

                }
            }
        }
        return sb.toString();
    },

    betTitle: function (sportName) {
        var sb = new StringBuilder();

        sb.append("<div class=\"sports-cat-heading-underline\">");
        sb.append("<div class=\"title\">" + sportName + "</div>");
        sb.append("<div class=\"all\">");
        sb.append("    <table style=\"border-spacing: 2px; border-collapse: separate; width: 100%;\">");
        sb.append("        <tr>");
        sb.append("            <td height=\"26\" width=\"33%\">");
        sb.append("                <table width=\"100%\" cellpadding=\"1\" cellspacing=\"1\" border=\"1\" bgcolor=\"#000000\">");
        sb.append("                    <tr>");
        sb.append("                        <td colspan=\"2\" align=\"center\">Home</td>");
        sb.append("                    </tr>");
        sb.append("                    <tr>");
        sb.append("                        <td width=\"50%\" align=\"center\">Back</td>");
        sb.append("                        <td width=\"50%\" align=\"center\">Lay</td>");
        sb.append("                    </tr>");
        sb.append("                </table>");
        sb.append("            </td>");
        sb.append("            <td height=\"26\" width=\"34%\">");
        sb.append("                <table width=\"100%\" cellpadding=\"2\" cellspacing=\"2\">");
        sb.append("                    <tr>");
        sb.append("                        <td colspan=\"2\" align=\"center\">Draw</td>");
        sb.append("                    </tr>");
        sb.append("                    <tr>");
        sb.append("                        <td width=\"50%\" align=\"center\">Back</td>");
        sb.append("                        <td width=\"50%\" align=\"center\">Lay</td>");
        sb.append("                    </tr>");
        sb.append("                </table>");
        sb.append("           </td>");
        sb.append("            <td height=\"26\" width=\"33%\">");
        sb.append("                <table width=\"100%\" cellpadding=\"2\" cellspacing=\"2\">");
        sb.append("                    <tr>");
        sb.append("                        <td colspan=\"2\" align=\"center\">Away</td>");
        sb.append("                    </tr>");
        sb.append("                    <tr>");
        sb.append("                        <td width=\"50%\" align=\"center\">Back</td>");
        sb.append("                        <td width=\"50%\" align=\"center\">Lay</td>");
        sb.append("                    </tr>");
        sb.append("                </table>");
        sb.append("            </td>");
        sb.append("        </tr>");
        sb.append("    </table>");
        sb.append("</div>");
        sb.append("</div>");

        return sb.toString();
    },

    betdetailStart: function () {
        var sb = new StringBuilder();

        sb.append("<div class=\"sports-cat-content\">");
        sb.append("<table class=\"sports-cat-tbl\">");

        return sb.toString();
    },

    betdettailEnd: function () {

        var sb = new StringBuilder();
        sb.append("</table></div>");

        return sb.toString();
    },

    betdetail: function (leagueName, jData) {
        var sb = new StringBuilder();

        sb.append("<tr>");

        sb.append(this.bindMatch(leagueName, jData.HomeTeam, jData.AwayTeam, jData.StartDateTime));

        sb.append("    <td width=\"250\" style=\"vertical-align: top;\" align=\"center\">");
        sb.append("        <table style=\"border-spacing: 2px; border-collapse: separate; width: 100%;\">");
        sb.append("            <tr>");

        var twtSpread;
        var twtTotal;
        var twtMoneyLine;

        if (jData.Periods[0].Spreads != null) {
            twtSpread = jData.Periods[0].Spreads[0];
            sb.append(this.bindOdd(twtSpread.HomePrice, twtSpread.AwayPrice));
        }
        if (jData.Periods[0].Totals != null) {
            twtTotal = jData.Periods[0].Totals[0];
            sb.append(this.bindOdd(twtTotal.OverPrice, twtTotal.UnderPrice));
        }
        if (jData.Periods[0].MoneyLines != null) {
            twtMoneyLine = jData.Periods[0].MoneyLines[0];
            sb.append(this.bindOdd(twtMoneyLine.HomePrice, twtMoneyLine.AwayPrice));
        }

        sb.append("            </tr>");
        sb.append("        </table>");
        sb.append("    </td>");
        sb.append("</tr>");

        return sb.toString();
    },

    bindMatch: function (leagueName, HomeTeam, AwayTeam, Time) {
        var sb = new StringBuilder();
        var d = Time.toDateFromAspNet();

        sb.append("    <td width=\"50\">" + d.format("h:MM") + "<br/>" + d.format("mmm d") + "</td>");  //21:00<br />18 Sep
        sb.append("    <td width=\"200\">");
        sb.append("        <a href=\".\" class=\"sports-cat-lnk\">");
        sb.append("            <div>" + leagueName + "<br />");
        sb.append("            <span class=\"match-title-bigger\">" + HomeTeam + " - " + AwayTeam + "</span></div>");
        sb.append("        </a>");
        sb.append("    </td>");

        return sb.toString();
    },

    bindOdd: function (HomeTeamOdd, AwayTeamOdd) {
        var sb = new StringBuilder();

        sb.append("                <td height=\"30\" width=\"33%\">");
        sb.append("                    <table width=\"100%\" cellpadding=\"2\" cellspacing=\"2\">");
        sb.append("                        <tr>");
        sb.append("                            <td width=\"50%\" align=\"center\">");
        sb.append("                                <div style=\"margin: 0 auto; padding: 0px 0px; width: auto;\">");
        sb.append("                                    <a href=\"mysegments.html\" class=\"odds-button-back\">" + HomeTeamOdd + "</a>");
        sb.append("                                </div>");
        sb.append("                            </td>");
        sb.append("                            <td width=\"50%\" align=\"center\">");
        sb.append("                                <div style=\"margin: 0 auto; padding: 0px 0px; width: auto;\">");
        sb.append("                                    <a href=\"mysegments.html\" class=\"odds-button-lay\">" + AwayTeamOdd + "</a>");
        sb.append("                                </div>");
        sb.append("                            </td>");
        sb.append("                        </tr>");
        sb.append("                    </table>");
        sb.append("                </td>");

        return sb.toString();
    },
    //#endregion
    //#endregion

    //#region ajax
    loadleague: function (surl, isleague) {
        $.ajax({
            type: "GET",
            url: surl, // {"content"="Hello!"}     
            cache: true,
            success: function (data) {
                $("#middle_column").html(data);
                if (isleague == 1) {
                    $('html,body').animate({ scrollTop: $('body').offset().top - 500 }, 1000);
                }
            }
        });
    }
    //#enregion
}