/*
	© 2015 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module CreditCard
define('CreditCard.Edit.View'
,	[
		'SC.Configuration'
	,	'CreditCard.Edit.Form.View'
	,	'creditcard_edit.tpl'
	,	'Backbone.CompositeView'
	,	'Backbone.FormView'
	,	'Backbone'
	,	'underscore'
	,	'LiveOrder.Model'
	,	'jQuery'
	,	'Utils'
	]
,	function (
		Configuration
	,	CreditCardEditFormView
	,	creditcard_edit_tpl
	,	BackboneCompositeView
	,	BackboneFormView
	,	Backbone
	,	_
	,	LiveOrderModel
	,	jQuery
	)
{
	'use strict';

	// @class CreditCard.Edit.View card details view/edit @extends Backbone.View
	return Backbone.View.extend({

		template: creditcard_edit_tpl

	,	attributes: { 'class': 'CreditCardDetailsView' }

	,	events: {
			'submit form': 'saveForm'
		,	'change form:has([data-action="reset"])': 'toggleReset'
		,	'click [data-action="reset"]': 'resetForm'
		,	'change form [name="ccnumber"]': 'setPaymethodId'
		}

		//@method initialize
		//@param {CreditCard.Edit.View.Initialize} options
	,	initialize: function ()
		{
			this.title = this.model.isNew() ? _('Add Credit Card').translate() : _('Edit Credit Card').translate() ;
			this.page_header = this.title;

			// initialize date selector
			var currentExpYear = this.model.get('expyear')
			, 	newExpYear = new Date().getFullYear()
			,	range = _.range(new Date().getFullYear(), new Date().getFullYear() + 25);

			if (currentExpYear && currentExpYear < newExpYear)
			{
				range = _.union([parseInt(currentExpYear, 10)], range);
				this.options.expyear = currentExpYear;
			}
			if (!this.model.get('expmonth'))
			{
				this.options.currentMonth = new Date().getMonth() + 1;
			}

			this.options.months = _.range(1, 13);
			this.options.years = range;

			//only enable "default" functionality in myaccount

			this.options.showDefaults = Configuration.get('currentTouchpoint') === 'customercenter';
			BackboneCompositeView.add(this);
		}

	, 	childViews : {
			'CreditCard.Form' : function()
			{
				return new CreditCardEditFormView({
					model: this.model
				,	months: this.options.months
				,	years: this.options.years
				,	currentMonth: this.options.currentMonth
				,	showDefaults: this.options.showDefaults
				,	showSecurityCodeForm: this.options.showSecurityCodeForm
				});
			}
		}

		//@method setPaymethodId
	,	setPaymethodId: function (e)
		{
			var cc_number = jQuery(e.target).val().replace(/\s/g, '')
			,	form = jQuery(e.target).closest('form')
			,	paymenthod_id = _.paymenthodIdCreditCart(cc_number);

			jQuery(e.target).val(cc_number);

			if (paymenthod_id)
			{
				form.find('[name="paymentmethod"]').val(paymenthod_id);
				form.find('[data-image="creditcard-icon"]').each(function (index, img)
				{
					var $img = jQuery(img);
					if ($img.data('value').toString() === paymenthod_id)
					{
						$img.show();
					}
					else
					{
						$img.hide();
					}
				});
			}
			else
			{
				form.find('[data-image="creditcard-icon"]').show();
			}
		}

		//@method getSelectedMenu
	,	getSelectedMenu: function ()
		{
			return 'creditcards';
		}
		//@method getBreadcrumbPages
	,	getBreadcrumbPages: function ()
		{
			return [
				{
					text: _('Credit Cards').translate()
				,	href: '/creditcards'
				}
			,	{
					text: this.title
				,	href: '/creditcards/new'
				}
			];
		}

	,	saveForm: function (e)
		{
			// This is a hack to fix cases when the change event in ccnumber is not triggered and setPaymethodId is not call.
			// This occur in Safari with the AutoFill feature (using keychain)
			if (!jQuery(e.target).find('[name="paymentmethod"]').val())
			{
				jQuery(e.target).find('[name="ccnumber"]').change();
			}

			// Call super and then check if the edited credit card is not on the order and if so update it.
			// Note that if securitycode is required and we pass an empty one then the payment method will be removed from the order.
			var live_order = LiveOrderModel.getInstance()
			,	promise = BackboneFormView.saveForm.apply(this, arguments);

			promise && promise.done(function (user_cc)
			{
				live_order.get('paymentmethods').each(function (paymentmethod)
				{
					var order_cc = paymentmethod.get('creditcard');
					if (order_cc && user_cc && order_cc.internalid === user_cc.internalid)
					{
						// in the payment method of the order, ONLY update those fields editable by the user.
						order_cc.ccexpiredate = user_cc.ccexpiredate;
						order_cc.ccname = user_cc.ccname;
						order_cc.expmonth = user_cc.expmonth;
						order_cc.expyear = user_cc.expyear;

						paymentmethod.set('creditcard', order_cc);
						live_order.get('paymentmethods').add(paymentmethod, {merge: true});
					}
				});
			});

			return promise;
		}

	,	resetForm: function (e)
		{
			e.preventDefault();
			this.showContent('creditcards');
		}

		//@method getContext @return CreditCard.View.Details.Context
	,	getContext: function ()
		{
			//@class CreditCard.View.Details.Context
			return {
				//@property {Boolean} isModal
				isModal: this.inModal
				//@property {Boolean} isNew
			,	isNew: this.model.isNew()
				//@property {Boolean} isNew
			,	isCollectionEmpty: this.options.isCreditCardCollectionEmpty
				//@property {Boolean} isModalOrCollectionLength
			,	isModalOrCollectionLength: !!(this.inModal || !this.options.isCreditCardCollectionEmpty)
				//@property {Boolean} showFooter
			,	showFooter: !this.options.hideFooter
				//@property {Boolean} isInModalOrHideHeader
			,	isInModalOrHideHeader: this.inModal || !!this.options.hideHeader
				//@property {Boolean} showHeader
			,	showHeader: !this.options.hideHeader
				//@property {Boolean} showBackToAccount
			,	showBackToAccount: Configuration.get('siteSettings.sitetype') === 'STANDARD' && !this.options.hideHeader
			};
		}
	});
});

//@class CreditCard.Edit.View.Initialize
//@property {Boolean} isCreditCardCollectionEmpty
//@property {Boolean} hideFooter
//@property {Boolean} hideHeader
//@property {ApplicationSkeleton} application
//@property {Address.Model} model