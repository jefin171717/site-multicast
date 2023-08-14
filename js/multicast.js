var ring = d3.select("#mbsvg")
    .append("svg")
    .attr("width", 300)
    .attr("height", 300);

var radio = 15, angle, n1 = 5, x1, y1, x2, y2, y0=34,x0=162;
var arrayNodes = [],processQueue = [];
var arrayNodesE = [];
var normalColor = "#F05600", line = "RoyalBlue";
var usingColor = "#FF9F1C", requestColor = "#009933";
var lineC = "#000000", colorC = "#ffffff";
var positionToken = 0;
var rand;
var pInit=0;
var tokenProcess = true;
var colorStatus = "#ffffff";
var optionToken;

function addPToken(){
    optionToken = comboboxOptions.options[comboboxOptions.selectedIndex].value;
    pInit = optionToken;
    for (let i = 0; i < n1; i++){
        d3.select("#mbsvg").selectAll(".token"+i)
            .attr("cx", arrayNodes[pInit].x)
            .attr("cy", arrayNodes[pInit].y);
        
    }
    drawInit();
    reset2();
}

// Função para desenhar a simulção
function drawInit() {
    
    for (let i = 0; i < n1; i++) {
        angle = 2 * Math.PI * i / n1;
        x1 = Math.cos(angle) * 103 + 130;
        y1 = Math.sin(angle) * 103 + 130;
        angle = angle + (Math.PI / 2);

        var newNode = { x: x1, y: y1, id: i, angle, tokenProcess: pInit };
        arrayNodes.push(newNode);

    }
    for (let i = 0; i < n1; i++) {
        if (i === arrayNodes.length - 1) {
            var arc = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(arrayNodes[0].angle + (2 * Math.PI))
                .endAngle(arrayNodes[i].angle);
        }
        else {
            var arc = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(arrayNodes[i + 1].angle)
                .endAngle(arrayNodes[i].angle);
        }
        for(let i = 0; i < n1;i++){
            
            ring.append("line")
                .attr("x1", arrayNodes[pInit].x)
                .attr("y1",arrayNodes[pInit].y)
                .attr("x2", arrayNodes[i].x)
                .attr("y2", arrayNodes[i].y)
                .attr("stroke", lineC)
                .attr("stroke-width", 5)
                .attr("fill", colorC);
        }
    
        
    }
    for (let i = 0; i < n1; i++) {
        ring.append("circle")
            .attr("cx", arrayNodes[i].x)
            .attr("cy", arrayNodes[i].y)
            .attr("r", radio)
            .attr("stroke", line)
            .attr("stroke-width", 1)
            .attr("fill", normalColor)
            .attr("class", "P" + i);
        ring.append("rect")
            .attr("x", arrayNodes[i].x - 35)
            .attr("y", arrayNodes[i].y - 2)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorStatus)
            .attr("class", "meu-rect" + i);
        ring.append("text")
            .attr("x", arrayNodes[i].x - 35)
            .attr("y", arrayNodes[i].y + 8)
            .text("P" + i)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    }
    for (let i = 0; i < 11; i++){
        ring.append("circle")
            .attr("class", "token"+ i)
            .attr("cx", arrayNodes[pInit].x)
            .attr("cy", arrayNodes[pInit].y)
            .attr('r', 5)
            .attr('fill', colorC)
            .attr("stroke", lineC);
    }
        
}


var aux;
var novoValorDaCor = "#0000FF";
function playAlg(){
    if(pInit == 3){
        d3.select("#mbsvg").selectAll("rect").attr("fill", "#FF0000");
        alert("O processo falhou em enviar a mensagem.");
    }else{
        d3.select("#buttonsR2").selectAll("button").remove();
        d3.select("#mbsvg").selectAll(".token" + pInit)
            .transition()
            .duration(3500)
            .attr("cx", x0) // x0
            .attr("cy", y0); //y0
        
        //pInit += 1;
        
        
        d3.select("#mbsvg").selectAll("rect.meu-rect" + pInit).attr("fill", novoValorDaCor);
        //d3.select("#mbsvg").selectAll("rect.meu-rect").filter((d,i) => i === 0).attr("fill", novoValorDaCor);

        d3.select("#buttonsR2").append("button")
            .attr("class", "btn btn-rounded btn-light btn-sm")
            .attr("id", "advance")
            .text("Avançar");
        setTimeout(function () {
            d3.select("#buttonsR2").selectAll("#advance")
                .attr("onclick", "advanceAlg()");
        }, 3500)

        setTimeout(function() {
            d3.select("#mbsvg").selectAll("rect.meu-rect4").attr("fill", novoValorDaCor);
        },3500)

        d3.select("#buttonsR2").append("button")
            .attr("onclick", "reset()")
            .attr("class", "btn btn-rounded btn-light btn-sm")
            .attr("id", "reset")
            .text("Reiniciar");
        
        tokenProcess = true;
        positionToken = 1;
    }
}

