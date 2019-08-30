<section class="widget-list">
	<h2>{{translate 'My Widgets ($(0))' numberWidgets}}</h2>

    <br><br>

    <div>
        <a href="/widgetlist/new" data-toggle="show-in-modal">{{translate 'Add New Widget'}}</a>
    </div>

    <br><br>

{{#if numberWidgets}}
    <table>
        <thead>
            <tr>
                <th>
                    <span>{{translate 'Internal Id'}}</span>
                </th>
                <th>
                    <span>{{translate 'Color'}}</span>
                </th>
                <th>
                    <span>{{translate 'Size'}}</span>
                </th>
                <th>
                    <span>{{translate 'Shape'}}</span>
                </th>
            </tr>
        </thead>

        <tbody data-view="Widgets.Collection"></tbody>

    </table>

{{else}}

    <p>{{translate 'No widgets were found'}}</p>

{{/if}}

</section>
