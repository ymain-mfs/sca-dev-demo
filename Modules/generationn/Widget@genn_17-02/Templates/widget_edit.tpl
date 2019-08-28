<section class="widget-edit">
    <form>
        <div>
            Color:
            <input type="text" name="color" value="{{color}}">
        </div>

        <div>
            Size:
            <input type="text" name="size" value="{{size}}">
        </div>

        <div>
            Shape:
            <input type="text" name="shape" value="{{shape}}">
        </div>
        <br><br>

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