function advanceAlg() {
    var count = 0;
    lockAdvance();
    if (pInit == 0){
        if (count < 4) {
            if (tokenProcess) {
                if(positionToken == 1){
                    count = 1;
                    d3.select("#mbsvg").selectAll(".token10")
                        .transition()
                        .duration(3500)
                        .attr("cx", arrayNodes[count].x)
                        .attr("cy", arrayNodes[count].y);

                    setTimeout(function () {
                        d3.select("#buttonsR2").selectAll("#advance")
                        .attr("onclick", "advanceAlg()");
                    }, 3500);
                    
                    
                
                    setTimeout(function() {
                        d3.select("#mbsvg").selectAll("rect.meu-rect" + count).attr("fill", novoValorDaCor);
                    },3500)
                    positionToken += 1;
                }
                else if(positionToken == 2){
                    count = 2;
                    d3.select("#mbsvg").selectAll(".token9")
                        .transition()
                        .duration(3500)
                        .attr("cx", arrayNodes[count].x)
                        .attr("cy", arrayNodes[count].y);

                    setTimeout(function () {
                        d3.select("#buttonsR2").selectAll("#advance")
                        .attr("onclick", "advanceAlg()");
                    }, 3500);
                    
                    
                    setTimeout(function() {
                        d3.select("#mbsvg").selectAll("rect.meu-rect" + count).attr("fill", novoValorDaCor);
                    },3500)
                    positionToken += 1;
                }
                else if (positionToken == 3){
                    count = 3;
                    d3.select("#mbsvg").selectAll(".token8")
                        .transition()
                        .duration(3500)
                        .attr("cx", arrayNodes[count].x)
                        .attr("cy", arrayNodes[count].y);

                    setTimeout(function () {
                        d3.select("#buttonsR2").selectAll("#advance")
                        .attr("onclick", "advanceAlg()");
                    }, 3500);
                    
                    
                    setTimeout(function() {
                        d3.select("#mbsvg").selectAll("rect.meu-rect" + count).attr("fill", novoValorDaCor);
                    },3500)
                    positionToken = 1;
                }
                
            }   
            
        }
        //else{
            //d3.select("#mbsvg").selectAll("rect").attr("fill", "#FF0000");
        //}

    }
    if (pInit == 1){
        if (count < 4) {
            if (tokenProcess) {
                if(positionToken == 1){
                    count = 0;
                    d3.select("#mbsvg").selectAll(".token10")
                        .transition()
                        .duration(3500)
                        .attr("cx", arrayNodes[count].x)
                        .attr("cy", arrayNodes[count].y);

                    setTimeout(function () {
                        d3.select("#buttonsR2").selectAll("#advance")
                        .attr("onclick", "advanceAlg()");
                    }, 3500);
                    
                    
                
                    setTimeout(function() {
                        d3.select("#mbsvg").selectAll("rect.meu-rect" + count).attr("fill", novoValorDaCor);
                    },3500)
                    positionToken += 1;
                }
                else if(positionToken == 2){
                    count = 2;
                    d3.select("#mbsvg").selectAll(".token9")
                        .transition()
                        .duration(3500)
                        .attr("cx", arrayNodes[count].x)
                        .attr("cy", arrayNodes[count].y);

                    setTimeout(function () {
                        d3.select("#buttonsR2").selectAll("#advance")
                        .attr("onclick", "advanceAlg()");
                    }, 3500);
                    
                    
                    setTimeout(function() {
                        d3.select("#mbsvg").selectAll("rect.meu-rect" + count).attr("fill", novoValorDaCor);
                    },3500)
                    positionToken += 1;
                }
                else if (positionToken == 3){
                    count = 3;
                    d3.select("#mbsvg").selectAll(".token8")
                        .transition()
                        .duration(3500)
                        .attr("cx", arrayNodes[count].x)
                        .attr("cy", arrayNodes[count].y);

                    setTimeout(function () {
                        d3.select("#buttonsR2").selectAll("#advance")
                        .attr("onclick", "advanceAlg()");
                    }, 3500);
                    
                    
                    setTimeout(function() {
                        d3.select("#mbsvg").selectAll("rect.meu-rect" + count).attr("fill", novoValorDaCor);
                    },3500)
                    positionToken = 1;
                }
                
            }   
            
        }
        //else{
            //d3.select("#mbsvg").selectAll("rect").attr("fill", "#FF0000");
        //}

    }
    if (pInit == 2){
        if (count < 4) {
            if (tokenProcess) {
                if(positionToken == 1){
                    count = 1;
                    d3.select("#mbsvg").selectAll(".token10")
                        .transition()
                        .duration(3500)
                        .attr("cx", arrayNodes[count].x)
                        .attr("cy", arrayNodes[count].y);

                    setTimeout(function () {
                        d3.select("#buttonsR2").selectAll("#advance")
                        .attr("onclick", "advanceAlg()");
                    }, 3500);
                    
                    
                
                    setTimeout(function() {
                        d3.select("#mbsvg").selectAll("rect.meu-rect" + count).attr("fill", novoValorDaCor);
                    },3500)
                    positionToken += 1;
                }
                else if(positionToken == 2){
                    count = 0;
                    d3.select("#mbsvg").selectAll(".token9")
                        .transition()
                        .duration(3500)
                        .attr("cx", arrayNodes[count].x)
                        .attr("cy", arrayNodes[count].y);

                    setTimeout(function () {
                        d3.select("#buttonsR2").selectAll("#advance")
                        .attr("onclick", "advanceAlg()");
                    }, 3500);
                    
                    
                    setTimeout(function() {
                        d3.select("#mbsvg").selectAll("rect.meu-rect" + count).attr("fill", novoValorDaCor);
                    },3500)
                    positionToken += 1;
                }
                else if (positionToken == 3){
                    count = 3;
                    d3.select("#mbsvg").selectAll(".token8")
                        .transition()
                        .duration(3500)
                        .attr("cx", arrayNodes[count].x)
                        .attr("cy", arrayNodes[count].y);

                    setTimeout(function () {
                        d3.select("#buttonsR2").selectAll("#advance")
                        .attr("onclick", "advanceAlg()");
                    }, 3500);
                    
                    
                    setTimeout(function() {
                        d3.select("#mbsvg").selectAll("rect.meu-rect" + count).attr("fill", novoValorDaCor);
                    },3500)
                    positionToken = 1;
                }
                
            }   
            
        }
        //else{
            //d3.select("#mbsvg").selectAll("rect").attr("fill", "#FF0000");
        //}

    }
    
   
    

}

