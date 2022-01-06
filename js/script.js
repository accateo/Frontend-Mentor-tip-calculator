//VARIABLES
let billInput = $("#billForm");
let customInput = $("#customInput");
let billAmount = 0;
let tipAmount = 0;
let numOfPeople = 1;

//choose amount
function selected(element, num){
    tipAmount = num/100;
    setColor(element.id);
    calResult();
}
//reset button colors
function resetColors(){
	
	$(".tip").css("background-color", "hsl(183, 100%, 15%)");
	$(".tip").css("color", "hsl(0, 0%, 100%)");
	
	$(".custom").css("border", "1px solid hsl(185, 41%, 84%)");

}

//set color button
function setColor(buttonName){
    //Reset Colours
    resetColors();
    // change color button
	$("#"+buttonName).attr('style', 'border-color:hsl(172, 67%, 45%) !important;background-color: hsl(172, 67%, 45%) !important;color:hsl(183, 100%, 15%) !important;');
}

function calResult(){
    //If the number of people input element has a value of zero
    if($("#numberPeople").val() == '' || $("#numberPeople").val() == 0){
		$("#numberPeople").css({"border-color": "red", "border-width":"2px", "border-style":"solid"});
		$("#numberPeople").attr('style','border-color: red !important; border-width:2px !important;border-style:solid !important');
        $("#tipAmount").html("$0.00");
        $("#total").html("$0.00");
    }
    else{
        $("#numberPeople").css("border", "none");
        // Calculate the tip 
        let tip = ((billAmount*tipAmount)/numOfPeople);
        tip = tip.toFixed(2); 
        tip = parseFloat(tip);
        $("#tipAmount").html("$" + tip);

        // Calculate the total per person and result
        let totalBillPerPerson = (billAmount/numOfPeople);
        totalBillPerPerson.toFixed(2);
        totalBillPerPerson = parseFloat(totalBillPerPerson);
        total = (totalBillPerPerson + tip).toFixed(2);
        $("#total").html("$" + total);
    }
}



// Page ready
$( document ).ready(function() {
    
	//reset button
	$( "#reset" ).click(function() {
	  //reset the colour of the buttonscolours
	    resetColors();
	    $("#billForm").val("");
	    $("#numberPeople").val("");
	    $("#customInput").val("");

	    //reset the tip to 1
	    tipAmount = 0;
	    numOfPeople = 1;
	    billAmount = 0;

	    $("#tipAmount").html("$0.00");
	    $("#total").html("$0.00");
	});

	//LISTENER
	document.getElementById("billForm").addEventListener("input", function(){
		billAmount = parseFloat($("#billForm").val()).toFixed(2);
		calResult();
	});


	document.getElementById("numberPeople").addEventListener("input", function(){
		numOfPeople = parseInt($("#numberPeople").val(), 10);
		calResult()
	});

	//cant be zero message
	document.getElementById("numberPeople").addEventListener("input", function(){
		if($("#numberPeople").val() == 0){
			$("#cantbezero").show();
		}

		if($("#numberPeople").val() != 0){
			$("#cantbezero").hide();
		}
	});

	//WHEN THE VALUE OF THE CUSTOM INPUT CHANGES, CALCULATE THE RESULTS
	document.getElementById("customInput").addEventListener("input", function(){
		tipAmount = $("#customInput").val()/100;
		calResult();
	});

	document.getElementById("billForm").addEventListener("focus", function(){
	    document.querySelector(".bill-container").style.border = "2px solid hsl(172, 67%, 45%)"
	});

	document.getElementById("numberPeople").addEventListener("focus", function(){
	    document.querySelector(".number-container").style.border = "2px solid hsl(172, 67%, 45%)"
	});

	
});