{{!
	© 2015 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<tr id="{{lineId}}" data-item-id="{{itemId}}" data-type="order-item">
	<td class="item-views-cell-actionable-table-first">
		<div class="item-views-cell-actionable-thumbnail">
			{{#if isNavigable}}
				<a {{linkAttributes}}>
					<img src="{{resizeImage item._thumbnail.url 'thumbnail'}}" alt="{{item._thumbnail.altimagetext}}">
				</a>
			{{else}}
				<img src="{{resizeImage item._thumbnail.url 'thumbnail'}}" alt="{{item._thumbnail.altimagetext}}">
			{{/if}}
		</div>
	</td>
	<td class="item-views-cell-actionable-table-middle">
		<div class="item-views-cell-actionable-name">
		{{#if isNavigable}}
			<a {{linkAttributes}} class="item-views-cell-actionable-name-link">
				{{item._name}}
			</a>
		{{else}}
				<span class="item-views-cell-actionable-name-viewonly">{{item._name}}</span>
		{{/if}}
		</div>
		<div class="item-views-cell-actionable-price">
			<div data-view="Item.Price"></div>
		</div>

        {{#if item._gender}}
        <div class="item-views-cell-actionable-gender-container">
            <span class="item-views-cell-actionable-gender-label">
                {{translate 'Gender:'}}
            </span>
            <span class="item-views-cell-actionable-gender-value">
                {{item._gender}}
            </span>
        </div>
        {{/if}}

		<div class="item-views-cell-actionable-sku">
			<span class="item-views-cell-actionable-sku-label">{{translate 'SKU: #'}}</span>
			<span class="item-views-cell-actionable-sku-value">{{ item._sku}}</span>
		</div>
		<div class="item-views-cell-actionable-options">
			<div data-view="Item.SelectedOptions"></div>
		</div>
		{{#if showSummaryView}}
		<div class="item-views-cell-actionable-summary" data-view="Item.Summary.View">
		</div>
		{{/if}}
	</td>
	<td class="item-views-cell-actionable-table-last">
		<div data-view="Item.Actions.View"></div>

		{{#if showAlert}}
			<div class="item-views-cell-actionable-alert-placeholder" data-type="alert-placeholder">
		{{/if}}

		{{#if showCustomAlert}}
			<div class="alert alert-{{customAlertType}}">
				{{item._cartCustomAlert}}
			</div>
		{{/if}}
	</div>
	</td>
</tr>