function lockAdvance() {
    d3.select("#buttonsR2").selectAll("#advance")
        .attr("onclick", "");
    d3.select("#buttonsR3").selectAll("#advance2")
        .attr("onclick", "");
}

// reset 1
function reset() {
    d3.select("#mbsvg").selectAll("circle").remove();
    d3.select("#mbsvg").selectAll("text").remove();
    d3.select("#mbsvg").selectAll("rect").remove();
    d3.select("#mbsvg").selectAll("line").remove();
    d3.select("#mbsvg").selectAll(".token").remove();
    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#combobox").selectAll("option").remove();
    d3.select("#combobox").selectAll("select").remove();
    arrayNodes.splice(0, 10);
    d3.select("#buttonsR2").append("button")
        .attr("onclick", "playAlg()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Iniciar");
    d3.select("#buttonsR2").append("button")
        .attr("onclick", "reset()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset")
        .text("Reiniciar");
    pInit = 0;
    positionToken = 0;
    drawInit();
    createComboBox();
}

// reset 2
function reset2() {
    d3.select("#mbsvg").selectAll("circle").remove();
    d3.select("#mbsvg").selectAll("text").remove();
    d3.select("#mbsvg").selectAll("rect").remove();
    d3.select("#mbsvg").selectAll("line").remove();
    d3.select("#mbsvg").selectAll(".token").remove();
    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#combobox").selectAll("option").remove();
    d3.select("#combobox").selectAll("select").remove();
    arrayNodes.splice(0, 10);
    d3.select("#buttonsR2").append("button")
        .attr("onclick", "playAlg()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Iniciar");
    d3.select("#buttonsR2").append("button")
        .attr("onclick", "reset()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset")
        .text("Reiniciar");
    drawInit();
    createComboBox();
}

