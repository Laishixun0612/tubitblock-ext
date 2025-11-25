/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_TUBITV2_BUTTON_CATEGORY}" id="TUBITV2_BUTTON_CATEGORY" colour="#16A07A" secondaryColour="#16A07A">
    <block type="tubitv2_button" id="tubitv2_button">
    </block>
    <block type="tubitv2_buttonts" id="tubitv2_buttonts">
    </block>
</category>`;
}

exports = registerToolboxs;
