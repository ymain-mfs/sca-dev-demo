/*
	© 2015 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// Overview.Home.View.js
// --------------------

define('Overview.Home.View'
,	[
		'SC.Configuration'
	,	'Overview.Banner.View'
	,	'Overview.Profile.View'
	,	'Overview.Payment.View'
	,	'Overview.Shipping.View'
	,	'Backbone.CollectionView'
	,	'OrderHistory.List.Tracking.Number.View'
	,	'RecordViews.View'
	,	'Handlebars'

	,	'overview_home.tpl'

	,	'Backbone'
	,	'Backbone.CompositeView'
	,	'underscore'
	,	'Utils'
	]
,	function(
		Configuration
	,	OverviewBannerView
	,	OverviewProfileView
	,	OverviewPaymentView
	,	OverviewShippingView
	,	BackboneCollectionView
	,	OrderHistoryListTrackingNumberView
	,	RecordViewsView
	,	Handlebars

	,	overview_home_tpl

	,	Backbone
	,	BackboneCompositeView
	,	_
	)
{
	'use strict';

	// home page view
	return Backbone.View.extend({

		template: overview_home_tpl
	,	title: _('Welcome!').translate()
	,	attributes: {'class': 'ProfileHomeView'}
	,	events: {}

	,	initialize: function (options)
		{
			BackboneCompositeView.add(this);

			this.model = options.model;
			this.application = options.application;

			this.customerSupportURL = Configuration.get('customerSupportURL');

			this.model.on('change', this.showContent, this);

			this.addresses = this.model.get('addresses');

			this.creditcards = this.model.get('creditcards');

			this.addresses.on('reset destroy change add', this.showContent, this);

			this.creditcards.on('reset destroy change add', this.showContent, this);
		}

		//@method getContext @return Overview.Home.View.Context
	,	getContext: function ()
		{
			//@class Overview.Home.View.Context
			return {
				//@property {Boolean} collectionLengthGreaterThan0
				collectionLengthGreaterThan0: this.collection.length > 0
				//@property {Boolean} hasCustomerSupportURL
			,	hasCustomerSupportURL: !!this.customerSupportURL
				//@property {String} customerSupportURL
			,	customerSupportURL: this.customerSupportURL
				//@property {String} firstName
			,	firstName: this.model.get('firstname') ||  this.model.get('name') ||''
			};
		}

	,	childViews: {
			'Overview.Banner': function()
			{
				return new OverviewBannerView();
			}

		,	'Overview.Profile': function()
			{
				return new OverviewProfileView({ model: this.model });
			}

		,	'Overview.Payment': function()
			{
				return new OverviewPaymentView({ model: this.defaultCreditCard });
			}

		,	'Overview.Shipping': function()
			{
				return new OverviewShippingView({ model: this.defaultShippingAddress });
			}

		,	'Order.History.Results': function ()
			{
				var records_collection = new Backbone.Collection(this.collection.map(function (order)
					{
						var model = new Backbone.Model({
							touchpoint: 'customercenter'
						,	title: new Handlebars.SafeString(_('Order #<span class="tranid">$(0)</span>').translate(order.get('order_number')))
						,	detailsURL: '/ordershistory/view/' + order.id

						,	id: order.id
						,	internalid: order.id

						,	columns: [
								{
									label: _('Date:').translate()
								,	type: 'date'
								,	name: 'creation-date'
								,	value: order.get('date')
								}
							,	{
									label: _('Amount:').translate()
								,	type: 'currency'
								,	name: 'amount'
								,	value: order.get('summary').total_formatted
								}
							,	{
									label: _('Status:').translate()
								,	type: 'status'
								,	name: 'status'
								,	value: order.get('status')
								}
							,	{
									type: 'tracking-number'
								,	name: 'trackingNumber'
								,	compositeKey: 'OrderHistoryListTrackingNumberView'
								,	composite: new OrderHistoryListTrackingNumberView({
										model: new Backbone.Model({
											trackingNumbers: order.get('trackingnumbers')
										})
									,	showContentOnEmpty: true
									,	contentClass: ''
									,	collapseElements: true
									})
								}
							]
						});

						return model;
					}));

				return new BackboneCollectionView({
					childView: RecordViewsView
				,	collection: records_collection
				,	viewsPerRow: 1
				});
			}
		}

	,	destroy: function ()
		{
			this.addresses.off(null, null, this);
			this.creditcards.off(null, null, this);

			this.offEventsOfDefaults();

			this._destroy();
		}

	,	offEventsOfDefaults: function ()
		{
			this.defaultCreditCard && this.defaultCreditCard.off(null, null, this);
			this.defaultShippingAddress && this.defaultShippingAddress.off(null, null, this);
		}

	,	getSelectedMenu: function ()
		{
			return 'home';
		}

	,	getBreadcrumbPages: function ()
		{
			return [];
		}

	,	showContent: function ()
		{
			// off events of defaults
			this.offEventsOfDefaults();

			// set the defaults
			this.defaultShippingAddress = this.addresses.findWhere({defaultshipping: 'T'});
			this.defaultCreditCard = this.creditcards.findWhere({ccdefault: 'T'});

			// on events of defaults
			this.defaultShippingAddress && this.defaultShippingAddress.on('change', this.showContent, this);
			this.defaultCreditCard && this.defaultCreditCard.on('change', this.showContent, this);

			this.title = this.model.get('firstname') ? _('Welcome $(0)!').translate(this.model.get('firstname')) : this.title;
			this.application.getLayout().showContent(this);
		}
	});
});