// caixa de seleção
var comboboxOptions = document.getElementById("combobox");
function createComboBox() {
    var j = n1 - 1;
    for (let i = 0; i < j; i++) {
        comboboxOptions.options[comboboxOptions.options.length] = new Option('Processo ' + arrayNodes[i].id,  i);
    }
}
function showProcess() {
    d3.select("#mbsvg").selectAll(".P0")
        .transition()
        .duration(300)
        .delay(function (d, i) { return i * 50; })
        .on("start", function repeat() {
            d3.active(this)
                .transition()
                .style("stroke", normalColor)
                .style("stroke-width", 1)
                .transition()
                .style("stroke", normalColor)
                .style("stroke-width", 4)
                .on("start", repeat);
        })

    ring.append("rect")
        .attr("x", 370)
        .attr("y", 145)
        .attr("class", "ajuda")
        .attr("width", 60)
        .attr("height", 18)
        .attr("stroke", lineC)
        .attr("stroke-width", 1)
        .attr("fill", "transparent");
    ring.append("text")
        .attr("x", 372)
        .attr("y", 158)
        .attr("class", "ajuda")
        .text("Processos")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", lineC);
    ring.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("class", "ajuda")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");
    ring.append("line")
        .attr("class", "ajuda")
        .attr("x1", 330)
        .attr("y1", 153)
        .attr("x2", 370)
        .attr("y2", 153)
        .attr("stroke", lineC)
        .attr("stroke-width", 1)
        .attr("marker-start", "url(#arrow)");
}
function unshowProcess() {
    d3.select("#mbsvg").selectAll(".P0")
        .transition()
        .duration(700)
        .on("start", function repeat() {
            d3.active(this)
                .transition()
                .style("stroke", normalColor)
                .style("stroke-width", 1)
                .on("start", repeat);
        })
    d3.select("#mbsvg").selectAll(".ajuda").remove();
}
function showToken() {
    d3.select("#mbsvg").selectAll(".token0")
        .transition()
        .duration(300)
        .on("start", function repeat() {
            d3.active(this)
                .transition()
                .style("stroke", colorC)
                .style("stroke-width", 1)
                .transition()
                .style("stroke", colorC)
                .style("stroke-width", 4)
                .on("start", repeat);
        })

    example.append("rect")
        .attr("x", 110)
        .attr("y", 15)
        .attr("class", "ajuda")
        .attr("width", 90)
        .attr("height", 18)
        .attr("stroke", lineC)
        .attr("stroke-width", 1)
        .attr("fill", "transparent");
    example.append("text")
        .attr("x", 112)
        .attr("y", 28)
        .attr("class", "ajuda")
        .text("Servidor Central")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", lineC);
    example.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("class", "ajuda")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");
    example.append("line")
        .attr("class", "ajuda")
        .attr("x1", 234)
        .attr("y1", 23)
        .attr("x2", 200)
        .attr("y2", 23)
        .attr("stroke", lineC)
        .attr("stroke-width", 1)
        .attr("marker-start", "url(#arrow)");
}
function unshowToken() {
    d3.select("#mbsvg").selectAll(".token0")
        .transition()
        .duration(700)
        .on("start", function repeat() {
            d3.active(this)
                .transition()
                .style("stroke", line)
                .style("stroke-width", 1)
                .on("start", repeat);
        })
    d3.select("#mbsvg").selectAll(".ajuda").remove();
}

var slider = document.getElementById("sliderNodePart");
slider.oninput = function () {
    arrayNodes.splice(0, 10);
    n1 = this.value;
    //changeDrawing();
}
function changeDrawing() {
    d3.select("#mbsvg").selectAll("circle").remove();
    d3.select("#mbsvg").selectAll("text").remove();
    d3.select("#mbsvg").selectAll("rect").remove();
    d3.select("#mbsvg").selectAll("line").remove();
    d3.select("#mbsvg").selectAll(".token").remove();
    d3.select("#buttonsR2").selectAll("button").remove();
    d3.select("#combobox").selectAll("option").remove();
    d3.select("#combobox").selectAll("select").remove();
    pInitInit = 0;
    drawInit();
    d3.select("#buttonsR2").append("button")
        .attr("onclick", "playAlg()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Iniciar");
}







