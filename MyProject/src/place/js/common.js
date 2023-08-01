// JavaScript Document
/*
var app = new Vue({
	el: '#app',
	data: { name:'Girabee Metaverse' }
})
*/

$(document).ready(function() {
	
	/*
	if(depth3>0){
		$('.lnb .mainMenu > li:eq('+( depth3-1 )+') > .menu').addClass('on');
		if(depth4>0){
			$('.lnb .mainMenu > li:eq('+( depth3-1 )+') > .subMenu > li:eq('+( depth4-1 )+') > .menu').addClass('on');
		};
	};
	*/
	
	$(function(){
		
	/* RANGE *
	$('.range').slider({
		value: 50,
	});
	if($(window).width() < 640){
		$('.range').slider({
			value: 50,
			orientation: "vertical",
		});
	};
		
		/* DATE PICKER */
		$('.input.date').datepicker({
			dateFormat: "yy-mm-dd"
		});
		$.datepicker.setDefaults({
			dateFormat: 'yyyy-mm-dd',
			monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			showMonthAfterYear: true,
		});
		
		/* RESIZE *
		$('.resize.x').resizable({
			handles: "e"
		});
		$('.resize.y').resizable({
			handles: "s"
		});

		/* Autocomplete select *
		$.widget( "custom.combobox", {
				_create: function() {
				this.wrapper = $( "<label>" )
				//.addClass( "custom-combobox" )
				.insertAfter( this.element );

				this.element.hide();
				this._createAutocomplete();
				this._createShowAllButton();
			},

			_createAutocomplete: function() {
				var selected = this.element.children( ":selected" ),
				value = selected.val() ? selected.text() : "";

				this.input = $( "<input>" )
				.appendTo( this.wrapper )
				.val( value )
				//.attr( "title", "" )
				//.addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
				.autocomplete({
					delay: 0,
					minLength: 0,
					source: $.proxy( this, "_source" )
				})
				.tooltip({
					classes: { "ui-tooltip": "ui-state-highlight" }
				});

				this._on( this.input, {
					autocompleteselect: function( event, ui ) {
						ui.item.option.selected = true;
						this._trigger( "select", event, {
							item: ui.item.option
						});
					},
					autocompletechange: "_removeIfInvalid" 
				});
			},

			_createShowAllButton: function() {
				var input = this.input,
				wasOpen = false;

				$( "<a>" )
				.attr( "tabIndex", -1 )
				//.attr( "title", "Show All Items" )
				.tooltip()
				.appendTo( this.wrapper )
				.button({
					icons: {
						primary: "ui-icon-triangle-1-s"
					},
					text: false
				})
				.removeClass( "ui-corner-all" )
				.addClass( "custom-combobox-toggle" )
				.on( "mousedown", function() {
					wasOpen = input.autocomplete( "widget" ).is( ":visible" );
				})
				.on( "click", function() {
					input.trigger( "focus" );

					// Close if already visible
					if ( wasOpen ) { return; }
					
					// Pass empty string as value to search for, displaying all results
					input.autocomplete( "search", "" );
				});
			},

			_source: function( request, response ) {
				var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
				response( this.element.children( "option" ).map(function() {
					var text = $( this ).text();
					if ( this.value && ( !request.term || matcher.test(text) ) )
					return {
						label: text,
						value: text,
						option: this
						};
					})
				);
			},

			_removeIfInvalid: function( event, ui ) {
				// Selected an item, nothing to do
				if ( ui.item ) { return; }

				// Search for a match (case-insensitive)
				var value = this.input.val(),
				valueLowerCase = value.toLowerCase(),
				valid = false;
				this.element.children( "option" ).each(function() {
					if ( $( this ).text().toLowerCase() === valueLowerCase ) {
						this.selected = valid = true;
						return false;
					}
				});
				
				// Found a match, nothing to do
				if ( valid ) { return; }
					// Remove invalid value
					this.input
					.val( "" )
					//.attr( "title", value + " didn't match any item" )
					.tooltip( "open" );
					this.element.val( "" );
					this._delay(function() {
					this.input.tooltip( "close" ).attr( "title", "" );
				}, 2500 );
					this.input.autocomplete( "instance" ).term = "";
			},
			_destroy: function() {
				this.wrapper.remove();
				this.element.show();
			}
		});

		$('select.auto').combobox();
		*/
	});
	
	/* NAV *
	$('.btMenu').click(function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$('.lnb.nav'+depth1).removeClass('hide');
			$('article.content').removeClass('wide');
		} else {
			$(this).addClass('on');
			$('.lnb.nav'+depth1).addClass('hide');
			$('article.content').addClass('wide');
		}		
	});
	*/
	
	/* SELECT *
    $('select').change(function(){
        var selectText = $(this).children('option:selected').text();
        $(this).siblings('label').text(selectText);
    });
	$('.select > label').click(function(){
		$(this).toggleClass('on');
		$(this).siblings('.option').toggle();
	});
	
	/* FILE */
	$('input[type="file"]').change(function() {
		// TODO : 모바일 파일경로 확인
		var fileName = $(this).val().split('\\').pop();
		$(this).siblings('label').text(fileName);
	});
	
	/* TAP */
	$('.tap li').click(function(){
		$(this).siblings('li').removeClass('on');
		$(this).addClass('on');
		var index = $(this).index()+1;
		$(this).parents('.tap').siblings('.tapCon').addClass('hide');
		$(this).parents('.tap').siblings('.tapCon.view'+ index).removeClass('hide');
	});
	
	/* TAG */
	$('.tag span').click(function(){
		$(this).toggleClass('on');
	});
	$('.tag.one span').click(function(){
		$(this).siblings('span').removeClass('on');
		$(this).addClass('on');
	});
	
	
	/* BT HEART *
	$('.bt.heart').click(function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}
	});
	
	/* POPUP CLOSE */
	$('.popup .bt.close').click(function(){
		$(this).parents('.popup').addClass('hide').trigger('classChange');
	});
	
	/* BT ACTION */
	$('.bt.action').click(function(){
		$('.tool .tag').toggleClass('hide');
	});
	
	/* BT PEOPLE */
	$('.bt.people').click(function(){
		$('.members').toggleClass('on').trigger('classChange');
		$('.members li').removeClass('on');
		$('.members .btns .bt').attr('disabled', true);
	});
	$(document).on('click', '.members li:not(.me)', function(){
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$('.members .btns .bt').attr('disabled', true);
		} else {
			$(this).siblings('li').removeClass('on');
			$(this).addClass('on');
			$('.members .btns .bt').attr('disabled', false);
		}
	});
	$('.members .bt.close').click(function(){
		$('.members').removeClass('on');
		$('.members li').removeClass('on');
		$('.members .btns .bt').attr('disabled', true);
	});
	
	
	/* LANG */
	$('.lang .bt').click(function(){
		$('.account').removeClass('on');
		$('.account ul').slideUp();
		$(this).siblings('ul').slideToggle();
	});
	
	
	/* ACCOUNT */
	$('.account .pic').click(function(){
		$('.lang ul').slideUp();
		$(this).parents('.account').toggleClass('on');
		$(this).siblings('ul').slideToggle();
	});
	
	
	/* BT MY */
	$('.bt.my').click(function(){
		$('.header .nav').toggleClass('hide');
	});
	
	
	/* BT LOGIN */
	$('.bt.login').click(function(){
		$('#pop-login').toggleClass('hide').trigger('classChange');
	});
	
})