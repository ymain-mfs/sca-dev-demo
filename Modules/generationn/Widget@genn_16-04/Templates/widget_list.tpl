<section class="widget-list">
	<h2>{{pageHeader}} ({{numberWidgets}})</h2>

    <br><br>

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
        
        <tbody>

    {{#each collection}}

            <tr>
                <td>
                    <span>{{internalid}}</span>
                </td>
                <td>
                    <span>{{color}}</span>
                </td>
                <td>
                    <span>{{size}}</span>
                </td>
                <td>
                    <span>{{shape}}</span>
                </td>
            </tr>

    {{/each}}

        </tbody>
    </table>

{{else}}

    <p>No widgets were found</p>

{{/if}}

</section>