//*****************************************************************************************************
//*****************************************************************************************************
//*****************************************************************************************************





// algoritmo multicast confiavel
var ring2 = d3.select("#mcsvg")
    .append("svg")
    .attr("width", 300)
    .attr("height", 300);

var radio = 15, angle, n1 = 5, x1, y1, x2, y2, y0=34,x0=162;
var arrayNodes2 = [],processQueue = [];
var positionToken2 = 0;
var pInit2 = 0;
var tokenProcess2 = true;
var optionToken2;

function addPToken2(){
    optionToken2 = comboboxOptions2.options[comboboxOptions2.selectedIndex].value;
    pInit2 = optionToken2;
    for (let i = 0; i < n1; i++){
        d3.select("#mcsvg").selectAll(".token0"+i)
            .attr("cx", arrayNodes2[pInit2].x)
            .attr("cy", arrayNodes2[pInit2].y);
        
    }
    drawInit2();
    reset4();
}



function drawInit2() {
    
    for (let i = 0; i < n1; i++) {
        angle = 2 * Math.PI * i / n1;
        x1 = Math.cos(angle) * 103 + 130;
        y1 = Math.sin(angle) * 103 + 130;
        angle = angle + (Math.PI / 2);

        var newNode = { x: x1, y: y1, id: i, angle, tokenProcess2: pInit2 };
        arrayNodes2.push(newNode);

    }
    for (let i = 0; i < n1; i++) {
        if (i === arrayNodes2.length - 1) {
            var arc2 = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(arrayNodes2[0].angle + (2 * Math.PI))
                .endAngle(arrayNodes2[i].angle);
        }
        else {
            var arc2 = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(arrayNodes2[i + 1].angle)
                .endAngle(arrayNodes2[i].angle);
        }
        for(let i = 0; i < n1;i++){
            ring2.append("line")
                .attr("x1", arrayNodes2[pInit2].x)
                .attr("y1",arrayNodes2[pInit2].y)
                .attr("x2", arrayNodes2[i].x)
                .attr("y2", arrayNodes2[i].y)
                .attr("stroke", lineC)
                .attr("stroke-width", 5)
                .attr("fill", colorC);
        }
    
        
    }
    for (let i = 0; i < n1; i++) {
        ring2.append("circle")
            .attr("cx", arrayNodes2[i].x)
            .attr("cy", arrayNodes2[i].y)
            .attr("r", radio)
            .attr("stroke", line)
            .attr("stroke-width", 1)
            .attr("fill", normalColor)
            .attr("class", "P" + i);
        ring2.append("rect")
            .attr("x", arrayNodes2[i].x - 35)
            .attr("y", arrayNodes2[i].y - 2)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorStatus)
            .attr("class", "meu-rect" + i);
        ring2.append("text")
            .attr("x", arrayNodes2[i].x - 35)
            .attr("y", arrayNodes2[i].y + 8)
            .text("P" + i)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    }
    for (let i = 0; i < 11; i++){
        ring2.append("circle")
        .attr("class", "token0" + i)
        .attr("cx", arrayNodes2[pInit2].x)
        .attr("cy", arrayNodes2[pInit2].y)
        .attr('r', 5)
        .attr('fill', colorC)
        .attr("stroke", lineC);
    }
    
        
}

