var user = "";
var name ="";
todos = [];

fname="";
lname = "";
email = "";
mobile = "";
customer = [];
function validateEmail(email) 
{
	var re = /^\w+([\.-]?\w+)*@(\w{2,9})+(\.\w{2,3})*(\.\w{2,3})+$/;
	return re.test(email);
}

function addcust() 
{
	fname = document.getElementById('customerNewName').value.trim();
	fname1 = document.getElementById("customerNewName");
	lname = document.getElementById('customerNewLastName').value.trim();
	email = document.getElementById('customerNewEmail').value.trim();
	mobile = document.getElementById('customerNewMobile').value.trim();
	custId = "custId" + Math.random().toString(16).slice(2);
	if(fname == "")
    {
		fname1.style.backgroundColor = "red";
		fname1.focus();
		alert("Enter the name ");
		return false;
    }
	else
    {
		if(email.length!=0 && email!= ""){
			var a = validateEmail(email);
		    if (a == false) {
		      console.log(email);
		      document.getElementById("customerNewEmail").style.backgroundColor = "red";
		      alert("Not a valid e-mail address");
		      fname1.style.backgroundColor = "";
		      return false;
		}
		}
		if(isNaN(mobile)){
			document.getElementById("customerNewMobile").style.backgroundColor = "red";
		      alert("Not a valid number");
		      fname1.style.backgroundColor = "";
		      document.getElementById("customerNewEmail").style.backgroundColor ="";
		      return false;
		}
		fname1.style.backgroundColor = "";
		pushcust(custId,fname,lname,email,mobile);
	    fname1.value = "";
	    createCustList(custId, fname);
	    custAdded(custId,fname,lname,email,mobile);
	
    }
	document.getElementById('customerPopup').style.display='none';
	document.getElementById('pageBlockNewCustomer').style.display='none';
	document.getElementById('customerNewName').value= "";
	document.getElementById('customerNewLastName').value="";
	document.getElementById('customerNewEmail').value="";
	document.getElementById('customerNewMobile').value="";
	

    var listItem = document.getElementsByClassName("custList");
	for (var i = 0; i < listItem.length; i++) {
		listItem[i].classList.remove("active");
	}
	document.getElementById("s"+custId).classList.add("active");
    return false;
}
function pushcust(id,fname,lname,email,mobile)
{
	var person1 = {};
	person1.id=id;
	person1.fname = fname;
	person1.lname = lname;
	person1.email = email;
  	person1.mobile = mobile;
  	customer.push(person1);
  	localStorage.setItem(id, JSON.stringify(person1));
  	console.log(JSON.stringify(customer));
}


function createCustList(id,fname)
{
	sid = "s" + id;
	tid = "t" + id;
	ui = "us" + id;
	var node = document.createElement("LI");
	node.class = "";
	node.id = sid;
	node.className = "custList";
	var para = document.createElement("label");
	para.id = id;
	var textnode = document.createTextNode(fname);
	para.appendChild(textnode);
	var close = document.createElement("BUTTON");
	close.id = id;
	close.className = "removeCust";
	close.innerText	= 'X';
	node.appendChild(para);
	node.appendChild(close);
	para.addEventListener('click',showDetail);
	close.addEventListener('click',removeCust);
	document.getElementById("custList").appendChild(node);
	
}
function custAdded(id,fname,lname,email,mobile){
	if(lname == undefined){
		lname = null;
	}
	if(email == undefined){
		email = null;
	}
	if(mobile == undefined){
		mobile = null;
	}
	
	var name = document.getElementById("custFName");
	name.value = fname;
	name.className = "custdetails "+ id;
	var lastname = document.getElementById("custLName");	
	lastname.value = lname;
	lastname.className = "custdetails "+ id;
	var cmail = document.getElementById("custEmail");
	cmail.value = email;
	cmail.className = "custdetails "+ id;
	var cmobile = document.getElementById("custPhone");
	cmobile.value = mobile;
	cmobile.className = "custdetails "+ id;
	var cupdate = document.getElementById("updateCust");
	cupdate.className = "details1 new-gray-btn1 "+ id;
	var x=document.getElementsByClassName("Custdetails1");
	document.getElementById("todo").innerHTML = "";
	x[0].style.display = 'block';
	x[1].style.display = 'block';
}
function showDetail(){
	var id1 = this.getAttribute('id');
	console.log(id1);
	var id2 = document.getElementById(id1).innerHTML;
	console.log(id2);
	document.getElementById("todo").innerHTML="";
	for (i = 0; i < localStorage.length; i++)   
	{	
	if(localStorage.key(i) == id1){
		var cust = localStorage.getItem(localStorage.key(i));
		var custList = JSON.parse(cust);
		console.log(cust);
		var name = document.getElementById("custFName");
		name.value = custList.fname;
		name.className = "custdetails "+ id1;
		var lastname = document.getElementById("custLName");	
		lastname.value = custList.lname;
		lastname.className = "custdetails "+ id1;
		var cmail = document.getElementById("custEmail");
		cmail.value = custList.email;
		cmail.className = "custdetails "+ id1;
		var cmobile = document.getElementById("custPhone");
		cmobile.value = custList.mobile;
		cmobile.className = "custdetails "+ id1;
		var cupdate = document.getElementById("updateCust");
		cupdate.className = "details1 new-gray-btn1 "+ id1;
		console.log(custId);
	}
	var todo = localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]";
    console.log(todo);
    var todo1 = localStorage.getItem(localStorage.key(i));
    var tk = JSON.parse(todo1);
    if(tk.custID == id1){
	    console.log(tk.note);
	    var uid = localStorage.key(i);
	    if(tk.removed !== "true")
	    {
	    	event(uid,tk.note);
	    	if(tk.checked == true)
	    	{
	    		document.getElementById("s"+tk.id).className = "checked";
	    		document.getElementById("us"+tk.id).checked = true;
	    	}
	    }
    }
	}
	var x=document.getElementsByClassName("Custdetails1");
	x[0].style.display = 'block';
	x[1].style.display = 'block';
	var listItem = document.getElementsByClassName("custList");
	console.log(listItem);
	for (var i = 0; i < listItem.length; i++) {
		listItem[i].classList.remove("active");
	}
	this.parentNode.classList.add("active");
    return false;
}

