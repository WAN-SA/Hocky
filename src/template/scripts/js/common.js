$(document).ready(function(){
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
			this.input = this.block.find('inpu');
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
			$(window).on('load', function () {
				$('body').find('.' + check.class.block).each(function () {
					check.Filled($(this));
				})
			});
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
			$(window).on('load', function () {
				$('body').find('.' + radio.class.block).each(function () {
					radio.Filled($(this));
				})
			});
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
	
})