// Desenho 3
var pInit3 = 0;
function drawInit3() {
    
    for (let i = 0; i < n1; i++) {
        angle = 2 * Math.PI * i / n1;
        x1 = Math.cos(angle) * 103 + 130;
        y1 = Math.sin(angle) * 103 + 130;
        angle = angle + (Math.PI / 2);

        var newNode = { x: x1, y: y1, id: i, angle, tokenProcess2: pInit3 };
        arrayNodes2.push(newNode);

    }
    for (let i = 0; i < n1; i++) {
        if (i === arrayNodes2.length - 1) {
            var arc2 = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(arrayNodes2[0].angle + (2 * Math.PI))
                .endAngle(arrayNodes2[i].angle);
        }
        else {
            var arc2 = d3.arc()
                .innerRadius(102.5)
                .outerRadius(103.5)
                .startAngle(arrayNodes2[i + 1].angle)
                .endAngle(arrayNodes2[i].angle);
        }
        for(let i = 0; i < n1;i++){
            ring2.append("line")
                .attr("x1", arrayNodes2[pInit3].x)
                .attr("y1",arrayNodes2[pInit3].y)
                .attr("x2", arrayNodes2[i].x)
                .attr("y2", arrayNodes2[i].y)
                .attr("stroke", lineC)
                .attr("stroke-width", 5)
                .attr("fill", colorC);
        }
    
        
    }
    for (let i = 0; i < n1; i++) {
        ring2.append("circle")
            .attr("cx", arrayNodes2[i].x)
            .attr("cy", arrayNodes2[i].y)
            .attr("r", radio)
            .attr("stroke", line)
            .attr("stroke-width", 1)
            .attr("fill", normalColor)
            .attr("class", "P" + i);
        ring2.append("rect")
            .attr("x", arrayNodes2[i].x - 35)
            .attr("y", arrayNodes2[i].y - 2)
            .attr("width", 16)
            .attr("height", 15)
            .attr("stroke", lineC)
            .attr("stroke-width", 1)
            .attr("fill", colorStatus)
            .attr("class", "meu-rect" + i);
        ring2.append("text")
            .attr("x", arrayNodes2[i].x - 35)
            .attr("y", arrayNodes2[i].y + 8)
            .text("P" + i)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", lineC);
    }
    for (let i = 0; i < 11; i++){
        ring2.append("circle")
        .attr("class", "token0" + i)
        .attr("cx", arrayNodes2[pInit3].x)
        .attr("cy", arrayNodes2[pInit3].y)
        .attr('r', 5)
        .attr('fill', colorC)
        .attr("stroke", lineC);
    }
    
        
}


function playAlg2(){
    var count2 = 0;
    
    d3.select("#buttonsR3").selectAll("button").remove();
    setTimeout(function() {
        d3.select("#mcsvg").selectAll("rect.meu-rect" + pInit2).attr("fill", novoValorDaCor);
    },50)
   
    for(let i = 0; i < n1; i++){
            
            d3.select("#mcsvg").selectAll(".token0" + i)
                    .transition()
                    .duration(3500)
                    .attr("cx", arrayNodes2[count2].x)
                    .attr("cy", arrayNodes2[count2].y); 
            count2 += 1;
    }                
    setTimeout(function() {
                d3.select("#mcsvg").selectAll("rect").attr("fill", novoValorDaCor);
                    },3500) 
    d3.select("#buttonsR3").append("button")
            .attr("class", "btn btn-rounded btn-light btn-sm")
            .attr("id", "advance2")
            .text("Avançar");
    setTimeout(function () {
            d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
            }, 3500)

    setTimeout(function() {
            d3.select("#mcsvg").selectAll("rect.meu-rect4").attr("fill", novoValorDaCor);
            },3500)

    d3.select("#buttonsR3").append("button")
            .attr("onclick", "reset3()")
            .attr("class", "btn btn-rounded btn-light btn-sm")
            .attr("id", "reset2")
            .text("Reiniciar"); 
        


                 
}
var cont3 = 0;
function advanceAlg2(){
    lockAdvance();

    positionToken2 = 0;
    if(pInit2 == 0){
        if(cont3 < 4){
            if(cont3 == 0){
                mudarDesenho1();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);
            }    
            if(cont3 == 1){
                mudarDesenho2();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500); 
            }   
            if(cont3 == 2){
                mudarDesenho3();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
                
            }
            if(cont3 == 3){
                mudarDesenho4();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
            }
            cont3 +=1;
        }
    }
    if(pInit2 == 1){
        if(cont3 < 4){
            if(cont3 == 0){
                mudarDesenho0();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);
            }    
            if(cont3 == 1){
                mudarDesenho2();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500); 
            }   
            if(cont3 == 2){
                mudarDesenho3();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
                
            }
            if(cont3 == 3){
                mudarDesenho4();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
            }
            cont3 +=1;
        }
        count = 0
    }
    if(pInit2 == 2){
        if(cont3 < 4){
            if(cont3 == 0){
                mudarDesenho0();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);
            }    
            if(cont3 == 1){
                mudarDesenho1();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500); 
            }   
            if(cont3 == 2){
                mudarDesenho3();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
                
            }
            if(cont3 == 3){
                mudarDesenho4();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
            }
            cont3 +=1;
        }
        count = 0
    }
    if(pInit2 == 3){
        if(cont3 < 4){
            if(cont3 == 0){
                mudarDesenho0();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);
            }    
            if(cont3 == 1){
                mudarDesenho1();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500); 
            }   
            if(cont3 == 2){
                mudarDesenho2();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
                
            }
            if(cont3 == 3){
                mudarDesenho4();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
            }
            cont3 +=1;
        }
        count = 0
    }
    if(pInit2 == 4){
        if(cont3 < 4){
            if(cont3 == 0){
                mudarDesenho0();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);
            }    
            if(cont3 == 1){
                mudarDesenho1();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500); 
            }   
            if(cont3 == 2){
                mudarDesenho2();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
                
            }
            if(cont3 == 3){
                mudarDesenho3();
                send();
                setTimeout(function () {
                    d3.select("#buttonsR3").selectAll("#advance2")
                    .attr("onclick", "advanceAlg2()");
                }, 3500);  
            }
            cont3 +=1;
        }
        count = 0

    }     

}