function updateCust()
{
	var cusid = document.getElementById("custFName").getAttribute('class');
	
	cusid = cusid.split(" ");
	console.log(cusid);
	fname1 = document.getElementById('custFName').value.trim();
	lname1 = document.getElementById('custLName').value.trim();
	email1 = document.getElementById('custEmail').value.trim();
	mobile1 = document.getElementById('custPhone').value.trim();
	if(fname1 == "")
    {
		document.getElementById('custFName').style.backgroundColor = "red";
		document.getElementById('custFName').focus();
		alert("enter something!!!");
		return false;
    }
	else
    {
		if(email1.length!=0 && email1!= ""){
			var a = validateEmail(email1);
		    if (a == false) {
		      console.log(email1);
		      document.getElementById("custEmail").style.backgroundColor = "red";
		      alert("Not a valid e-mail address");
		      document.getElementById('custEmail').focus();
		      document.getElementById('custFName').style.backgroundColor = "";
		      return false;
		}
		}
		if(isNaN(mobile1)){
			document.getElementById("custPhone").style.backgroundColor = "red";
		      alert("Not a valid number");
		      document.getElementById('custPhone').focus();
		      document.getElementById('custPhone').value = "";
		      document.getElementById('custFName').style.backgroundColor = "";
		      document.getElementById('custEmail').style.backgroundColor = "";
		      return false;
		}
		document.getElementById('custFName').style.backgroundColor = "";
		document.getElementById('custEmail').style.backgroundColor = "";
		document.getElementById('custPhone').style.backgroundColor = "";
		document.getElementById(cusid[1]).innerHTML = fname1;
		alert("Details Updated!!!");
		if(cusid[1] == cusid[1])
		{
			pushcust(cusid[1],fname1,lname1,email1,mobile1);
		}
    }
	
}

function removeCust() 
{
    var id = this.getAttribute('id');
    var sid = "s" + id;
    document.getElementById(sid).style.display = 'none';
    return false;
}

function add() 
{
    var task = document.getElementById('task').value.trim();
    var task1 = document.getElementById("task");
    var todos = [];
    var check = "false";
    var delte = "false";
    uid = "id" + Math.random().toString(16).slice(2);
    tdid = "todo" + uid;
    console.log(tdid);
    if(task == "")
    {
      task1.style.backgroundColor = "red";
      document.getElementById('task').value = "";
      task1.focus();
      alert("enter something!!!");
    }
    else
    {
      task1.style.backgroundColor = "";
      var cusid1 = document.getElementById("custFName").getAttribute('class');
      cusid1 = cusid1.split(" ");
      push(cusid1[1],task,tdid,check,delte);
      document.getElementById('task').value = "";
      event(tdid,task);
      console.log(todos);
    }
    return false;
}

function event(id, task)
{
	sid = "s" + id;
	tid = "t" + id;
	ui = "us" + id;
	var node = document.createElement("LI");
	node.class = "";
	node.id = sid;
	var para = document.createElement("span");
	para.className = "update";
	para.id = id;
	var textBox = document.createElement("INPUT");
	textBox.setAttribute("type", "text");
	textBox.className = "text";
	textBox.id = tid;
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.className = 'cb';
	checkbox.id = ui;
	node.appendChild(checkbox);
	var textnode = document.createTextNode(task);
	para.appendChild(textnode);
	var close = document.createElement("BUTTON");
	close.id = id;
	close.className = "remove";
	close.innerText	=	'X';
	para.addEventListener('click',update);
	close.addEventListener('click',remove);
	checkbox.addEventListener('click',completed);
	node.appendChild(para);
	node.appendChild(textBox);
	node.appendChild(close);
	document.getElementById("todo").appendChild(node);
}

