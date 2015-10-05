(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','moment'],factory);}else if(typeof exports==='object'){factory(require('jquery'),require('moment'));}else{factory(jQuery,moment);}}(function($,moment){var clndrTemplate="<div class='clndr-controls'>"+"<div class='clndr-control-button'><span class='clndr-previous-button'>previous</span></div><div class='month'><%= month %> <%= year %></div><div class='clndr-control-button rightalign'><span class='clndr-next-button'>next</span></div>"+"</div>"+"<table class='clndr-table' border='0' cellspacing='0' cellpadding='0'>"+"<thead>"+"<tr class='header-days'>"+"<% for(var i = 0; i < daysOfTheWeek.length; i++) { %>"+"<td class='header-day'><%= daysOfTheWeek[i] %></td>"+"<% } %>"+"</tr>"+"</thead>"+"<tbody>"+"<% for(var i = 0; i < numberOfRows; i++){ %>"+"<tr>"+"<% for(var j = 0; j < 7; j++){ %>"+"<% var d = j + i * 7; %>"+"<td class='<%= days[d].classes %>'><div class='day-contents'><%= days[d].day %>"+"</div></td>"+"<% } %>"+"</tr>"+"<% } %>"+"</tbody>"+"</table>";var pluginName='clndr';var defaults={template:clndrTemplate,weekOffset:0,startWithMonth:null,clickEvents:{click:null,nextMonth:null,previousMonth:null,nextYear:null,previousYear:null,today:null,onMonthChange:null,onYearChange:null},targets:{nextButton:'clndr-next-button',previousButton:'clndr-previous-button',nextYearButton:'clndr-next-year-button',previousYearButton:'clndr-previous-year-button',todayButton:'clndr-today-button',day:'day',empty:'empty'},classes:{today:"today",event:"event",past:"past",lastMonth:"last-month",nextMonth:"next-month",adjacentMonth:"adjacent-month",inactive:"inactive",selected:"selected"},events:[],extras:null,dateParameter:'date',multiDayEvents:null,doneRendering:null,render:null,daysOfTheWeek:null,showAdjacentMonths:true,adjacentDaysChangeMonth:false,ready:null,constraints:null,forceSixRows:null,trackSelectedDate:false,selectedDate:null,lengthOfTime:{months:null,days:null,interval:1}};function Clndr(element,options){this.element=element;this.options=$.extend(true,{},defaults,options);if(this.options.events.length){if(this.options.multiDayEvents){this.options.events=this.addMultiDayMomentObjectsToEvents(this.options.events);}else{this.options.events=this.addMomentObjectToEvents(this.options.events);}}
if(this.options.lengthOfTime.months||this.options.lengthOfTime.days){if(this.options.lengthOfTime.months){this.options.lengthOfTime.days=null;if(this.options.lengthOfTime.startDate){this.intervalStart=moment(this.options.lengthOfTime.startDate).startOf('month');}else if(this.options.startWithMonth){this.intervalStart=moment(this.options.startWithMonth).startOf('month');}else{this.intervalStart=moment().startOf('month');}
this.intervalEnd=moment(this.intervalStart).add(this.options.lengthOfTime.months,'months').subtract(1,'days');this.month=this.intervalStart.clone();}else if(this.options.lengthOfTime.days){if(this.options.lengthOfTime.startDate){this.intervalStart=moment(this.options.lengthOfTime.startDate).startOf('day');}else{this.intervalStart=moment().weekday(0).startOf('day');}
this.intervalEnd=moment(this.intervalStart).add(this.options.lengthOfTime.days- 1,'days').endOf('day');this.month=this.intervalStart.clone();}}else{this.month=moment().startOf('month');this.intervalStart=moment(this.month);this.intervalEnd=moment(this.month).endOf('month');}
if(this.options.startWithMonth){this.month=moment(this.options.startWithMonth).startOf('month');this.intervalStart=moment(this.month);this.intervalEnd=moment(this.month).endOf('month');}
if(this.options.constraints){if(this.options.constraints.startDate){var startMoment=moment(this.options.constraints.startDate);if(this.intervalStart.isBefore(startMoment,'month')){this.intervalStart.set('month',startMoment.month()).set('year',startMoment.year());this.month.set('month',startMoment.month()).set('year',startMoment.year());}}
if(this.options.constraints.endDate){var endMoment=moment(this.options.constraints.endDate);if(this.intervalEnd.isAfter(endMoment,'month')){this.intervalEnd.set('month',endMoment.month()).set('year',endMoment.year());this.month.set('month',endMoment.month()).set('year',endMoment.year());}}}
this._defaults=defaults;this._name=pluginName;this.init();}
Clndr.prototype.init=function(){this.daysOfTheWeek=this.options.daysOfTheWeek||[];if(!this.options.daysOfTheWeek){this.daysOfTheWeek=[];for(var i=0;i<7;i++){this.daysOfTheWeek.push(moment().weekday(i).format('dd').charAt(0));}}
if(this.options.weekOffset){this.daysOfTheWeek=this.shiftWeekdayLabels(this.options.weekOffset);}
if(!$.isFunction(this.options.render)){this.options.render=null;if(typeof _==='undefined'){throw new Error("Underscore was not found. Please include underscore.js OR provide a custom render function.");}
else{this.compiledClndrTemplate=_.template(this.options.template);}}
$(this.element).html("<div class='clndr'></div>");this.calendarContainer=$('.clndr',this.element);this.bindEvents();this.render();if(this.options.ready){this.options.ready.apply(this,[]);}};Clndr.prototype.shiftWeekdayLabels=function(offset){var days=this.daysOfTheWeek;for(var i=0;i<offset;i++){days.push(days.shift());}
return days;};Clndr.prototype.createDaysObject=function(startDate,endDate){var daysArray=[];var date=startDate.clone();var lengthOfInterval=endDate.diff(startDate,'days');this._currentIntervalStart=startDate.clone();this.eventsLastMonth=[];this.eventsThisInterval=[];this.eventsNextMonth=[];if(this.options.events.length){this.eventsThisInterval=$(this.options.events).filter(function(){if(this._clndrEndDateObject.isBefore(startDate)||this._clndrStartDateObject.isAfter(endDate)){return false;}else{return true;}}).toArray();if(this.options.showAdjacentMonths){var startOfLastMonth=startDate.clone().subtract(1,'months').startOf('month');var endOfLastMonth=startOfLastMonth.clone().endOf('month');var startOfNextMonth=endDate.clone().add(1,'months').startOf('month');var endOfNextMonth=startOfNextMonth.clone().endOf('month');this.eventsLastMonth=$(this.options.events).filter(function(){if(this._clndrEndDateObject.isBefore(startOfLastMonth)||this._clndrStartDateObject.isAfter(endOfLastMonth)){return false;}else{return true;}}).toArray();this.eventsNextMonth=$(this.options.events).filter(function(){if(this._clndrEndDateObject.isBefore(startOfNextMonth)||this._clndrStartDateObject.isAfter(endOfNextMonth)){return false;}else{return true;}}).toArray();}}
if(!this.options.lengthOfTime.days){var diff=date.weekday()- this.options.weekOffset;if(diff<0)diff+=7;if(this.options.showAdjacentMonths){for(var i=0;i<diff;i++){var day=moment([startDate.year(),startDate.month(),i- diff+ 1]);daysArray.push(this.createDayObject(day,this.eventsLastMonth));}}else{for(var i=0;i<diff;i++){daysArray.push(this.calendarDay({classes:this.options.targets.empty+" "+ this.options.classes.lastMonth}));}}}
var dateIterator=startDate.clone();while(dateIterator.isBefore(endDate)||dateIterator.isSame(endDate,'day')){daysArray.push(this.createDayObject(dateIterator.clone(),this.eventsThisInterval));dateIterator.add(1,'days');}
if(!this.options.lengthOfTime.days){while(daysArray.length%7!==0){if(this.options.showAdjacentMonths){daysArray.push(this.createDayObject(dateIterator.clone(),this.eventsNextMonth));}else{daysArray.push(this.calendarDay({classes:this.options.targets.empty+" "+ this.options.classes.nextMonth}));}
dateIterator.add(1,'days');}}
if(this.options.forceSixRows&&daysArray.length!==42){while(daysArray.length<42){if(this.options.showAdjacentMonths){daysArray.push(this.createDayObject(dateIterator.clone(),this.eventsNextMonth));dateIterator.add(1,'days');}else{daysArray.push(this.calendarDay({classes:this.options.targets.empty+" "+ this.options.classes.nextMonth}));}}}
return daysArray;};Clndr.prototype.createDayObject=function(day,monthEvents){var eventsToday=[];var now=moment();var self=this;if(!day.isValid()&&day.hasOwnProperty('_d')&&day._d!=undefined){day=moment(day._d);}
var j=0,l=monthEvents.length;for(j;j<l;j++){var start=monthEvents[j]._clndrStartDateObject;var end=monthEvents[j]._clndrEndDateObject;if((day.isSame(start,'day')||day.isAfter(start,'day'))&&(day.isSame(end,'day')||day.isBefore(end,'day'))){eventsToday.push(monthEvents[j]);}}
var properties={isInactive:false,isAdjacentMonth:false,isToday:false,};var extraClasses="";if(now.format("YYYY-MM-DD")==day.format("YYYY-MM-DD")){extraClasses+=(" "+ this.options.classes.today);properties.isToday=true;}
if(day.isBefore(now,'day')){extraClasses+=(" "+ this.options.classes.past);}
if(eventsToday.length){extraClasses+=(" "+ this.options.classes.event);}
if(!this.options.lengthOfTime.days){if(this._currentIntervalStart.month()>day.month()){extraClasses+=(" "+ this.options.classes.adjacentMonth);properties.isAdjacentMonth=true;this._currentIntervalStart.year()===day.year()?extraClasses+=(" "+ this.options.classes.lastMonth):extraClasses+=(" "+ this.options.classes.nextMonth);}else if(this._currentIntervalStart.month()<day.month()){extraClasses+=(" "+ this.options.classes.adjacentMonth);properties.isAdjacentMonth=true;this._currentIntervalStart.year()===day.year()?extraClasses+=(" "+ this.options.classes.nextMonth):extraClasses+=(" "+ this.options.classes.lastMonth);}}
if(this.options.constraints){if(this.options.constraints.startDate&&day.isBefore(moment(this.options.constraints.startDate))){extraClasses+=(" "+ this.options.classes.inactive);properties.isInactive=true;}
if(this.options.constraints.endDate&&day.isAfter(moment(this.options.constraints.endDate))){extraClasses+=(" "+ this.options.classes.inactive);properties.isInactive=true;}}
if(!day.isValid()&&day.hasOwnProperty('_d')&&day._d!=undefined){day=moment(day._d);}
if(this.options.selectedDate&&day.isSame(moment(this.options.selectedDate),'day')){extraClasses+=(" "+ this.options.classes.selected);}
extraClasses+=" calendar-day-"+ day.format("YYYY-MM-DD");extraClasses+=" calendar-dow-"+ day.weekday();return this.calendarDay({day:day.date(),classes:this.options.targets.day+ extraClasses,events:eventsToday,date:day,properties:properties});};Clndr.prototype.render=function(){this.calendarContainer.children().remove();var data={};if(this.options.lengthOfTime.days){var days=this.createDaysObject(this.intervalStart.clone(),this.intervalEnd.clone());data={daysOfTheWeek:this.daysOfTheWeek,numberOfRows:Math.ceil(days.length/7),months:[],days:days,month:null,year:null,intervalStart:this.intervalStart.clone(),intervalEnd:this.intervalEnd.clone(),eventsThisInterval:this.eventsThisInterval,eventsLastMonth:[],eventsNextMonth:[],extras:this.options.extras};}else if(this.options.lengthOfTime.months){var months=[];var eventsThisInterval=[];for(i=0;i<this.options.lengthOfTime.months;i++){var currentIntervalStart=this.intervalStart.clone().add(i,'months');var currentIntervalEnd=currentIntervalStart.clone().endOf('month');var days=this.createDaysObject(currentIntervalStart,currentIntervalEnd);eventsThisInterval.push(this.eventsThisInterval);months.push({month:currentIntervalStart,days:days});}
data={daysOfTheWeek:this.daysOfTheWeek,numberOfRows:_.reduce(months,function(memo,monthObj){return memo+ Math.ceil(monthObj.days.length/7);},0),months:months,days:[],month:null,year:null,intervalStart:this.intervalStart,intervalEnd:this.intervalEnd,eventsThisInterval:eventsThisInterval,eventsLastMonth:this.eventsLastMonth,eventsNextMonth:this.eventsNextMonth,extras:this.options.extras};}else{var days=this.createDaysObject(this.month.clone().startOf('month'),this.month.clone().endOf('month'));var currentMonth=this.month;var data={daysOfTheWeek:this.daysOfTheWeek,numberOfRows:Math.ceil(days.length/7),months:[],days:days,month:this.month.format('MMMM'),year:this.month.year(),eventsThisMonth:this.eventsThisInterval,eventsLastMonth:this.eventsLastMonth,eventsNextMonth:this.eventsNextMonth,extras:this.options.extras};}
if(!this.options.render){this.calendarContainer.html(this.compiledClndrTemplate(data));}else{this.calendarContainer.html(this.options.render.apply(this,[data]));}
if(this.options.constraints){for(var target in this.options.targets){if(target!=this.options.targets.day){this.element.find('.'+ this.options.targets[target]).toggleClass(this.options.classes.inactive,false);}}
var start=null;var end=null;if(this.options.constraints.startDate){start=moment(this.options.constraints.startDate);}
if(this.options.constraints.endDate){end=moment(this.options.constraints.endDate);}
if(start&&(start.isAfter(this.intervalStart)||start.isSame(this.intervalStart,'day'))){this.element.find('.'+ this.options.targets.previousButton).toggleClass(this.options.classes.inactive,true);}
if(end&&(end.isBefore(this.intervalEnd)||end.isSame(this.intervalEnd,'day'))){this.element.find('.'+ this.options.targets.nextButton).toggleClass(this.options.classes.inactive,true);}
if(start&&start.isAfter(this.intervalStart.clone().subtract(1,'years'))){this.element.find('.'+ this.options.targets.previousYearButton).toggleClass(this.options.classes.inactive,true);}
if(end&&end.isBefore(this.intervalEnd.clone().add(1,'years'))){this.element.find('.'+ this.options.targets.nextYearButton).toggleClass(this.options.classes.inactive,true);}
if((start&&start.isAfter(moment(),'month'))||(end&&end.isBefore(moment(),'month'))){this.element.find('.'+ this.options.targets.today).toggleClass(this.options.classes.inactive,true);}}
if(this.options.doneRendering){this.options.doneRendering.apply(this,[]);}};Clndr.prototype.bindEvents=function(){var $container=$(this.element);var self=this;var eventType='click';if(self.options.useTouchEvents===true){eventType='touchstart';}
$container.on(eventType+'.clndr','.'+this.options.targets.day,function(event){if(self.options.clickEvents.click){var target=self.buildTargetObject(event.currentTarget,true);self.options.clickEvents.click.apply(self,[target]);}
if(self.options.adjacentDaysChangeMonth){if($(event.currentTarget).is('.'+ self.options.classes.lastMonth)){self.backActionWithContext(self);}else if($(event.currentTarget).is('.'+ self.options.classes.nextMonth)){self.forwardActionWithContext(self);}}
if(self.options.trackSelectedDate){self.options.selectedDate=self.getTargetDateString(event.currentTarget);$(event.currentTarget).siblings().removeClass(self.options.classes.selected).end().addClass(self.options.classes.selected);}});$container.on(eventType+'.clndr','.'+this.options.targets.empty,function(event){if(self.options.clickEvents.click){var target=self.buildTargetObject(event.currentTarget,false);self.options.clickEvents.click.apply(self,[target]);}
if(self.options.adjacentDaysChangeMonth){if($(event.currentTarget).is('.'+ self.options.classes.lastMonth)){self.backActionWithContext(self);}else if($(event.currentTarget).is('.'+ self.options.classes.nextMonth)){self.forwardActionWithContext(self);}}});$container.on(eventType+'.clndr','.'+this.options.targets.previousButton,{context:this},this.backAction).on(eventType+'.clndr','.'+this.options.targets.nextButton,{context:this},this.forwardAction).on(eventType+'.clndr','.'+this.options.targets.todayButton,{context:this},this.todayAction).on(eventType+'.clndr','.'+this.options.targets.nextYearButton,{context:this},this.nextYearAction).on(eventType+'.clndr','.'+this.options.targets.previousYearButton,{context:this},this.previousYearAction);}
Clndr.prototype.buildTargetObject=function(currentTarget,targetWasDay){var target={element:currentTarget,events:[],date:null};if(targetWasDay){var dateString=this.getTargetDateString(currentTarget);target.date=(dateString)?moment(dateString):null;if(this.options.events){if(this.options.multiDayEvents){target.events=$.makeArray($(this.options.events).filter(function(){return((target.date.isSame(this._clndrStartDateObject,'day')||target.date.isAfter(this._clndrStartDateObject,'day'))&&(target.date.isSame(this._clndrEndDateObject,'day')||target.date.isBefore(this._clndrEndDateObject,'day')));}));}else{target.events=$.makeArray($(this.options.events).filter(function(){return this._clndrStartDateObject.format('YYYY-MM-DD')==dateString;}));}}}
return target;}
Clndr.prototype.getTargetDateString=function(target){var classNameIndex=target.className.indexOf('calendar-day-');if(classNameIndex!==-1){return target.className.substring(classNameIndex+ 13,classNameIndex+ 23);}
return null;}
Clndr.prototype.forwardAction=function(event){var self=event.data.context;self.forwardActionWithContext(self);};Clndr.prototype.backAction=function(event){var self=event.data.context;self.backActionWithContext(self);};Clndr.prototype.backActionWithContext=function(self){if(self.element.find('.'+ self.options.targets.previousButton).hasClass('inactive')){return;}
var yearChanged=null;if(!self.options.lengthOfTime.days){self.intervalStart.subtract(self.options.lengthOfTime.interval,'months').startOf('month');self.intervalEnd=self.intervalStart.clone().add(self.options.lengthOfTime.months||self.options.lengthOfTime.interval,'months').subtract(1,'days').endOf('month');if(!self.options.lengthOfTime.months){yearChanged=!self.month.isSame(moment(self.month).subtract(1,'months'),'year');}
self.month=self.intervalStart.clone();}else{self.intervalStart.subtract(self.options.lengthOfTime.interval,'days').startOf('day');self.intervalEnd=self.intervalStart.clone().add(self.options.lengthOfTime.days- 1,'days').endOf('day');self.month=self.intervalStart.clone();}
self.render();if(!self.options.lengthOfTime.days&&!self.options.lengthOfTime.months){if(self.options.clickEvents.previousMonth){self.options.clickEvents.previousMonth.apply(self,[moment(self.month)]);}
if(self.options.clickEvents.onMonthChange){self.options.clickEvents.onMonthChange.apply(self,[moment(self.month)]);}
if(yearChanged){if(self.options.clickEvents.onYearChange){self.options.clickEvents.onYearChange.apply(self,[moment(self.month)]);}}}else{if(self.options.clickEvents.previousInterval){self.options.clickEvents.previousInterval.apply(self,[moment(self.intervalStart),moment(self.intervalEnd)]);}
if(self.options.clickEvents.onIntervalChange){self.options.clickEvents.onIntervalChange.apply(self,[moment(self.intervalStart),moment(self.intervalEnd)]);}}};Clndr.prototype.forwardActionWithContext=function(self){if(self.element.find('.'+ self.options.targets.nextButton).hasClass('inactive')){return;}
var yearChanged=null;if(!self.options.lengthOfTime.days){self.intervalStart.add(self.options.lengthOfTime.interval,'months').startOf('month');self.intervalEnd=self.intervalStart.clone().add(self.options.lengthOfTime.months||self.options.lengthOfTime.interval,'months').subtract(1,'days').endOf('month');if(!self.options.lengthOfTime.months){yearChanged=!self.month.isSame(moment(self.month).add(1,'months'),'year');}
self.month=self.intervalStart.clone();}else{self.intervalStart.add(self.options.lengthOfTime.interval,'days').startOf('day');self.intervalEnd=self.intervalStart.clone().add(self.options.lengthOfTime.days- 1,'days').endOf('day');self.month=self.intervalStart.clone();}
self.render();if(!self.options.lengthOfTime.days&&!self.options.lengthOfTime.months){if(self.options.clickEvents.previousMonth){self.options.clickEvents.previousMonth.apply(self,[moment(self.month)]);}
if(self.options.clickEvents.onMonthChange){self.options.clickEvents.onMonthChange.apply(self,[moment(self.month)]);}
if(yearChanged){if(self.options.clickEvents.onYearChange){self.options.clickEvents.onYearChange.apply(self,[moment(self.month)]);}}}else{if(self.options.clickEvents.nextInterval){self.options.clickEvents.nextInterval.apply(self,[moment(self.intervalStart),moment(self.intervalEnd)]);}
if(self.options.clickEvents.onIntervalChange){self.options.clickEvents.onIntervalChange.apply(self,[moment(self.intervalStart),moment(self.intervalEnd)]);}}};Clndr.prototype.todayAction=function(event){var self=event.data.context;var monthChanged=!self.month.isSame(moment(),'month');var yearChanged=!self.month.isSame(moment(),'year');self.month=moment().startOf('month');if(self.options.lengthOfTime.days){if(self.options.lengthOfTime.startDate){self.intervalStart=moment().weekday(self.options.lengthOfTime.startDate.weekday()).startOf('day');}else{self.intervalStart=moment().weekday(0).startOf('day');}
self.intervalEnd=self.intervalStart.clone().add(self.options.lengthOfTime.days- 1,'days').endOf('day');}else if(self.options.lengthOfTime.months){self.intervalStart=moment().startOf('month');self.intervalEnd=self.intervalStart.clone().add(self.options.lengthOfTime.months||self.options.lengthOfTime.interval,'months').subtract(1,'days').endOf('month');}else if(monthChanged){self.render();if(self.options.clickEvents.today){self.options.clickEvents.today.apply(self,[moment(self.month)]);}
if(self.options.clickEvents.onMonthChange){self.options.clickEvents.onMonthChange.apply(self,[moment(self.month)]);}
if(yearChanged){if(self.options.clickEvents.onYearChange){self.options.clickEvents.onYearChange.apply(self,[moment(self.month)]);}}}
if(self.options.lengthOfTime.days||self.options.lengthOfTime.months){self.render();if(self.options.clickEvents.today){self.options.clickEvents.today.apply(self,[moment(self.month)]);}
if(self.options.clickEvents.onIntervalChange){self.options.clickEvents.onIntervalChange.apply(self,[moment(self.intervalStart),moment(self.intervalEnd)]);}}};Clndr.prototype.nextYearAction=function(event){var self=event.data.context;if(self.element.find('.'+ self.options.targets.nextYearButton).hasClass('inactive')){return;}
self.month.add(1,'years');self.intervalStart.add(1,'years');self.intervalEnd.add(1,'years');self.render();if(self.options.clickEvents.nextYear){self.options.clickEvents.nextYear.apply(self,[moment(self.month)]);}
if(self.options.lengthOfTime.days||self.options.lengthOfTime.months){if(self.options.clickEvents.onIntervalChange){self.options.clickEvents.onIntervalChange.apply(self,[moment(self.intervalStart),moment(self.intervalEnd)]);}}else{if(self.options.clickEvents.onMonthChange){self.options.clickEvents.onMonthChange.apply(self,[moment(self.month)]);}
if(self.options.clickEvents.onYearChange){self.options.clickEvents.onYearChange.apply(self,[moment(self.month)]);}}};Clndr.prototype.previousYearAction=function(event){var self=event.data.context;console.log(self.element.find('.'+ self.options.targets.previousYear));if(self.element.find('.'+ self.options.targets.previousYearButton).hasClass('inactive')){return;}
self.month.subtract(1,'years');self.intervalStart.subtract(1,'years');self.intervalEnd.subtract(1,'years');self.render();if(self.options.clickEvents.previousYear){self.options.clickEvents.previousYear.apply(self,[moment(self.month)]);}
if(self.options.lengthOfTime.days||self.options.lengthOfTime.months){if(self.options.clickEvents.onIntervalChange){self.options.clickEvents.onIntervalChange.apply(self,[moment(self.intervalStart),moment(self.intervalEnd)]);}}else{if(self.options.clickEvents.onMonthChange){self.options.clickEvents.onMonthChange.apply(self,[moment(self.month)]);}
if(self.options.clickEvents.onYearChange){self.options.clickEvents.onYearChange.apply(self,[moment(self.month)]);}}};Clndr.prototype.forward=function(options){if(!this.options.lengthOfTime.days){this.intervalStart.add(this.options.lengthOfTime.interval,'months').startOf('month');this.intervalEnd=this.intervalStart.clone().add(this.options.lengthOfTime.months||this.options.lengthOfTime.interval,'months').subtract(1,'days').endOf('month');this.month=this.intervalStart.clone();}else{this.intervalStart.add(this.options.lengthOfTime.interval,'days').startOf('day');this.intervalEnd=this.intervalStart.clone().add(this.options.lengthOfTime.days- 1,'days').endOf('day');this.month=this.intervalStart.clone();}
this.render();if(options&&options.withCallbacks){if(this.options.lengthOfTime.days||this.options.lengthOfTime.months){if(this.options.clickEvents.onIntervalChange){this.options.clickEvents.onIntervalChange.apply(this,[moment(this.intervalStart),moment(this.intervalEnd)]);}}else{if(this.options.clickEvents.onMonthChange){this.options.clickEvents.onMonthChange.apply(this,[moment(this.month)]);}
if(this.month.month()===0&&this.options.clickEvents.onYearChange){this.options.clickEvents.onYearChange.apply(this,[moment(this.month)]);}}}
return this;}
Clndr.prototype.back=function(options){if(!this.options.lengthOfTime.days){this.intervalStart.subtract(this.options.lengthOfTime.interval,'months').startOf('month');this.intervalEnd=this.intervalStart.clone().add(this.options.lengthOfTime.months||this.options.lengthOfTime.interval,'months').subtract(1,'days').endOf('month');this.month=this.intervalStart.clone();}else{this.intervalStart.subtract(this.options.lengthOfTime.interval,'days').startOf('day');this.intervalEnd=this.intervalStart.clone().add(this.options.lengthOfTime.days- 1,'days').endOf('day');this.month=this.intervalStart.clone();}
this.render();if(options&&options.withCallbacks){if(this.options.lengthOfTime.days||this.options.lengthOfTime.months){if(this.options.clickEvents.onIntervalChange){this.options.clickEvents.onIntervalChange.apply(this,[moment(this.intervalStart),moment(this.intervalEnd)]);}}else{if(this.options.clickEvents.onMonthChange){this.options.clickEvents.onMonthChange.apply(this,[moment(this.month)]);}
if(this.month.month()===11&&this.options.clickEvents.onYearChange){this.options.clickEvents.onYearChange.apply(this,[moment(this.month)]);}}}
return this;}
Clndr.prototype.next=function(options){this.forward(options);return this;}
Clndr.prototype.previous=function(options){this.back(options);return this;}
Clndr.prototype.setMonth=function(newMonth,options){if(!this.options.lengthOfTime.days&&!this.options.lengthOfTime.months){this.month.month(newMonth);this.intervalStart=this.month.clone().startOf('month');this.intervalEnd=this.intervalStart.clone().endOf('month');this.render();if(options&&options.withCallbacks){if(this.options.clickEvents.onMonthChange){this.options.clickEvents.onMonthChange.apply(this,[moment(this.month)]);}}}else{console.log('You are using a custom date interval; use Clndr.setIntervalStart(startDate) instead.');}
return this;}
Clndr.prototype.setIntervalStart=function(newDate,options){if(this.options.lengthOfTime.days){this.intervalStart=moment(newDate).startOf('day');this.intervalEnd=this.intervalStart.clone().add(this.options.lengthOfTime.days- 1,'days').endOf('day');}else if(this.options.lengthOfTime.months){this.intervalStart=moment(newDate).startOf('month');this.intervalEnd=this.intervalStart.clone().add(this.options.lengthOfTime.months||this.options.lengthOfTime.interval,'months').subtract(1,'days').endOf('month');this.month=this.intervalStart.clone();}
if(this.options.lengthOfTime.days||this.options.lengthOfTime.months){this.render();if(options&&options.withCallbacks){if(this.options.clickEvents.onIntervalChange){this.options.clickEvents.onIntervalChange.apply(this,[moment(this.intervalStart),moment(this.intervalEnd)]);}}}else{console.log('You are using a custom date interval; use Clndr.setIntervalStart(startDate) instead.');}
return this;}
Clndr.prototype.nextYear=function(options){this.month.add(1,'year');this.intervalStart.add(1,'year');this.intervalEnd.add(1,'year');this.render();if(options&&options.withCallbacks){if(this.options.clickEvents.onYearChange){this.options.clickEvents.onYearChange.apply(this,[moment(this.month)]);}
if(this.options.clickEvents.onIntervalChange){this.options.clickEvents.onIntervalChange.apply(this,[moment(this.intervalStart),moment(this.intervalEnd)]);}}
return this;}
Clndr.prototype.previousYear=function(options){this.month.subtract(1,'year');this.intervalStart.subtract(1,'year');this.intervalEnd.subtract(1,'year');this.render();if(options&&options.withCallbacks){if(this.options.clickEvents.onYearChange){this.options.clickEvents.onYearChange.apply(this,[moment(this.month)]);}
if(this.options.clickEvents.onIntervalChange){this.options.clickEvents.onIntervalChange.apply(this,[moment(this.intervalStart),moment(this.intervalEnd)]);}}
return this;}
Clndr.prototype.setYear=function(newYear,options){this.month.year(newYear);this.intervalStart.year(newYear);this.intervalEnd.year(newYear);this.render();if(options&&options.withCallbacks){if(this.options.clickEvents.onYearChange){this.options.clickEvents.onYearChange.apply(this,[moment(this.month)]);}
if(this.options.clickEvents.onIntervalChange){this.options.clickEvents.onIntervalChange.apply(this,[moment(this.intervalStart),moment(this.intervalEnd)]);}}
return this;}
Clndr.prototype.setEvents=function(events){if(this.options.multiDayEvents){this.options.events=this.addMultiDayMomentObjectsToEvents(events);}else{this.options.events=this.addMomentObjectToEvents(events);}
this.render();return this;};Clndr.prototype.addEvents=function(events){if(this.options.multiDayEvents){this.options.events=$.merge(this.options.events,this.addMultiDayMomentObjectsToEvents(events));}else{this.options.events=$.merge(this.options.events,this.addMomentObjectToEvents(events));}
this.render();return this;};Clndr.prototype.removeEvents=function(matchingFunction){for(var i=this.options.events.length-1;i>=0;i--){if(matchingFunction(this.options.events[i])==true){this.options.events.splice(i,1);}}
this.render();return this;};Clndr.prototype.addMomentObjectToEvents=function(events){var self=this;var i=0,l=events.length;for(i;i<l;i++){events[i]._clndrStartDateObject=moment(events[i][self.options.dateParameter]);events[i]._clndrEndDateObject=moment(events[i][self.options.dateParameter]);}
return events;}
Clndr.prototype.addMultiDayMomentObjectsToEvents=function(events){var self=this;var i=0,l=events.length;for(i;i<l;i++){if(!events[i][self.options.multiDayEvents.endDate]&&!events[i][self.options.multiDayEvents.startDate]){events[i]._clndrEndDateObject=moment(events[i][self.options.multiDayEvents.singleDay]);events[i]._clndrStartDateObject=moment(events[i][self.options.multiDayEvents.singleDay]);}else{events[i]._clndrEndDateObject=moment(events[i][self.options.multiDayEvents.endDate]||events[i][self.options.multiDayEvents.startDate]);events[i]._clndrStartDateObject=moment(events[i][self.options.multiDayEvents.startDate]||events[i][self.options.multiDayEvents.endDate]);}}
return events;}
Clndr.prototype.calendarDay=function(options){var defaults={day:"",classes:this.options.targets.empty,events:[],date:null};return $.extend({},defaults,options);}
$.fn.clndr=function(options){if(this.length===1){if(!this.data('plugin_clndr')){var clndr_instance=new Clndr(this,options);this.data('plugin_clndr',clndr_instance);return clndr_instance;}}else if(this.length>1){throw new Error("CLNDR does not support multiple elements yet. Make sure your clndr selector returns only one element.");}}}));