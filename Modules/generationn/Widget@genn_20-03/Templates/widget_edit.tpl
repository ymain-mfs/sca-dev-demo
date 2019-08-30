<section class="widget-edit">
    <form>
        <small class="widget-edit-fields">{{translate 'Required'}}
            <span class="widget-edit-fields-required">*</span>
        </small>

        <div data-validation="control-group">
            <label class="widget-edit-fields-label" for="color">{{translate 'Color'}}
                <span class="widget-edit-fields-required">*</span>
            </label>
            <div data-validation="control">
                <input class="widget-edit-fields-input"
                       type="text" name="color" id="color" value="{{color}}">
            </div>
        </div>

        <div data-validation="control-group">
            <label class="widget-edit-fields-label" for="size">{{translate 'Size'}}
                <span class="widget-edit-fields-required">*</span>
            </label>
            <div data-validation="control">
                <input class="widget-edit-fields-input"
                       type="text" name="size" id="size" value="{{size}}">
            </div>
        </div>

        <div data-validation="control-group">
            <label class="widget-edit-fields-label" for="shape">{{translate 'Shape'}}
                <span class="widget-edit-fields-required">*</span>
            </label>
            <div data-validation="control">
                <select class="widget-edit-fields-input" name="shape" id="shape">
                    {{#each widgetShapes}}
                    <option value="{{internalid}}"
                        {{#if isSelected}}
                            selected
                        {{/if}}
                    >
                        {{name}}
                    </option>
                    {{/each}}
                </select><br>
            </div>
        </div>

        <div>
            <button class="widget-edit-form-button-submit" type="submit">
                {{#if isWidgetNew}}
                    {{translate 'Save Widget'}}
                {{else}}
                    {{translate 'Update Widget'}}
                {{/if}}
            </button>

            <button class="widget-edit-form-button-cancel"
                    data-dismiss="modal" data-action="reset">
                {{translate 'Cancel'}}
            </button>
        </div>
    </form>
</section>
