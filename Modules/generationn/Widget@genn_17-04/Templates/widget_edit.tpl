<section class="widget-edit">
    <form>
        <div data-validation="control-group">
            Color:
            <div data-validation="control">
                <input type="text" name="color" value="{{color}}"><br>
            </div>
        </div>

        <div data-validation="control-group">
            Size:
            <div data-validation="control">
                <input type="text" name="size" value="{{size}}"><br>
            </div>
        </div>

        <div data-validation="control-group">
            Shape:
            <div data-validation="control">
                <input type="text" name="shape" value="{{shape}}"><br>
            </div>
        </div>

        <div>
            <button type="submit">
                {{#if isWidgetNew}}
                    Save Widget
                {{else}}
                    Update Widget
                {{/if}}
            </button>

            <button data-dismiss="modal" data-action="reset">
                Cancel
            </button>
        </div>
    </form>
</section>