var main = (function() 
		{
	var buttons = document.getElementsByClassName('remove');
	for (var i=0; i < buttons.length; i++) 
	{
		buttons[i].addEventListener('click', remove);
	}
})();

var clear=(function()
{
	localStorage.clear();
})();

function remove() 
{
    var id = this.getAttribute('id');
    qid = "us" + id;
    var sid = "s" + id;
    var txt = document.getElementById(id).innerText;
    var del = "true";
    var x = document.getElementById(qid).checked;
    console.log(id);
    
    document.getElementById(sid).style.display = 'none';
    var cusid1 = document.getElementById("custFName").getAttribute('class');
    cusid1 = cusid1.split(" ");
    push(cusid1[1],txt,id,x,del);
    return false;
}

function update() {
	var id = this.getAttribute('id');
	var tid = "t" + id;
	var ui = "u" +id;
	var sid = "s" + id;
	var txt;
	var txte;
	var todos = [];
	console.log(id);
	if(document.getElementById(sid).className == "checked")
	{
		document.getElementById(sid).className = "nonchecked";
	}
	var txt = document.getElementById(id).innerText;
	console.log(txt);
	document.getElementById(id).className = "text";
	document.getElementById(tid).className = "show";
	document.getElementById(tid).value = txt;
	document.getElementById(tid).focus();
	document.getElementById(tid).onkeydown= function(event) 
	{
	    if (event.keyCode == 13) 
	    {
	        updated();
	    }
	}
	document.getElementById(tid).onblur=function(event)
	{
		updated();
	}
	var ck = "false";
	var rm = "";
	var todo1 = localStorage.getItem(localStorage.key(id));
	var td = JSON.parse(todo1);
	console.log(td);

	function updated()
	{
		var x = document.getElementById(id).parentNode.id;
	    console.log(x);
	    var t = document.getElementById(tid).value;
	    var upda = document.getElementById(tid).value;
	    console.log(upda);
	    if (upda == null || upda == "") 
	    {
	        txte = txt;
	    } 
	    else 
	    {
	        txte = upda;
	        console.log(txt);
	    }
	    var cusid1 = document.getElementById("custFName").getAttribute('class');
	      cusid1 = cusid1.split(" ");
	        push(cusid1[1],txte,id,ck,rm);
	        document.getElementById(id).textContent=txte;
	        if(document.getElementById(sid).className == "nonchecked")
	    	{
	        	document.getElementById(sid).className = "checked";
	    	}
	        document.getElementById("t"+id).className = "text";
	        document.getElementById(id).className = "show1";
	}
	return false;
}

var json = "";

function push(custid,text,id,check,delte)
{
	
	var person = {};
	person.custID=custid;
	person.note = text;
	person.id = id;
	person.checked = check;
  	person.removed = delte;
  	todos.push(person);
 	localStorage.setItem(id, JSON.stringify(person));
  	console.log(JSON.stringify(todos));

}

var completed= function(ev){
	var x = document.getElementsByClassName( 'update' );
	console.log(this);
	ev.target.parentNode.classList.toggle('checked');
	var x = ev.target.parentNode;
	console.log(x);
	console.log(x.id);
	var z  = x.id;

	var y = x.getElementsByClassName('update');
	var qid = y[0].id;
	console.log(y);
	console.log(qid);
	var qwe = "us" + qid;
	var t = document.getElementById(qid).innerText;
	console.log(t);
	var x = document.getElementById(qwe).checked;
	console.log(x);
    del = "false";
    var cusid1 = document.getElementById("custFName").getAttribute('class');
      cusid1 = cusid1.split(" ");
    push(cusid1[1],t,qid,x,del);
}

function setdata() 
{
	console.log("local storage");
	var arr= [];
	for (i = 0; i < localStorage.length; i++)   
	{
		var todo = localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]";
	    console.log(todo);
	    var todo1 = localStorage.getItem(localStorage.key(i));
	    var tk = JSON.parse(todo1);
	    var uid = localStorage.key(i);
	    var myData = JSON.stringify(tk);
	    arr.push(myData);
	}
	var data = JSON.stringify(arr);   
}
function displayblock()
{
	document.getElementById('customerPopup').style.display='block';
	document.getElementById('pageBlockNewCustomer').style.display='block';
	document.getElementById('customerNewName').focus();
}
function closepop()
{
	document.getElementById('customerPopup').style.display='none';
	document.getElementById('pageBlockNewCustomer').style.display='none';
}