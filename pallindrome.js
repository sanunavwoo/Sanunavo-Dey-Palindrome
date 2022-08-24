var date= document.querySelector("#date-picker");
var checkBtn= document.querySelector("#check-btn");
var result= document.querySelector(".result-div-isPalindrome");
var nextResult= document.querySelector(".result-div-next");
var previousResult= document.querySelector(".result-div-previous");

checkBtn.addEventListener("click", ()=>
{
    dateVal= date.value;
    console.log(dateVal);
    var dateStr= dateVal.replaceAll("-", "");
    console.log(dateStr);
    
    var allDatesformats= dateAllFormat(dateStr);
   
    //console.log(isPalindrome("2002"));
    var palindromeResultArr=[];
    for(var currentDateFormat=0; currentDateFormat<allDatesformats.length; currentDateFormat++)
    {
        //console.log(allDatesformats[currentDateFormat]);
        //console.log(isPalindrome(allDatesformats[currentDateFormat].toString()));
         palindromeResultArr.push(isPalindrome(allDatesformats[currentDateFormat].toString()));
        
    }
    //console.log(palindromeResultArr);
    
    showResult(palindromeResultArr);

    
    //--------find next date is pallindrone or not---------------
    
    var nextPalindromeDay= findNextDatePalindrome(dateStr)[1].slice(-2);
    var nextPalindromeMonth= findNextDatePalindrome(dateStr)[1].slice(4,6);
    var nextPalindromeYear= findNextDatePalindrome(dateStr)[1].slice(0,4);
    
    console.log("Next Palindrome date is: "+findNextDatePalindrome(dateStr)[0] + " days away, on : "+ nextPalindromeDay+"-"+nextPalindromeMonth+"-"+nextPalindromeYear+"(ddmmyyyy)");
    nextResult.innerHTML= "Next Palindrome date is: "+findNextDatePalindrome(dateStr)[0] + " days away, on : "+ nextPalindromeDay+"-"+nextPalindromeMonth+"-"+nextPalindromeYear+"(ddmmyyyy)";
    findPreviousDatePalindrome(dateStr)
    var previousPalindromeDay= findPreviousDatePalindrome(dateStr)[1].slice(-2);
    var previousPalindromeMonth= findPreviousDatePalindrome(dateStr)[1].slice(4,6);
    var previousPalindromeYear= findPreviousDatePalindrome(dateStr)[1].slice(0,4);

    console.log("Previous Palindrome date is: "+findPreviousDatePalindrome(dateStr)[0] + " days earlier, on : "+ previousPalindromeDay+"-"+previousPalindromeMonth+"-"+previousPalindromeYear+"(ddmmyyyy)");
    previousResult.innerHTML= "Previous Palindrome date was: "+findPreviousDatePalindrome(dateStr)[0] + " days earlier, on : "+ previousPalindromeDay+"-"+previousPalindromeMonth+"-"+previousPalindromeYear+"(ddmmyyyy)";
});