// caixa de seleção
var comboboxOptions2 = document.getElementById("combobox2");
function createComboBox2() {
    var j = n1;
    for (let i = 0; i < j; i++) {
        comboboxOptions2.options[comboboxOptions2.options.length] = new Option('Processo ' + arrayNodes2[i].id,  i);
    }
}

function reset3() {
    d3.select("#mcsvg").selectAll("circle").remove();
    d3.select("#mcsvg").selectAll("text").remove();
    d3.select("#mcsvg").selectAll("rect").remove();
    d3.select("#mcsvg").selectAll("line").remove();
    d3.select("#mcsvg").selectAll(".token0").remove();
    d3.select("#buttonsR3").selectAll("button").remove();
    d3.select("#combobox2").selectAll("option").remove();
    d3.select("#combobox2").selectAll("select").remove();
    arrayNodes.splice(0, 10);
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "playAlg2()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Iniciar");
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "reset3()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset2")
        .text("Reiniciar");
    pInit2 = 0;
    positionToken2 = 0;
    drawInit2();
    createComboBox2();
    
}
function reset4() {
    d3.select("#mcsvg").selectAll("circle").remove();
    d3.select("#mcsvg").selectAll("text").remove();
    d3.select("#mcsvg").selectAll("rect").remove();
    d3.select("#mcsvg").selectAll("line").remove();
    d3.select("#mcsvg").selectAll(".token0").remove();
    d3.select("#buttonsR3").selectAll("button").remove();
    d3.select("#combobox2").selectAll("option").remove();
    d3.select("#combobox2").selectAll("select").remove();
    arrayNodes.splice(0, 10);
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "playAlg2()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .text("Iniciar");
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "reset3()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset2")
        .text("Reiniciar");
    drawInit2();
    createComboBox2();
    
}
function mudarDesenho0(){
    d3.select("#mcsvg").selectAll("circle").remove();
    d3.select("#mcsvg").selectAll("text").remove();
    d3.select("#mcsvg").selectAll("rect").remove();
    d3.select("#mcsvg").selectAll("line").remove();
    d3.select("#mcsvg").selectAll(".token0").remove();
    d3.select("#buttonsR3").selectAll("button").remove();
    d3.select("#buttonsMC").selectAll("button").remove();
    d3.select("#combobox2").selectAll("option").remove();
    d3.select("#combobox2").selectAll("select").remove();
    
    d3.select("#buttonsR3").append("button")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "advance2")
        .text("Avançar");
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "reset3()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset2")
        .text("Reiniciar");
    pInit3 = 0;
    drawInit3();
    d3.select("#mcsvg").selectAll("rect").attr("fill", novoValorDaCor);
    createComboBox2();
}
function mudarDesenho1(){
    d3.select("#mcsvg").selectAll("circle").remove();
    d3.select("#mcsvg").selectAll("text").remove();
    d3.select("#mcsvg").selectAll("rect").remove();
    d3.select("#mcsvg").selectAll("line").remove();
    d3.select("#mcsvg").selectAll(".token0").remove();
    d3.select("#buttonsR3").selectAll("button").remove();
    d3.select("#buttonsMC").selectAll("button").remove();
    d3.select("#combobox2").selectAll("option").remove();
    d3.select("#combobox2").selectAll("select").remove();
    
    d3.select("#buttonsR3").append("button")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "advance2")
        .text("Avançar");
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "reset3()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset2")
        .text("Reiniciar");
    pInit3 = 1;
    drawInit3();
    d3.select("#mcsvg").selectAll("rect").attr("fill", novoValorDaCor);
    createComboBox2();
}
function mudarDesenho2(){
    d3.select("#mcsvg").selectAll("circle").remove();
    d3.select("#mcsvg").selectAll("text").remove();
    d3.select("#mcsvg").selectAll("rect").remove();
    d3.select("#mcsvg").selectAll("line").remove();
    d3.select("#mcsvg").selectAll(".token0").remove();
    d3.select("#buttonsR3").selectAll("button").remove();
    d3.select("#buttonsMC").selectAll("button").remove();
    d3.select("#combobox2").selectAll("option").remove();
    d3.select("#combobox2").selectAll("select").remove();
    d3.select("#buttonsR3").append("button")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "advance2")
        .text("Avançar");
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "reset3()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset2")
        .text("Reiniciar");
    pInit3 = 2;
    drawInit3();
    d3.select("#mcsvg").selectAll("rect").attr("fill", novoValorDaCor);
    createComboBox2();
}
function mudarDesenho3(){
    d3.select("#mcsvg").selectAll("circle").remove();
    d3.select("#mcsvg").selectAll("text").remove();
    d3.select("#mcsvg").selectAll("rect").remove();
    d3.select("#mcsvg").selectAll("line").remove();
    d3.select("#mcsvg").selectAll(".token0").remove();
    d3.select("#buttonsR3").selectAll("button").remove();
    d3.select("#buttonsMC").selectAll("button").remove();
    d3.select("#combobox2").selectAll("option").remove();
    d3.select("#combobox2").selectAll("select").remove();
    d3.select("#buttonsR3").append("button")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "advance2")
        .text("Avançar");
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "reset3()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset2")
        .text("Reiniciar");
    pInit3 = 3;
    drawInit3();
    d3.select("#mcsvg").selectAll("rect").attr("fill", novoValorDaCor);
    createComboBox2();
}
function mudarDesenho4(){
    d3.select("#mcsvg").selectAll("circle").remove();
    d3.select("#mcsvg").selectAll("text").remove();
    d3.select("#mcsvg").selectAll("rect").remove();
    d3.select("#mcsvg").selectAll("line").remove();
    d3.select("#mcsvg").selectAll(".token0").remove();
    d3.select("#buttonsR3").selectAll("button").remove();
    d3.select("#buttonsMC").selectAll("button").remove();
    d3.select("#combobox2").selectAll("option").remove();
    d3.select("#combobox2").selectAll("select").remove();
    d3.select("#buttonsR3").append("button")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "advance2")
        .text("Avançar");
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "reset3()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset2")
        .text("Reiniciar");
    pInit3 = 4;
    drawInit3();
    d3.select("#mcsvg").selectAll("rect").attr("fill", novoValorDaCor);
    createComboBox2();
}
function mudarDesenho5(){
    d3.select("#mcsvg").selectAll("circle").remove();
    d3.select("#mcsvg").selectAll("text").remove();
    d3.select("#mcsvg").selectAll("rect").remove();
    d3.select("#mcsvg").selectAll("line").remove();
    d3.select("#mcsvg").selectAll(".token0").remove();
    d3.select("#buttonsR3").selectAll("button").remove();
    d3.select("#buttonsMC").selectAll("button").remove();
    d3.select("#combobox2").selectAll("option").remove();
    d3.select("#combobox2").selectAll("select").remove();
    d3.select("#buttonsR3").append("button")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "advance2")
        .text("Avançar");
    d3.select("#buttonsR3").append("button")
        .attr("onclick", "reset3()")
        .attr("class", "btn btn-rounded btn-light btn-sm")
        .attr("id", "reset2")
        .text("Reiniciar");
    pInit3 = 5;
    drawInit3();
    d3.select("#mcsvg").selectAll("rect").attr("fill", novoValorDaCor);
    createComboBox2();
}

function send(){
    var count2 = 0;
    for(let i = 0; i < 5; i++){
        d3.select("#mcsvg").selectAll(".token0" + i)
                .transition()
                .duration(3500)
                .attr("cx", arrayNodes2[count2].x)
                .attr("cy", arrayNodes2[count2].y); 
        count2 += 1;
    }
    
}





window.onload = function(){
    drawInit();
    createComboBox();
    drawInit2();
    createComboBox2();
    
}
