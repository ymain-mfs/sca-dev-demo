<section class="widget-list">
	<h2>{{pageHeader}} ({{numberWidgets}})</h2>

    <br><br>

    <div>
        <a href="/widgetlist/new" data-toggle="show-in-modal">Add New Widget</a>        
    </div>

    <br><br>

<div class="widget-list-results-container">
    {{#if numberWidgets}}
        <table>
            <thead>
                <tr>
                    <th>
                        <span>Internal Id</span>
                    </th>
                    <th>
                        <span>Color</span>
                    </th>
                    <th>
                        <span>Size</span>
                    </th>
                    <th>
                        <span>Shape</span>
                    </th>
                </tr>
            </thead>

            <tbody data-view="Widgets.Collection"></tbody>

        </table>

    {{else}}

        <p>No widgets were found</p>

    {{/if}}
</div>

</section>