function dateAllFormat(dateStr){
    var dateObj=
    {
        "day" : dateStr.slice(-2),
        "month": dateStr.slice(4,6),
        "year": dateStr.slice(0,4)
    }
    //console.log(dateObj);

    var ddmmyyyy= dateObj.day + dateObj.month + dateObj.year;
    var mmddyyyy= dateObj.month + dateObj.day + dateObj.year;
    var yyyymmdd= dateObj.year + dateObj.month + dateObj.day;
    var ddmmyy= dateObj.day + dateObj.month + dateObj.year.slice(-2);
    var mmddyy= dateObj.month + dateObj.day + dateObj.year.slice(-2);
    var yymmdd= dateObj.year.slice(-2) + dateObj.month + dateObj.day; 

    var allDateFormatArr= [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
    return allDateFormatArr;
}

function isPalindrome(dt){
    var reversedDate= "";
    for(var i= (dt.length - 1) ; i>=0; i--)
    {
        reversedDate+= dt[i];
    }
    
    var palindromeFlag= false;
    if(reversedDate===dt)
    {
        palindromeFlag= true;
    }
    return palindromeFlag;
}

function showResult(palindromeResultArray)
{
    if(palindromeResultArray.includes(true)){
        console.log("Your birthday is a Palindrome");
        result.innerHTML= "Your birthday is a Palindrome 🤩";
        //Display in HTML
    }
    else{
        console.log("Sorry, better luck next birth ");
        result.innerHTML="Sorry, better luck next birth 😔";
        //Display in HTML
    }
}

function findNextDay(dateStr)
{
    var oldDateObj=
    {
        "day" : dateStr.slice(-2),
        "month": dateStr.slice(4,6),
        "year": dateStr.slice(0,4)
    }
    var nextDay= parseInt(oldDateObj.day) +1;
    var nextMonth= parseInt(oldDateObj.month);
    var nextYear= parseInt(oldDateObj.year);

 
    
    var daysInMonth= [31,28,31,30,31,30,31,31,30,31,30,31];

    if(nextMonth===02)
    {
        //Find if it is leap year or not
        
        if(isLeapYear(nextYear))
        {
            if(nextDay>29)
            {
                nextDay=01;
                nextMonth+=1;
            }
        }
        else
        {
            if(nextDay>28)
            {
                nextDay=01;
                nextMonth+=1;
            }
        }
    }
    else
    {
        if(nextDay> daysInMonth[nextMonth -1])
        {
            nextDay= 01;
            nextMonth+=1;
        }    
    }
    if(nextMonth>12)
    {
        nextMonth= 01;
        nextYear++;
    }
    // console.log(nextDay);
    // console.log(nextMonth);
    // console.log(nextYear);
    if(nextDay<10)
    {
        nextDay= "0"+ nextDay.toString();
    }
    if(nextMonth<10)
    {
        nextMonth= "0"+ nextMonth.toString();
    }
    var nextDateStr= nextYear.toString()+ nextMonth.toString() + nextDay.toString() ;
    //console.log(nextDateStr);
    return nextDateStr;
  
}

function isLeapYear(yr)
{
    if(yr%400===0){
        return true;
    }
    if(yr%100===0){
        return false;
    }
    if(yr%4===0){
        return true;
    }
    else{
        return false;
    }
}

function findNextDatePalindrome(dateStr)
{
    var nextDateReturnedStr= findNextDay(dateStr);
    //get all date formats
    
    
    var counter=0;
    var nextPalindromeResultsArr=[];
    while(1)
    {
        var allNextDateFormats= dateAllFormat(nextDateReturnedStr);
       // console.log("All next date array: "+allNextDateFormats);
        counter+=1;
        for(var i=0; i<allNextDateFormats.length; i++)
        {
            nextPalindromeResultsArr.push(isPalindrome(allNextDateFormats[i].toString()));
        }
        if(nextPalindromeResultsArr.includes(true))
        {
            break;
        }
        else
        {
            nextDateReturnedStr= findNextDay(nextDateReturnedStr);
        }
    }
    return [counter, nextDateReturnedStr]; 
}

function findPreviousDay(dateStr)
{
    var oldDateObj=
    {
        "day" : dateStr.slice(-2),
        "month": dateStr.slice(4,6),
        "year": dateStr.slice(0,4)
    }
    var previousDay= parseInt(oldDateObj.day) -1;
    var previousMonth= parseInt(oldDateObj.month);
    var previousYear= parseInt(oldDateObj.year);

 
    
    var daysInMonth= [31,28,31,30,31,30,31,31,30,31,30,31];

    if(previousMonth===03)
    {
        //Find if it is leap year or not
        
        if(isLeapYear(previousYear))
        {
            if(previousDay<01)
            {
                previousDay=29;
                previousMonth-=1;
            }
        }
        else
        {
            if(previousDay<01)
            {
                previousDay=28;
                previousMonth-=1;
            }
        }
    }
    else
    {
        if(previousDay<01)
        {
            previousDay= daysInMonth[previousMonth-2];
            previousMonth-=1;
        }    
    }
    if(previousMonth<01)
    {
        previousDay= 31;
        previousMonth= 12;
        previousYear--;
    }
    // console.log(nextDay);
    // console.log(nextMonth);
    // console.log(nextYear);
    if(previousDay<10)
    {
        previousDay= "0"+ previousDay.toString();
    }
    if(previousMonth<10)
    {
        previousMonth= "0"+ previousMonth.toString();
    }
    var previousDateStr= previousYear.toString()+ previousMonth.toString() + previousDay.toString();
    //console.log("Previous Date:"+previousDateStr);
    return previousDateStr;
  
}

function findPreviousDatePalindrome(dateStr)
{
    var previousDateReturnedStr= findPreviousDay(dateStr);
    //get all date formats
    
    
    var counter=0;
    var previousPalindromeResultsArr=[];
    while(1)
    {
        var allPreviousDateFormats= dateAllFormat(previousDateReturnedStr);
       // console.log("All next date array: "+allNextDateFormats);
        counter+=1;
        for(var i=0; i<allPreviousDateFormats.length; i++)
        {
            previousPalindromeResultsArr.push(isPalindrome(allPreviousDateFormats[i].toString()));
        }
        if(previousPalindromeResultsArr.includes(true))
        {
            break;
        }
        else
        {
            previousDateReturnedStr= findPreviousDay(previousDateReturnedStr);
        }
    }
    return [counter, previousDateReturnedStr]; 
}
