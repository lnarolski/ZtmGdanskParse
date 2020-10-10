var ztmGdanskParser = {
    getDepartureBoard: function (divTableId, stopId, stopName) {

        $.getJSON("https://ckan2.multimediagdansk.pl/delays?stopId=" + stopId, function (result) {
            if (typeof result.error !== 'undefined') {
                console.log(result.error);
            }
            else {
                var table = document.getElementById(divTableId);
                table.innerHTML = "";

                var div1 = document.createElement('div');
                var tr, th, span;

                // Creating INFO row
                var tb1 = document.createElement('table');
                tb1.id = "infoDeparturesBoard";

                tr = tb1.insertRow();

                th = tr.insertCell();
                th.id = "blank";
                th = tr.insertCell();
                th.id = "stopName";
                th.innerText = stopName;
                th = tr.insertCell();
                th.style.textAlign = "right";
                span = document.createElement('span');
                span.id = "lastUpdateTime";
                span.innerText = result.lastUpdate;
                th.appendChild(span);

                tr = tb1.insertRow();
                th = tr.insertCell();
                th = tr.insertCell();
                th = tr.insertCell();

                div1.appendChild(tb1);

                // Creating HEADERS row
                var tb2 = document.createElement('table');
                tb2.id = "headerDeparturesBoard";
                tb2.style.borderBottom = "0px";

                tr = tb2.insertRow();

                th = tr.insertCell();
                th.className = "route";
                th.innerText = "LINIA";
                th = tr.insertCell();
                th.className = "dir";
                th.innerText = "KIERUNEK DOCELOWY";
                th = tr.insertCell();
                th.className = "time";
                th.innerText = "ODJAZD";

                div1.appendChild(tb2);
                table.appendChild(div1);

                // Creating TIMES rows
                var div2 = document.createElement('div');
                div2.style.height = "500px";
                div2.style.overflow = "auto";

                var tb3 = document.createElement('table');
                tb3.id = "timesDeparturesBoard";

                for (let index = 0; index < result.delay.length; index++) {
                    tr = tb3.insertRow();

                    th = tr.insertCell();
                    th.className = "route";
                    span = document.createElement('span');
                    span.innerText = result.delay[index].routeId > 400 ? "N" + (result.delay[index].routeId - 400).toString() : result.delay[index].routeId.toString();
                    th.appendChild(span);
                    th = tr.insertCell();
                    th.className = "dir";
                    span = document.createElement('span');
                    span.innerText = result.delay[index].headsign;
                    th.appendChild(span);
                    th = tr.insertCell();
                    th.className = "time";
                    span = document.createElement('span');
                    if (result.delay[index].status === "REALTIME")
                    {
                        if (result.delay[index].delayInSeconds > 300) //delay 5 min
                        {
                            span.style.color = "red";
                        }
                        else if (result.delay[index].delayInSeconds < -60) //advance 1 min
                        {
                            span.style.color = "lime";
                        }
                    }
                    else
                    {
                        span.style.color = "yellow";
                    }
                    span.innerText = result.delay[index].estimatedTime;
                    
                    var temp = result.delay[index].estimatedTime.split(":");
                    var estimatedHours = parseInt(temp[0]);
                    var estimatedMinutes = parseInt(temp[1]);
                    var now = new Date();
                    var estimatedTime = new Date();
                    if (estimatedHours < now.getHours())
                    {
                        estimatedTime.setDay(estimatedTime.getDate() + 1);
                        estimatedTime.setHours(estimatedHours);
                        estimatedTime.setMinutes(estimatedMinutes);
                    }
                    else
                    {
                        estimatedTime.setHours(estimatedHours);
                        estimatedTime.setMinutes(estimatedMinutes);
                    }
                    var calculatedTimeMinutes = (estimatedTime - now) / (1000 * 60);

                    if (calculatedTimeMinutes < 30) // 30 min
                    {
                        span.innerText += " (" + calculatedTimeMinutes.toString() + " min)";
                    }
                    th.appendChild(span);
                }

                div2.appendChild(tb3);
                table.appendChild(div2);

                table.innerHTML += "<div id=\"dispatcherMessageScroll\" style=\"overflow: hidden; display: none; width: 962px;\"><div id=\"scroller\" style=\"position: absolute; left: 444px; top: 0px;\"><p id=\"scroller_content\"></p></div></div>";
            }
        });
    }
};