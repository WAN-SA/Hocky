$(document).ready(function(){

	var ham   = $('#ham'),
			nav   = $('#nav'),
			inner = $('html, body');

	ham.on('click', function(event) {
		ham.toggleClass(cls.toggle);
		nav.toggleClass(cls.toggle);
		inner.toggleClass('--no-scroll');
	});


	let cls = {
		toggle  : '--toggle',
		selected: '--selected',
		checked : '--checked'
	}
	$('.select').each(function(){
		var data 				= $(this).find('select'),
				wrap 				= $(this).find('.select__wrap'),
				options     = data.find('option'),
				placeholder = data.attr('data-placeholder') != undefined ? data.attr('data-placeholder') : options.index(0).text(),
				title				= $(this).find('.select__title');


		title.text(placeholder);
		wrap.append('<div class="select__list"></div>');
		var list = wrap.find('.select__list');

		options.each(function(index){
			var optionText = $(this).text();
			if ($(this).attr('checked') != undefined) {
				list.append('<div class="select__item --selected" data-value="'+ optionText +'">' + optionText + '</div>');
			} else{
				list.append('<div class="select__item" data-value="'+ optionText +'">' + optionText + '</div>');
			}
		})
	});

	$('.select').on('click', function(){
		$(this).toggleClass(cls.toggle);
	});

	$('body').on('click', '.select__item', function(){

		if (!$(this).hasClass(cls.selected)) {
			var	select	 = $(this).parents('.select'),
				optionText = $(this).text(),
				value      = $(this).attr('data-value'),
				data			 = select.find('select'),
				option 		 = data.find('option[value = "' + value + '"]'),
				title			 = select.find('.select__title');

			title.text(optionText);
			$(this).siblings().removeClass(cls.selected);
			$(this).addClass(cls.selected);
			option.siblings().removeAttr('selected');
			option.attr('selected', 'selected');
		}

		
	});

	$(document).mouseup(function (e){
		var div = $(".select.--toggle");
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) {
			div.removeClass(cls.toggle);
		}
	});

	var check = {
		class: {
			block: 'check',
			input: 'input'
		},
		block: null,
		input: null,
		value: null,
		name: null,
		status: null,
		Vars: function(block){
			this.block = block;
			this.input = this.block.find('input');
			this.name = this.input.attr('name');
			this.status = this.input.attr('checked');
			this.value = this.input.val();
		},
		Filled: function(block){
			this.Vars(block);
			if (this.status == 'checked'){
				this.block.addClass(cls.checked)
			}
		},
		Click: function (block) {
			this.Vars(block);
			if(this.status == undefined || this.status == ''){
				this.input.attr('checked', 'checked');
				this.block.addClass(cls.checked);
			}
			else {
				this.input.removeAttr('checked');
				this.block.removeClass(cls.checked);
			}
	
		},
		Init: function () {
			this.input = '.check';


			$(this.input).each(function () {
				check.Filled($(this));
			})
			
			$('.' + check.class.block).on('click', function () {
				check.Click($(this));
			});
		}
	};
	

	var radio = {
		class: {
			block: 'radio',
			input: 'input'
		},
		block: null,
		input: null,
		value: null,
		name: null,
		status: null,
		radios: null,
		Vars: function(block){
			this.block = block;
			this.input = this.block.find('input');
			this.name = this.input.attr('name');
			this.status = this.input.attr('checked');
			this.value = this.input.val();
		},
		Filled: function(block){
			this.Vars(block);
			if (this.status == 'checked'){
				this.block.addClass(cls.checked)
			}
		},
		Click: function (block) {
			this.Vars(block);
			if(this.status == undefined || this.status == ''){
				this.radios = this.block.parents('body').find('input[name = ' + this.name + ']');
				this.radios.each(function () {
					var input = $(this).parents('.' + radio.class.block);
					$(this).removeAttr('checked');
					input.removeClass(cls.checked);
				});
				this.input.attr('checked', 'checked');
				this.block.addClass(cls.checked);
			}
		},
		Init: function () {
			this.input = '.radio input';
			$('body').find('.' + radio.class.block).each(function () {
				radio.Filled($(this));
			})
			$('.' + radio.class.block).on('click', function () {
				radio.Click($(this));
			});
		}
	};
	

	check.Init();
	radio.Init();

	function valueElementForm(nameElement, nameBlock) {
		var newNameElement = '.' + nameElement;
			element = $(newNameElement);
		element.each(function(index, el) {
			var elementInput = $(this).find($(nameBlock)),
				elementLabel = $(this).find($('label')),
				elementValue = index + 1;
			elementInput.attr('id', nameElement + '-' + elementValue);
			elementLabel.attr('for', nameElement + '-' + elementValue);
		});

	}
	valueElementForm('input', 'input');
	valueElementForm('textarea', 'textarea');



	var slickArrow = {
		prev: '<button type="button" class="slick-prev"><svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8538 23.8474C12.0487 23.6439 12.0487 23.3131 11.8538 23.1096L1.20704 12.0005L11.8527 0.890383C12.0477 0.686901 12.0477 0.356095 11.8527 0.152612C11.6577 -0.0508707 11.3407 -0.0508707 11.1457 0.152612L0.146008 11.6311C0.049026 11.7334 -2.42607e-06 11.867 -2.43191e-06 12.0005C-2.43775e-06 12.1341 0.0489792 12.2677 0.146992 12.3689L11.1467 23.8474C11.3418 24.0509 11.6588 24.0509 11.8538 23.8474Z" fill="#AEAEAE"/></svg></button>',
		next: '<button type="button" class="slick-next"><svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.146249 0.152615C-0.0487456 0.356096 -0.0487456 0.686903 0.146249 0.890387L10.793 11.9995L0.147278 23.1096C-0.0477172 23.3131 -0.0477173 23.6439 0.147277 23.8474C0.342272 24.0509 0.659279 24.0509 0.854274 23.8474L11.854 12.3689C11.951 12.2666 12 12.133 12 11.9995C12 11.8659 11.951 11.7323 11.853 11.6311L0.853293 0.152567C0.658251 -0.050867 0.341244 -0.0508689 0.146249 0.152615Z" fill="#AEAEAE"/></svg></button>'
	}
	var slider = {
		list  : $('.slider__list'),
		nav   : $('.slider__nav'),
		arrows: $('.slider__arrows')
	}
	slider.list.slick({
		fade: true,
		asNavFor: slider.nav,
		appendArrows: slider.arrows,
		prevArrow: slickArrow.prev,
		nextArrow: slickArrow.next,
	})
	slider.nav.slick({
		infinite: false,
		arrows: false,
		variableWidth: true,
		asNavFor: slider.list,
		focusOnSelect: true,
	})

	function IncDec() {
	  $('.incdec__btn').click(function(event) {
	    var input = $(this).siblings('.incdec__input'),
	        value = Number(input.val());

	    if ($(this).hasClass('--minus')) {
	      if(value > 1) {
	        input.val(value-1);	
	      }


	    } else if ($(this).hasClass('--plus')){
	      if(value < 999) {
	        input.val(value+1);	
	      }
	    }
	  });
	  $('.incdec__input').keyup(function(event) {
	    var value = $(this).val();
	    $(this).val(value.replace(/\D/g,''));
	  });
	}
	IncDec();

	$('.input.--tel .input__field').mask('+7 (000) 000-00-00');



	
})